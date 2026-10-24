/*
  PROJECTS & CASE STUDIES
  ------------------------------------------------------------
  Shown when a visitor clicks "View my work". Every project uses
  the same card design, in the order listed here.

  TO ADD A PROJECT
  1. Copy the blank template at the very bottom of this file
     (everything between the dashed lines).
  2. Paste it inside the list below, after the last project's "},".
  3. Fill in the text. Leave anything you don't need as "" or [].

  WHAT EACH FIELD DOES
  - label:      small heading above the name, e.g. "Featured work"
  - title:      the project name
  - tagline:    one short line under the name
  - summary:    2–3 sentences describing the project
  - image:      optional picture, e.g. "images/projects/saathi.png"
  - links:      buttons. The first one is orange, the rest are outlined.
                Links ending in .pdf get a document icon automatically.
  - highlights: optional small cards, each with a title and text
  - caseStudy:  optional written case study, shown behind a
                "Read the case study" toggle. Each part has a
                heading and text. Leave a blank line inside the
                text to start a new paragraph.
*/

PORTFOLIO.projects = [
  {
    label: "Featured work · Built solo",
    title: "Saathi",
    tagline: "Your honest travel companion for trips across India.",
    summary:
      "An AI-powered travel-planning app that takes you from \"where should we go?\" to a finished trip in one place. Discover and compare destinations, build an itinerary around your group, pace and budget, then track bookings and spending as you travel.",
    image: "",
    links: [
      { label: "Open Saathi", url: "https://nammureddy89-ux.github.io/Saathi-Your-Companion/" },
      { label: "View case study (PDF)", url: "documents/saathi-case-study.pdf" },
    ],
    highlights: [],
    caseStudy: [],
  },
];

/*
  ----------------------- BLANK TEMPLATE -----------------------
  {
    label: "Featured work",
    title: "Project name",
    tagline: "One short line about it.",
    summary: "Two or three sentences: the problem, what you did and the result.",
    image: "",
    links: [
      { label: "Open the app", url: "https://..." },
      { label: "View case study (PDF)", url: "documents/my-case-study.pdf" },
    ],
    highlights: [
      { title: "Short title", text: "One or two sentences." },
    ],
    caseStudy: [
      { heading: "The problem", text: "What was wrong, and for whom." },
      { heading: "What I did", text: "Your key decisions and why." },
      { heading: "The result", text: "What changed. Use real numbers where you have them." },
    ],
  },
  --------------------------------------------------------------
*/
