/*
  PAGE ASSEMBLY
  ------------------------------------------------------------
  Takes your content (the files in the "content" folder) and
  places it into the page using the components in components.js.
  Sections with no content are hidden automatically.

  You don't need to edit this file to change your content.
*/

(function () {
  "use strict";

  var P = window.PORTFOLIO || {};
  var UI = window.UI;
  var $ = function (id) { return document.getElementById(id); };
  var profile = P.profile || {};
  var experience = Array.isArray(P.experience) ? P.experience : [];
  var awards = Array.isArray(P.awards) ? P.awards : [];
  var projects = Array.isArray(P.projects) ? P.projects : [];

  // ---------- Friendly warning if a content file has a typo ----------
  var expected = {
    profile: "content/profile.js",
    experience: "content/experience.js",
    awards: "content/awards.js",
    projects: "content/projects.js",
  };
  var broken = Object.keys(expected).filter(function (key) { return P[key] === undefined; })
    .map(function (key) { return expected[key]; });
  if (broken.length) {
    var notice = $("content-notice");
    notice.innerHTML =
      "<strong>Part of your portfolio couldn't load.</strong> Check " +
      broken.map(function (f) { return "<code>" + f + "</code>"; }).join(" and ") +
      " for a missing comma or quote mark near your last change. The README explains how to undo a change.";
    notice.hidden = false;
  }

  // ---------- Header and hero ----------
  var first = profile.firstName || "";
  var last = profile.lastName || "";
  var fullName = (first + " " + last).trim();
  var initials = (first.charAt(0) + last.charAt(0)).toUpperCase();

  $("logo").innerHTML = UI.escapeText(initials) + "<span>.</span>";
  $("eyebrow").textContent = UI.hasText(profile.eyebrow) ? "— " + profile.eyebrow : "";
  $("name").innerHTML = UI.escapeText(first) + (last ? "<br><em>" + UI.escapeText(last) + ".</em>" : "");
  $("intro").innerHTML = UI.richText(profile.intro);
  if (!UI.hasText(profile.intro)) $("intro").hidden = true;

  // Photo: tries the file named in profile.js, then the other common
  // formats with the same name. Shows initials if none is found.
  var portrait = $("portrait");
  portrait.innerHTML = '<span class="portrait-initials" aria-hidden="true">' + UI.escapeText(initials) + "</span>";
  var photo = UI.safeUrl(profile.photo);
  if (photo) {
    var base = photo.replace(/\.(jpe?g|png|webp)$/i, "");
    var candidates = [photo, base + ".jpg", base + ".jpeg", base + ".png", base + ".webp"]
      .filter(function (v, i, all) { return all.indexOf(v) === i; });
    (function tryNext(i) {
      if (i >= candidates.length) return;
      var img = new Image();
      img.alt = "Photo of " + fullName;
      img.onload = function () { portrait.innerHTML = ""; portrait.appendChild(img); };
      img.onerror = function () { tryNext(i + 1); };
      img.src = candidates[i];
    })(0);
  }

  var heroActions = UI.Button({
    label: profile.resumeButton || "Download résumé",
    url: profile.resume,
    variant: "primary",
    icon: "download",
    checkFile: true,
  });
  if (projects.length) {
    heroActions +=
      '<button type="button" class="btn btn-outline" id="work-toggle" aria-expanded="false" aria-controls="work">' +
      "<span>" + UI.escapeText(profile.workButton || "View my work") + "</span>" + UI.Icon("chevron", "chev") +
      "</button>";
  }
  $("hero-actions").innerHTML = heroActions;

  // ---------- Projects (hidden until "View my work" is clicked) ----------
  if (projects.length) {
    $("project-list").innerHTML = projects.map(UI.ProjectCard).join("");
    var work = $("work");
    var toggle = $("work-toggle");
    var label = toggle.querySelector("span");
    var openLabel = profile.workButton || "View my work";
    var closeLabel = openLabel.replace(/^View\b/i, "Hide");
    if (closeLabel === openLabel) closeLabel = "Hide";
    var setOpen = function (open, scroll) {
      work.hidden = !open;
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      label.textContent = open ? closeLabel : openLabel;
      if (open && scroll) work.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    toggle.addEventListener("click", function () { setOpen(work.hidden, true); });
    if (/^#(work|project-\d+)$/.test(location.hash)) setOpen(true, true);
  }

  // ---------- Experience and awards ----------
  if (experience.length) $("jobs").innerHTML = experience.map(UI.ExperienceItem).join("");
  else $("experience").hidden = true;

  if (awards.length) $("award-list").innerHTML = awards.map(UI.AwardItem).join("");
  else $("awards").hidden = true;

  if (!experience.length && !awards.length) $("career").hidden = true;

  // Menu links only for sections that are showing.
  var nav = "";
  if (experience.length) nav += '<a href="#experience">Experience</a>';
  if (awards.length) nav += '<a href="#awards">Awards</a>';
  nav += '<a class="nav-cta" href="#contact">Let\'s talk</a>';
  $("nav").innerHTML = nav;

  // ---------- Contact and footer ----------
  $("contact-headline").innerHTML = UI.escapeText(profile.contactHeadline) +
    (UI.hasText(profile.contactHighlight) ? " <em>" + UI.escapeText(profile.contactHighlight) + "</em>" : "");

  var email = String(profile.email || "").trim();
  var contactButtons = "";
  if (/^[^\s@\[\]]+@[^\s@\[\]]+\.[^\s@\[\]]+$/.test(email)) {
    contactButtons += UI.Button({ label: "Email", url: "mailto:" + email, variant: "light", icon: "mail", newTab: false });
  }
  contactButtons += UI.Button({ label: "LinkedIn", url: profile.linkedin, variant: "ghost" });
  contactButtons += UI.Button({ label: "GitHub", url: profile.github, variant: "ghost" });
  $("contact-actions").innerHTML = contactButtons;

  $("copyright").textContent = "© " + new Date().getFullYear() + " " + fullName;
  $("footer-note").textContent = profile.footerNote || "";
  if (fullName) document.title = fullName + (UI.hasText(profile.footerNote) ? " — " + profile.footerNote.split("·")[0].trim() : "");

  // ---------- Hide buttons whose file hasn't been uploaded yet ----------
  // (Only on the live site; when you open the page from your computer,
  // every button stays visible.)
  if (/^https?:$/.test(location.protocol) && window.fetch) {
    Array.prototype.forEach.call(document.querySelectorAll("[data-check-file]"), function (link) {
      fetch(link.getAttribute("data-check-file"), { method: "HEAD" })
        .then(function (res) { if (!res.ok) link.remove(); })
        .catch(function () {});
    });
  }

  // ---------- Header border on scroll ----------
  var header = $("header");
  var onScroll = function () { header.classList.toggle("scrolled", window.scrollY > 8); };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
