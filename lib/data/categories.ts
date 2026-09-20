export type SeedCategory = {
  name: string;
  slug: string;
  icon: string;
  description: string;
};

/** The 16 canonical categories. Existing 10 preserved, plus 5 new + Other. */
export const SEED_CATEGORIES: SeedCategory[] = [
  {
    name: "Writing",
    slug: "writing",
    icon: "✍️",
    description:
      "AI writing assistants, copywriters, paraphrasing tools, and text generators.",
  },
  {
    name: "Image",
    slug: "image",
    icon: "🎨",
    description:
      "AI image generators, editors, and creative visual tools.",
  },
  {
    name: "Video",
    slug: "video",
    icon: "🎬",
    description:
      "AI video generators, editors, and motion tools.",
  },
  {
    name: "Audio",
    slug: "audio",
    icon: "🎧",
    description:
      "AI music, speech, voice cloning, and audio production tools.",
  },
  {
    name: "Documents",
    slug: "documents",
    icon: "📄",
    description:
      "AI document tools for summarizing, analyzing, and working with files.",
  },
  {
    name: "Coding",
    slug: "coding",
    icon: "💻",
    description:
      "AI coding assistants, code generators, and developer productivity tools.",
  },
  {
    name: "Productivity",
    slug: "productivity",
    icon: "⚡",
    description:
      "AI productivity tools for planning, meetings, notes, and workflows.",
  },
  {
    name: "Education",
    slug: "education",
    icon: "🎓",
    description:
      "AI learning, tutoring, and study tools for students and teachers.",
  },
  {
    name: "Marketing",
    slug: "marketing",
    icon: "📈",
    description:
      "AI marketing, SEO, social media, and growth tools.",
  },
  {
    name: "Business",
    slug: "business",
    icon: "💼",
    description:
      "AI tools for business operations, sales, and support.",
  },
  {
    name: "Design",
    slug: "design",
    icon: "🎨",
    description:
      "AI design tools for UI, graphics, and brand creatives.",
  },
  {
    name: "Research",
    slug: "research",
    icon: "🔬",
    description:
      "AI research and analysis tools for deep investigation and insights.",
  },
  {
    name: "3D",
    slug: "3d",
    icon: "🧊",
    description:
      "AI 3D modeling, rendering, and spatial generation tools.",
  },
  {
    name: "Developer Tools",
    slug: "developer-tools",
    icon: "🛠️",
    description:
      "APIs, SDKs, and infrastructure tools for building AI products.",
  },
  {
    name: "Social Media",
    slug: "social-media",
    icon: "📱",
    description:
      "AI tools for social media content, scheduling, and engagement.",
  },
  {
    name: "Other",
    slug: "other",
    icon: "📦",
    description:
      "Useful AI tools that don't fit neatly into another category.",
  },
];

/** Mapping used to keep the existing 10 category names for their tools. */
export const categorySlugByLegacyName: Record<string, string> = Object.fromEntries(
  SEED_CATEGORIES.map((c) => [c.name, c.slug]),
);