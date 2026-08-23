import type { ContentStatus, Prose as ProseBlock } from "@/content/types";

/**
 * Content-status badge. Hidden in production builds unless
 * NEXT_PUBLIC_SHOW_CONTENT_STATUS=1, so the client can switch it on during
 * review and see exactly which paragraphs are still unapproved drafts.
 */
export function DraftBadge({ status, label }: { status: ContentStatus; label: string }) {
  if (status !== "draft") return null;
  if (process.env.NEXT_PUBLIC_SHOW_CONTENT_STATUS !== "1") return null;

  return (
    <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-gold-wash px-3 py-1 text-caption text-gold-dark">
      <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
      {label}
    </span>
  );
}

interface ProseProps {
  block: ProseBlock;
  draftLabel: string;
  size?: "md" | "lg";
  className?: string;
}

export default function Prose({ block, draftLabel, size = "md", className = "" }: ProseProps) {
  const textSize = size === "lg" ? "text-body-lg" : "text-body-md";

  return (
    <div className={`max-w-prose ${className}`}>
      <DraftBadge status={block.status} label={draftLabel} />
      <div className={`prose-body ${textSize} text-body`}>
        {block.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 32)}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}
