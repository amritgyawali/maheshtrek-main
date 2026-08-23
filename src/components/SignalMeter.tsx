/**
 * A level meter. Purely decorative, but it is the right decoration: सञ्चार is
 * transmission, and the feature tile on the home page is the news portal. It
 * fills a large surface without pretending to be a photograph the client has
 * not supplied. Frozen under prefers-reduced-motion by the global rule.
 */
const BARS = [38, 62, 30, 84, 52, 96, 44, 70, 34, 58, 26, 78, 46, 66, 32];

export default function SignalMeter({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`flex items-end gap-1.5 ${className}`}>
      {BARS.map((height, index) => (
        <span
          key={index}
          className="w-2 origin-bottom animate-bar rounded-full bg-gradient-to-t from-accent/25 via-accent/70 to-iris"
          style={{ height: `${height}%`, animationDelay: `${index * 110}ms` }}
        />
      ))}
    </div>
  );
}
