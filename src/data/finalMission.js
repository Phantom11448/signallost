

const REQUIREMENTS = [
  {
    text: "Start with `<!DOCTYPE html>`, then `<html>`, `<head>` containing `<title>Distress Signal — StarBurner Rebuild</title>`, `<meta charset=\"UTF-8\">`, and `<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">`, then `<body>`",
    tests: [
      { test: (v) => /<!DOCTYPE\s+html>/i.test(v), msg: "Missing or incorrect <!DOCTYPE html>" },
      { test: (v) => /<html>/i.test(v), msg: "Missing <html>" },
      { test: (v) => /<head>[\s\S]*<\/head>/i.test(v), msg: "Missing <head>" },
      { test: (v) => /<title>\s*distress signal\s*[—-]\s*starburner rebuild\s*<\/title>/i.test(v), msg: "Check the title text" },
      { test: (v) => /<meta[^>]*charset="utf-8"[^>]*>/i.test(v), msg: "Missing or incorrect charset meta tag" },
      { test: (v) => /<meta[^>]*name="viewport"[^>]*content="width=device-width,\s*initial-scale=1\.0"[^>]*>/i.test(v) || /<meta[^>]*content="width=device-width,\s*initial-scale=1\.0"[^>]*name="viewport"[^>]*>/i.test(v), msg: "Missing or incorrect viewport meta tag" },
      { test: (v) => /<body>/i.test(v), msg: "Missing <body>" },
    ],
  },
  {
    text: "A `<header>` containing an `<h1>` that says `DISTRESS SIGNAL — StarBurner` and a `<nav>` with an `<a href=\"https://rescue.phantar\">` that says `Contact Phantar`",
    tests: [
      { test: (v) => /<header>[\s\S]*<h1>[\s\S]*distress signal[\s\S]*starburner[\s\S]*<\/h1>[\s\S]*<\/header>/i.test(v), msg: "Check the header and h1" },
      { test: (v) => /<nav>[\s\S]*<a[^>]*href="https:\/\/rescue\.phantar"[^>]*>\s*contact phantar\s*<\/a>[\s\S]*<\/nav>/i.test(v), msg: "Check the nav and link" },
    ],
  },
  {
    text: "A `<main>` containing a `<section>` with a `<p>` using `<strong>` around `Priority transmission.` and a separate `<p>` using `<em>` around `Crew status verified.`",
    tests: [
      { test: (v) => /<main>[\s\S]*<section>[\s\S]*<\/section>[\s\S]*<\/main>/i.test(v), msg: "Missing main with a section inside it" },
      { test: (v) => /<p[^>]*>\s*<strong>[\s\S]*priority transmission\.[\s\S]*<\/strong>\s*<\/p>/i.test(v), msg: "Check the strong paragraph" },
      { test: (v) => /<p[^>]*>\s*<em>[\s\S]*crew status verified\.[\s\S]*<\/em>\s*<\/p>/i.test(v), msg: "Check the em paragraph" },
    ],
  },
  {
    text: "An `<img>` with `src=\"crashsite.jpg\"` and a real descriptive `alt`",
    tests: [
      { test: (v) => /<img[^>]*src="crashsite\.jpg"[^>]*alt="[^"]{5,}"[^>]*>/i.test(v) || /<img[^>]*alt="[^"]{5,}"[^>]*src="crashsite\.jpg"[^>]*>/i.test(v), msg: "Check the img — src and a real descriptive alt" },
    ],
  },
  {
    text: "A `<ul>` with three `<li>` items: `helium: critical`, `water: critical`, and `Gerald: still watching`",
    tests: [
      { test: (v) => /<ul>[\s\S]*<li>[\s\S]*helium:\s*critical[\s\S]*<\/li>[\s\S]*<li>[\s\S]*water:\s*critical[\s\S]*<\/li>[\s\S]*<li>[\s\S]*gerald:\s*still watching[\s\S]*<\/li>[\s\S]*<\/ul>/i.test(v), msg: "Check the supply list — all three items, exact wording" },
    ],
  },
  {
    text: "A `<button>` that says `Request Emergency Supply Drop`",
    tests: [
      { test: (v) => /<button>\s*request emergency supply drop\s*<\/button>/i.test(v), msg: "Check the supply drop button" },
    ],
  },
  {
    text: "A `<blockquote>` that says `If you are receiving this &mdash; the StarBurner did not complete its eviction of the man trespassing on our moon.`, using the entity `&mdash;` for the dash",
    tests: [
      { test: (v) => /<blockquote>[\s\S]*if you are receiving this[\s\S]*&mdash;[\s\S]*trespassing on our moon\.[\s\S]*<\/blockquote>/i.test(v), msg: "Check the blockquote text — including the &mdash; entity" },
    ],
  },
  {
    text: "A `<table>` with a header row (`<th>` cells: `Name`, `Role`, `Status`) and two data rows (`<td>` cells) for `Zhan, Pilot, Alive` and `Zorbin, Navigator, Unaccounted for`",
    tests: [
      { test: (v) => /<table>[\s\S]*<th>\s*name\s*<\/th>[\s\S]*<th>\s*role\s*<\/th>[\s\S]*<th>\s*status\s*<\/th>[\s\S]*<td>\s*zhan\s*<\/td>[\s\S]*<td>\s*pilot\s*<\/td>[\s\S]*<td>\s*alive\s*<\/td>[\s\S]*<td>\s*zorbin\s*<\/td>[\s\S]*<td>\s*navigator\s*<\/td>[\s\S]*<td>\s*unaccounted for\s*<\/td>[\s\S]*<\/table>/i.test(v), msg: "Check the table — header row and both data rows" },
    ],
  },
  {
    text: "A `<form>` containing a `<label for=\"callsign\">` that says `Pilot Callsign:`, a matching `<input type=\"text\" id=\"callsign\">`, and a `<button type=\"submit\">` that says `Send Configuration`",
    tests: [
      { test: (v) => /<form>[\s\S]*<label[^>]*for="callsign"[^>]*>[\s\S]*pilot callsign:[\s\S]*<\/label>[\s\S]*<input[^>]*type="text"[^>]*id="callsign"[^>]*>[\s\S]*<button[^>]*type="submit"[^>]*>\s*send configuration\s*<\/button>[\s\S]*<\/form>/i.test(v), msg: "Check the form — label, matching input, and submit button" },
    ],
  },
  {
    text: "A `<video>` tag with `controls` and `src=\"crashsite.mp4\"`",
    tests: [
      { test: (v) => /<video[^>]*controls[^>]*src="crashsite\.mp4"[^>]*>/i.test(v) || /<video[^>]*src="crashsite\.mp4"[^>]*controls[^>]*>/i.test(v), msg: "Check the video tag" },
    ],
  },
  {
    text: "A `<button>` with `aria-label=\"Replay distress transmission\"` containing the text `Replay`",
    tests: [
      { test: (v) => /<button[^>]*aria-label="replay distress transmission"[^>]*>\s*replay\s*<\/button>/i.test(v), msg: "Check the aria-label button" },
    ],
  },
  {
    text: "An HTML comment that says `Rebuilt transmission — full reconstruction`",
    tests: [
      { test: (v) => /<!--\s*rebuilt transmission\s*[—-]\s*full reconstruction\s*-->/i.test(v), msg: "Check the comment text" },
    ],
  },
  {
    text: "A `<style>` tag with at least one rule, and one element using an inline `style` attribute",
    tests: [
      { test: (v) => /<style>[\s\S]*{[\s\S]*}[\s\S]*<\/style>/i.test(v), msg: "Missing a style tag with at least one rule" },
      { test: (v) => /style="[^"]+"/i.test(v), msg: "Missing an inline style attribute on any element" },
    ],
  },
];

