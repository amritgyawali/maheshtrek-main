import type { VideoAsset } from "@/content/types";

/**
 * Video player for a content page.
 *
 * Renders nothing at all when the page has no video configured, which is
 * currently every page: the client has supplied no footage. Dropping a
 * `video` object into the page's entry in `src/content/services.{ne,en}.ts` is
 * enough to light this up, and `lib/schema.ts` adds the matching
 * `VideoObject` node at the same time — see `public/media/README.md`.
 *
 * A YouTube watch URL is rewritten to its privacy-preserving embed host. The
 * iframe is lazy so an unwatched video costs nothing on load.
 */
function embedSrc(video: VideoAsset): string {
  if (video.embedUrl) return video.embedUrl;

  const youtube = video.url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/
  );
  if (youtube) return `https://www.youtube-nocookie.com/embed/${youtube[1]}?rel=0`;

  return video.url;
}

export default function VideoBlock({
  video,
  label,
  className = "",
}: {
  video?: VideoAsset;
  /** Accessible name for the region, e.g. "Watch the film". */
  label: string;
  className?: string;
}) {
  if (!video) return null;

  const isFile = /\.(mp4|webm|ogg)$/i.test(video.url);

  return (
    <section aria-label={label} className={className}>
      <div className="panel panel-lip overflow-hidden">
        <div className="relative aspect-video w-full bg-canvas">
          {isFile ? (
            <video
              className="absolute inset-0 h-full w-full"
              controls
              preload="none"
              poster={video.thumbnail}
              aria-label={video.title}
            >
              <source src={video.url} />
            </video>
          ) : (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={embedSrc(video)}
              title={video.title}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
        <div className="border-t border-white/[0.07] px-6 py-5">
          <h3 className="font-display text-title-sm text-content">{video.title}</h3>
          <p className="mt-2 text-body-sm text-content-dim">{video.description}</p>
        </div>
      </div>
    </section>
  );
}
