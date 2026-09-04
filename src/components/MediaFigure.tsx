import type { ImageAsset } from "@/content/types";

/**
 * A still image on a content page.
 *
 * These are SVG files generated into `public/media/` by
 * `scripts/generate-media.mjs` — the client has supplied no photography, and a
 * fabricated stock photo of somebody else's newsroom would be worse than a
 * drawn one. Replacing a file with a real photograph of the same name and
 * aspect ratio is the only change needed when the shoot happens.
 *
 * A plain `<img>` rather than `next/image`: the sources are vector, so there
 * is nothing to resize or re-encode, and `next/image` would need
 * `dangerouslyAllowSVG` switched on for the whole project to serve them.
 * Width and height are declared, so the box is reserved before the file lands
 * and the layout does not shift.
 */
export default function MediaFigure({
  image,
  priority = false,
  className = "",
}: {
  image: ImageAsset;
  /** Set on the one image above the fold; everything else loads lazily. */
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure className={`panel panel-lip overflow-hidden ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- the sources are
          SVG: there is nothing for next/image to resize or re-encode, and
          serving them through it would mean enabling dangerouslyAllowSVG for
          the whole project. Dimensions are declared, so there is no CLS. */}
      <img
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className="h-auto w-full"
      />
      {image.caption && (
        <figcaption className="border-t border-white/[0.07] px-6 py-4 text-caption text-content-faint">
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
}
