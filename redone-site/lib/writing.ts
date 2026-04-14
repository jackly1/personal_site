export interface WritingLocaleFile {
  label: string;
  file: string;
}

export interface WritingPiece {
  slug: string;
  title: string;
  date: string;
  preview: string;
  /** Full text: Markdown file under `content/writing/` (good for long papers). */
  markdownFile?: string;
  /** Multiple language variants (e.g. EN/ES); shows a toggle on the piece page. */
  markdownLocales?: WritingLocaleFile[];
  /** Short pieces only: one string per paragraph. Omit when markdown files are set. */
  body?: string[];
}

export const writingPieces: WritingPiece[] = [
    // {
    //     slug: "on-building-repertory-nyc",
    //     title: "On Building Repertory NYC",
    //     date: "April 11 2026",
    //     preview: "Notes on building repertory.nyc, bugs, annoyances, etc.",
    //     markdownFile: "on-building-repertory-nyc.md",
    // },
    {
        slug: "warholian-inversion-in-live-streaming",
        title: "The Warholian Re-Emergence and Inversion in Live Streaming",
        date: "April 9 2026",
        preview:
            "Warhol's films and live streaming are structurally quite similar",
        markdownFile: "warholian-inversion-in-live-streaming.md",
    },
    {
        slug: "arrebato",
        title: "Analysis of Iván Zulueta's Arrebato",
        date: "May 7 2025",
        preview:
            "While living in Madrid, I attended Universidad Complutense de Madrid where I wrote this studying Spanish film history with Spanish students. I've translated it back to English here so it can be read in either language.",
        markdownLocales: [
            { label: "English", file: "arrebato-english.md" },
            { label: "Español", file: "arrebato-spanish.md" },
        ],
    },
    // {
    //     slug: "visual-echoing-in-czech-new-wave",
    //     title: "Visual Echoing In the Czech New Wave: Grappling With Female Sexuality in Patriarchal Czechoslovakia",
    //     date: "November 7 2024",
    //     preview: "The Czech ",
    //     markdownFile: "visual-echoing-in-czech-new-wave.md",
    // },
];

export function getWritingBySlug(slug: string): WritingPiece | undefined {
  return writingPieces.find((p) => p.slug === slug);
}
