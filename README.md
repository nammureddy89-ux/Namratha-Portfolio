# Namratha Kankanala — Portfolio

A one-page Product Manager portfolio, hosted free on GitHub Pages.

**Live site:** https://nammureddy89-ux.github.io/Namratha-Portfolio/

This guide is written for non-developers. You only ever need to touch the
**content**, **images** and **documents** folders.

---

## 1. What's where

| Folder / file | What it holds | Do you edit it? |
|---|---|---|
| `content/profile.js` | Your name, intro (About Me), email, LinkedIn, contact line | **Yes** |
| `content/experience.js` | Your jobs | **Yes** |
| `content/awards.js` | Your awards | **Yes** |
| `content/projects.js` | Your projects and case studies | **Yes** |
| `images/` | Your photo (and optional project pictures) | **Yes**, by uploading files |
| `documents/` | Your résumé and case study PDFs | **Yes**, by uploading files |
| `index.html` | The order of the sections | No |
| `assets/` | Design and code that build the page | No |

Each content file starts with a short note explaining what it controls.

---

## 2. The golden rules for editing content files

1. **Change only the text inside the quote marks.** In `title: "Saathi",` you change `Saathi`.
2. **Keep the comma at the end of each line.**
3. **To hide something, leave it empty:** `tagline: "",`
4. **Inside quote marks, avoid typing `"`.** Use `“curly quotes”` or `'single quotes'` instead.
   (If you must use a straight `"`, type `\"`.)
5. **Bold:** wrap words in double stars: `**FinTech**`.
6. **New paragraph** (in case studies): leave a blank line in the text.

If you break one of these rules, the site shows a **yellow warning bar** naming the file
with the problem. Nothing is lost: see "Undo a mistake" below.

---

## 3. How to make any change on GitHub

Every change follows the same four steps:

1. Go to **github.com/nammureddy89-ux/nammureddy89-ux.github.io**.
2. Open the file (for example click `content` → `projects.js`).
3. Click the **pencil icon** (top right of the file), make your change.
4. Click **Commit changes** → **Commit changes** again.

That's it: **saving ("committing") is publishing.** Your live site updates in
1–2 minutes. If you don't see the change, refresh the page
(on a laptop: **Ctrl + Shift + R**, or **Cmd + Shift + R** on a Mac).

---

## 4. Common tasks

### Change your intro, email or LinkedIn
Edit `content/profile.js`. Your email shows as a button once you replace
`[your email]` with your real address.

### Update a project description
Edit `content/projects.js`, find the project, change its `tagline` or `summary`.

### Remove text
Empty it out (`summary: "",`). The space it used disappears automatically.
To remove a whole job, award or project, delete its block from `{` to `},`.

### Add a job or award
In `content/experience.js` or `content/awards.js`, copy one existing block
(from `{` to `},`), paste it where you want it, and change the text.
Newest goes first.

### Add a new project
New projects appear under **View my work**, below the existing ones, with the
same design and an orange **"Open …"** button like "Open Saathi".
The example below uses a made-up project called "Budget Buddy".

**Step 1. Open the file**
On GitHub, click `content` → `projects.js` → the **pencil icon**.

**Step 2. Find the end of the last project**
Scroll down until you see these two lines, just after the last project's details
(the bottom of the Saathi project, if it's still the last one):

```
  },
];
```

**Step 3. Paste the new project between them**
Click at the end of the `},` line, press **Enter**, and paste this block:

```
  {
    label: "Featured work",
    title: "Budget Buddy",
    tagline: "One short line about what it is.",
    summary: "Two or three sentences: the problem, what you built and the result.",
    image: "",
    links: [
      { label: "Open Budget Buddy", url: "https://your-app-link-here" },
    ],
    highlights: [],
    caseStudy: [],
  },
```

The end of the file should now look like this:

```
  },        ← end of the previous project
  {
    ...     ← your new project
  },
];
```

(The same block is also at the bottom of `projects.js`, marked **BLANK TEMPLATE**.)

**Step 4. Fill in your details**
Change only the text inside the quote marks:

| Line | What to write |
|---|---|
| `label` | Small heading above the name, e.g. "Featured work" or "Side project" |
| `title` | The project name |
| `tagline` | One short line under the name |
| `summary` | The description: the problem, what you built and the result |
| `links` | The button text and your app's web address (starting with `https://`) |

**Step 5. Save**
Click **Commit changes**. In 1–2 minutes the project appears on your live site.

#### Optional: add a case study PDF button
1. Open the `documents` folder → **Add file** → **Upload files** → upload your PDF
   (for example `budget-buddy.pdf`). Use a simple file name with no spaces.
2. In your project, add a second line inside `links`:

```
    links: [
      { label: "Open Budget Buddy", url: "https://your-app-link-here" },
      { label: "View case study (PDF)", url: "documents/budget-buddy.pdf" },
    ],
```

This gives you the same two buttons Saathi has. The first button is always orange;
the others are outlined.

#### Other optional extras
- **A picture:** upload it to `images/`, then set `image: "images/your-file.png",`
- **Highlight cards:** add items inside `highlights`, for example
  `{ title: "Short title", text: "One or two sentences." },`
- **A written case study:** add parts inside `caseStudy`, for example
  `{ heading: "The problem", text: "What was wrong, and for whom." },`
  Visitors see a "Read the case study" link that opens it.

#### If something goes wrong
A **yellow bar** at the top of the site will name `content/projects.js`. It almost
always means a missing comma after a `}` or a missing quote mark. Compare your
block with the example above, or use "Undo a mistake" (section 6).

### Replace your résumé
1. Name your new PDF exactly **`resume.pdf`**.
2. Open the `documents` folder on GitHub → **Add file** → **Upload files**.
3. Drag it in → **Commit changes**. It replaces the old one.

Until a résumé is uploaded, the "Download résumé" button is hidden on the live site.

### Replace your photo
1. Name your photo **`photo.jpg`** (or `photo.png`).
2. Open the `images` folder → **Add file** → **Upload files** → drag it in → **Commit changes**.

A portrait-shaped photo works best; it's cropped to fit. Until a photo is
uploaded, your initials are shown.

### Replace a case study PDF
Upload the new PDF to `documents/` with the **same file name** as the old one.

---

## 5. Preview before publishing (optional)

Use this for bigger changes, such as adding a new project.

1. On the repo page, click the green **Code** button → **Download ZIP**. Unzip it.
2. Open a content file in a plain text editor (**Notepad** on Windows, **TextEdit** on Mac)
   and make your change. Save.
3. Double-click **`index.html`**. It opens in your browser exactly as the site will look.
   (Your résumé and photo buttons show even if the files are missing; that's normal here.)
4. Happy? Upload the changed file to the same folder on GitHub
   (**Add file** → **Upload files**) and commit. It replaces the old version.

---

## 6. Undo a mistake

1. Open the file on GitHub and click **History** (top right).
2. Click the change **before** your mistake, then **View file** (the `...` menu or `<>` button).
3. Click the **Copy raw file** button.
4. Open the current file, click the pencil, select all the text, paste, and commit.

---

## 7. First-time setup (already done once)

1. Create a **public** repository named exactly `nammureddy89-ux.github.io`.
2. Upload everything in this folder, keeping the folder structure
   (drag the folders themselves into the upload page).
3. Go to **Settings → Pages** → Source: **Deploy from a branch** → **main** / **(root)** → **Save**.
4. After 1–2 minutes the site is live at https://nammureddy89-ux.github.io.
