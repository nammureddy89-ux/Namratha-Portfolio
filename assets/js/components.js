/*
  REUSABLE COMPONENTS
  ------------------------------------------------------------
  Each function below builds one piece of the page (a button, a
  job, an award, a project card) from your content. Every section
  uses these same pieces, so the design stays consistent.

  You don't need to edit this file to change your content.
*/

(function () {
  "use strict";

  // ---------- Text helpers ----------

  // Makes text safe to show on the page.
  function escapeText(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  // Keeps the last short word (like "~5%") from wrapping onto a line by itself.
  function keepLastWordTogether(text) {
    return text.replace(/ (\S{1,6})$/, " $1");
  }

  // Safe text with **bold** support.
  function richText(value) {
    return escapeText(keepLastWordTogether(String(value == null ? "" : value).trim()))
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  }

  // Splits text on blank lines into paragraphs.
  function paragraphs(value, className) {
    var cls = className ? ' class="' + className + '"' : "";
    return String(value || "")
      .split(/\n\s*\n/)
      .map(function (p) { return p.trim(); })
      .filter(Boolean)
      .map(function (p) { return "<p" + cls + ">" + richText(p) + "</p>"; })
      .join("");
  }

  // Allows web links, email links, page anchors and files in this site.
  function safeUrl(value) {
    var url = String(value || "").trim();
    if (!url || /[\[\]]/.test(url)) return "";
    return /^(https?:|mailto:|#|[\w.\/ -]+$)/i.test(url) ? url : "";
  }

  function isExternal(url) { return /^https?:/i.test(url) || /\.pdf$/i.test(url); }

  function hasText(value) { return String(value == null ? "" : value).trim() !== ""; }

  // ---------- Icons ----------

  var ICONS = {
    download: '<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>',
    external: '<path d="M7 17 17 7"/><path d="M8 7h9v9"/>',
    file: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    chevron: '<path d="m6 9 6 6 6-6"/>',
    trophy: '<path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M17 5h3v2a3 3 0 0 1-3 3"/><path d="M7 5H4v2a3 3 0 0 0 3 3"/>',
  };

  function Icon(name, className) {
    if (!ICONS[name]) return "";
    return '<svg' + (className ? ' class="' + className + '"' : "") +
      ' aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
      ICONS[name] + "</svg>";
  }

  // ---------- Building blocks ----------

  // A button-styled link. variant: "primary" | "outline" | "light" | "ghost"
  function Button(options) {
    var url = safeUrl(options.url);
    if (!url || !hasText(options.label)) return "";
    var external = options.newTab != null ? options.newTab : isExternal(url);
    var iconBefore = options.icon && options.iconAfter !== true ? Icon(options.icon) : "";
    var iconAfter = options.icon && options.iconAfter === true ? Icon(options.icon) : "";
    return '<a class="btn btn-' + (options.variant || "primary") + '" href="' + escapeText(url) + '"' +
      (external ? ' target="_blank" rel="noopener"' : "") +
      (options.checkFile ? ' data-check-file="' + escapeText(url) + '"' : "") + ">" +
      iconBefore + "<span>" + escapeText(options.label) + "</span>" + iconAfter + "</a>";
  }

  // One job in the Experience list.
  function ExperienceItem(job, index) {
    return '<li class="job' + (index === 0 ? " latest" : "") + '">' +
      '<div class="job-meta">' +
        '<p class="job-dates">' + escapeText(job.dates) + "</p>" +
        (hasText(job.company) ? '<p class="job-company">' + escapeText(job.company) + "</p>" : "") +
      "</div>" +
      '<div class="job-body">' +
        "<h3>" + escapeText(job.role) + "</h3>" +
        (hasText(job.summary) ? "<p>" + richText(job.summary) + "</p>" : "") +
      "</div>" +
    "</li>";
  }

  // One award in the Recognition list.
  function AwardItem(award) {
    return '<li class="award">' +
      '<span class="award-icon">' + Icon("trophy") + "</span>" +
      '<div class="award-body">' +
        '<p class="award-title">' + escapeText(award.title) + "</p>" +
        (hasText(award.detail) ? '<p class="award-detail">' + richText(award.detail) + "</p>" : "") +
      "</div>" +
      '<span class="award-year">' + escapeText(award.year) + "</span>" +
    "</li>";
  }

  // The project buttons: first is orange, the rest outlined. PDFs get a document icon.
  function ProjectLinks(links) {
    var html = (links || []).map(function (link, i) {
      var isPdf = /\.pdf$/i.test(String(link.url || "").trim());
      return Button({
        label: link.label,
        url: link.url,
        variant: i === 0 ? "primary" : "outline",
        icon: isPdf ? "file" : "external",
        iconAfter: !isPdf,
        checkFile: !/^https?:/i.test(String(link.url || "")),
      });
    }).join("");
    return html ? '<div class="actions">' + html + "</div>" : "";
  }

  function Highlights(items) {
    var list = (items || []).filter(function (h) { return h && (hasText(h.title) || hasText(h.text)); });
    if (!list.length) return "";
    return '<div class="project-extra">' +
      '<h4 class="label">Highlights</h4>' +
      '<ul class="highlights">' + list.map(function (h) {
        return "<li>" +
          (hasText(h.title) ? '<p class="hl-title">' + escapeText(h.title) + "</p>" : "") +
          (hasText(h.text) ? '<p class="hl-text">' + richText(h.text) + "</p>" : "") +
        "</li>";
      }).join("") + "</ul>" +
    "</div>";
  }

  // A written case study, folded behind a toggle so the card stays short.
  function CaseStudy(sections) {
    var list = (sections || []).filter(function (s) { return s && (hasText(s.heading) || hasText(s.text)); });
    if (!list.length) return "";
    return '<details class="project-extra case-study">' +
      "<summary>" + Icon("chevron", "chev") + "<span>Read the case study</span></summary>" +
      '<div class="case-study-body">' + list.map(function (s) {
        return '<section class="case-study-part">' +
          (hasText(s.heading) ? "<h4>" + escapeText(s.heading) + "</h4>" : "") +
          paragraphs(s.text) +
        "</section>";
      }).join("") + "</div>" +
    "</details>";
  }

  // One project card. Every project uses this same design.
  function ProjectCard(project, index) {
    var image = safeUrl(project.image);
    return '<article class="project-card" id="project-' + (index + 1) + '">' +
      (image ? '<img class="project-image" src="' + escapeText(image) + '" alt="' + escapeText(project.title) + '" loading="lazy" onerror="this.remove()">' : "") +
      '<div class="project-main">' +
        (hasText(project.label) ? '<p class="eyebrow">' + escapeText(project.label) + "</p>" : "") +
        "<h2>" + escapeText(project.title) + "</h2>" +
        (hasText(project.tagline) ? '<p class="project-tagline">' + escapeText(project.tagline) + "</p>" : "") +
        (hasText(project.summary) ? paragraphs(project.summary, "project-summary") : "") +
        ProjectLinks(project.links) +
      "</div>" +
      Highlights(project.highlights) +
      CaseStudy(project.caseStudy) +
    "</article>";
  }

  window.UI = {
    escapeText: escapeText,
    richText: richText,
    safeUrl: safeUrl,
    hasText: hasText,
    Icon: Icon,
    Button: Button,
    ExperienceItem: ExperienceItem,
    AwardItem: AwardItem,
    ProjectCard: ProjectCard,
  };
})();
