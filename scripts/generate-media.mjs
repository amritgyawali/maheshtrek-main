// @ts-check
/**
 * Generates the illustration for every content page into `public/media/`.
 *
 * The client has supplied no photography. Rather than fake a stock photo of
 * somebody else's newsroom, each page gets a drawn plate: the site's own
 * canvas, its two light sources, its grid, and a motif chosen from the
 * department the page belongs to. The output is deterministic — the same slug
 * always produces the same file — so regenerating never churns the diff.
 *
 *   node scripts/generate-media.mjs
 *
 * Replacing any file with a real photograph of the same name and the same 16:9
 * box is the only change needed once a shoot happens.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const W = 1200;
const H = 675;

const CANVAS = "#08090C";
const ACCENT = "#FF3B4F";
const IRIS = "#7A6BFF";
const MINT = "#2FE3A6";
const LINE = "rgba(255,255,255,0.10)";

/** Deterministic 32-bit hash, so a slug always draws the same plate. */
function hash(text) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i += 1) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Seeded generator in [0,1). */
function rng(seed) {
  let state = seed || 1;
  return () => {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    state >>>= 0;
    return state / 4294967296;
  };
}

const round = (n) => Math.round(n * 100) / 100;

function shell(slug, motif) {
  const seed = hash(slug);
  const r = rng(seed);
  const glowX = round(140 + r() * 260);
  const glowY = round(90 + r() * 160);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img">
  <defs>
    <radialGradient id="a" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${ACCENT}" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="${ACCENT}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="i" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${IRIS}" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="${IRIS}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="s" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${ACCENT}"/>
      <stop offset="100%" stop-color="${IRIS}"/>
    </linearGradient>
    <pattern id="g" width="72" height="72" patternUnits="userSpaceOnUse">
      <path d="M72 0H0v72" fill="none" stroke="rgba(255,255,255,0.045)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="${W}" height="${H}" fill="${CANVAS}"/>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <circle cx="${glowX}" cy="${glowY}" r="420" fill="url(#a)"/>
  <circle cx="${round(W - glowX * 0.6)}" cy="${round(H - glowY * 0.5)}" r="380" fill="url(#i)"/>
${motif}
  <rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" fill="none" stroke="rgba(255,255,255,0.09)"/>
</svg>
`;
}

/** Production: a film gate — frame bars either side of an aperture. */
function motifFrame(slug) {
  const r = rng(hash(slug));
  const bars = [];
  for (let i = 0; i < 9; i += 1) {
    const y = 70 + i * 62;
    bars.push(
      `  <rect x="70" y="${y}" width="46" height="34" rx="6" fill="${LINE}"/>`,
      `  <rect x="${W - 116}" y="${y}" width="46" height="34" rx="6" fill="${LINE}"/>`
    );
  }
  const cx = 600;
  const cy = 338;
  const blades = [];
  for (let i = 0; i < 6; i += 1) {
    const angle = (i * Math.PI) / 3 + r() * 0.2;
    const x1 = round(cx + Math.cos(angle) * 96);
    const y1 = round(cy + Math.sin(angle) * 96);
    const x2 = round(cx + Math.cos(angle + 1.05) * 96);
    const y2 = round(cy + Math.sin(angle + 1.05) * 96);
    blades.push(
      `  <path d="M${x1} ${y1} L${x2} ${y2}" stroke="url(#s)" stroke-width="3" stroke-linecap="round" opacity="0.85"/>`
    );
  }
  return [
    ...bars,
    `  <circle cx="${cx}" cy="${cy}" r="150" fill="none" stroke="rgba(255,255,255,0.14)" stroke-width="2"/>`,
    `  <circle cx="${cx}" cy="${cy}" r="96" fill="none" stroke="rgba(255,255,255,0.20)" stroke-width="2"/>`,
    ...blades,
    `  <circle cx="${cx}" cy="${cy}" r="12" fill="${ACCENT}"/>`,
  ].join("\n");
}

/** Social media: a signal graph — nodes wired back to one source. */
function motifNetwork(slug) {
  const r = rng(hash(slug));
  const cx = 600;
  const cy = 338;
  const nodes = [];
  const edges = [];
  const count = 11;
  for (let i = 0; i < count; i += 1) {
    const angle = (i / count) * Math.PI * 2 + r() * 0.35;
    const radius = 140 + r() * 190;
    const x = round(cx + Math.cos(angle) * radius * 1.5);
    const y = round(cy + Math.sin(angle) * radius);
    edges.push(
      `  <path d="M${cx} ${cy} L${x} ${y}" stroke="rgba(255,255,255,0.12)" stroke-width="1.5"/>`
    );
    nodes.push(
      `  <circle cx="${x}" cy="${y}" r="${round(5 + r() * 9)}" fill="${
        i % 4 === 0 ? IRIS : "rgba(255,255,255,0.22)"
      }"/>`
    );
  }
  return [
    ...edges,
    ...nodes,
    `  <circle cx="${cx}" cy="${cy}" r="34" fill="url(#s)"/>`,
    `  <circle cx="${cx}" cy="${cy}" r="62" fill="none" stroke="rgba(255,255,255,0.16)" stroke-width="2"/>`,
  ].join("\n");
}

