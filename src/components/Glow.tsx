/**
 * Decorative light sources. The dark canvas is lit from behind the panels
 * rather than outlined, so most sections place one or two of these and let the
 * glass surfaces on top pick the colour up.
 */
export default function Glow({
  tone = "accent",
  className = "",
  drift = false,
}: {
  tone?: "accent" | "iris";
  className?: string;
  drift?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute -z-10 rounded-full blur-3xl ${
        tone === "accent" ? "glow-accent" : "glow-iris"
      } ${drift ? "animate-drift" : ""} ${className}`}
    />
  );
}