export const finalMission = {
  id: "final",
  title: "Rebuild the Distress Signal",
  subtitle: "Final Transmission",
  badge: "🛰️",
  storyTag: "FULL RECONSTRUCTION",

  intro: [
    "Phantar received the transmission. All fourteen modules. Every patch, every repair, every corrupted piece rebuilt by hand.",
    "It arrived destroyed. Not corrupted — destroyed. Gorp's own words: 'catastrophic data loss on arrival.' Two hundred years reviewing transmissions, and Gorp has never seen one just vanish like that.",
    "There is no partial save. No backup. Everything has to be rebuilt, from nothing, in one sitting, correctly, or this ship stays exactly where it is.",
    "Wooch says this is the real test. Not any single tag. Not any single mission. Whether I actually learned this, or just survived fourteen modules one at a time without ever holding the whole thing together.",
    "I am about to find out.",
  ],

  requirements: REQUIREMENTS,

  challenge: {
    id: "final-rebuild",
    relevantTags: [],
    check: (v) => {
      const n = v.trim();
      if (!n) return "Type something";
      for (const req of REQUIREMENTS) {
        for (const t of req.tests) {
          if (!t.test(v)) return t.msg;
        }
      }
      if (!/<html>[\s\S]*<\/html>/i.test(v)) return "Missing closing </html> tag";
      if (!/<body>[\s\S]*<\/body>/i.test(v)) return "Missing closing </body> tag";
      return "pass";
    },
  },

  completionMessage: "Retransmitted. Complete. Every module, every repair, every piece — all of it, at once, correctly, from nothing.\n\nPhantar confirmed receipt in full. Voss authorized the rescue vessel. Gorp reviewed the transmission and said one word: 'Exemplary.' Wooch says that is, without exaggeration, the best thing Gorp has ever said about anything, to anyone, in two hundred years.\n\nThe StarBurner crew is going home. Zorbin included, eventually, once he finishes whatever he's doing at that food truck.\n\nSignal found. Distress answered. Transmission complete.",
};