/** Training: stacked levels, each one wider than the last. */
function motifLevels(slug) {
  const r = rng(hash(slug));
  const rows = [];
  for (let i = 0; i < 5; i += 1) {
    const width = round(240 + i * 130 + r() * 60);
    const y = 120 + i * 88;
    rows.push(
      `  <rect x="150" y="${y}" width="${width}" height="46" rx="12" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.12)"/>`,
      `  <rect x="150" y="${y}" width="${round(width * (0.2 + r() * 0.5))}" height="46" rx="12" fill="url(#s)" opacity="0.5"/>`
    );
  }
  return rows.join("\n");
}

/** Research: a scatter of readings with a trend through them. */
function motifPlot(slug) {
  const r = rng(hash(slug));
  const points = [];
  const path = [];
  for (let i = 0; i < 26; i += 1) {
    const x = round(140 + (i / 25) * (W - 300));
    const base = H - 150 - (i / 25) * 300;
    const y = round(base + (r() - 0.5) * 120);
    points.push(
      `  <circle cx="${x}" cy="${y}" r="${round(3 + r() * 6)}" fill="${
        i % 5 === 0 ? MINT : "rgba(255,255,255,0.28)"
      }"/>`
    );
    path.push(`${i === 0 ? "M" : "L"}${x} ${round(base)}`);
  }
  return [
    `  <path d="M140 ${H - 110} H${W - 140}" stroke="rgba(255,255,255,0.14)" stroke-width="2"/>`,
    `  <path d="M140 90 V${H - 110}" stroke="rgba(255,255,255,0.14)" stroke-width="2"/>`,
    `  <path d="${path.join(" ")}" fill="none" stroke="url(#s)" stroke-width="3.5" stroke-linecap="round"/>`,
    ...points,
  ].join("\n");
}

/** Company pages: broadcast arcs leaving a source. */
function motifBroadcast(slug) {
  const r = rng(hash(slug));
  const cx = 380;
  const cy = 338;
  const arcs = [];
  for (let i = 1; i <= 5; i += 1) {
    const radius = i * 78 + r() * 12;
    arcs.push(
      `  <path d="M${round(cx + radius * 0.35)} ${round(cy - radius)} A${round(radius)} ${round(
        radius
      )} 0 0 1 ${round(cx + radius * 0.35)} ${round(cy + radius)}" fill="none" stroke="${
        i % 2 ? "rgba(255,255,255,0.16)" : "url(#s)"
      }" stroke-width="${round(4 - i * 0.4)}" stroke-linecap="round"/>`
    );
  }
  const bars = [];
  for (let i = 0; i < 16; i += 1) {
    const h = round(20 + r() * 150);
    bars.push(
      `  <rect x="${820 + i * 22}" y="${round(cy + 120 - h)}" width="10" height="${h}" rx="5" fill="rgba(255,255,255,0.16)"/>`
    );
  }
  return [...arcs, `  <circle cx="${cx}" cy="${cy}" r="16" fill="${ACCENT}"/>`, ...bars].join("\n");
}

const MOTIF = {
  frame: motifFrame,
  network: motifNetwork,
  levels: motifLevels,
  plot: motifPlot,
  broadcast: motifBroadcast,
};

/** slug -> motif, matching the department each page belongs to. */
const PLATES = [
  ["sections/about", "broadcast"],
  ["sections/right-sanchar", "broadcast"],
  ["sections/production", "frame"],
  ["sections/social-media", "network"],
  ["sections/training", "levels"],
  ["sections/research-development", "plot"],

  ["services/services", "network"],

  ["services/biography", "frame"],
  ["services/documentary", "frame"],
  ["services/advertising", "frame"],
  ["services/profile-making", "frame"],

  ["services/digital-profile", "network"],
  ["services/media-consulting", "network"],
  ["services/facebook-boosting", "network"],
  ["services/social-media-ads", "network"],
  ["services/event-coverage", "network"],

  ["services/social-media-training", "levels"],
  ["services/content-creation", "levels"],
  ["services/journalism-basics", "levels"],
  ["services/creative-technical", "levels"],
  ["services/idea-monetization", "levels"],

  ["services/source-research", "plot"],
  ["services/government-collaboration", "plot"],
];

const written = [];
for (const [name, motif] of PLATES) {
  const file = join(ROOT, "public", "media", `${name}.svg`);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, shell(name, MOTIF[motif](name)), "utf8");
  written.push(`/media/${name}.svg`);
}

console.log(`wrote ${written.length} plates`);
for (const path of written) console.log(`  ${path}`);
