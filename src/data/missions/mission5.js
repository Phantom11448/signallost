export const mission5 = {
  id: 5,
  title: "Seal the Hull",
  subtitle: "Page Structure",
  badge: "🏗️",
  storyTag: "HULL MODULE",
  atmosphere: "56 hours remaining",

  signalContribution: `<header>\n  <h1>DISTRESS SIGNAL — StarBurner</h1>\n</header>\n<main>\n  <section>\n    <h2>Crash Report</h2>\n    <p>Full transmission log attached below.</p>\n  </section>\n</main>\n<footer>\n  <p><small>Transmitted from unknown coordinates. Phantar Emergency Protocol 9.</small></p>\n</footer>`,
  bugExcerpt: `<header>\n  <h1>DISTRESS SIGNAL — StarBurner</h1>\n</header>\n<footer>\n  <p>Transmitted from unknown coordinates.</p>\n</footer>`,

  storyIntro: [
    "The log module transmitted clean. Zandek's message is on record. Phantar has it now.",
    "New requirement: structure. Apparently every transmission I've sent so far has been, in Brix's words, 'a pile of tags with no skeleton.' Brix did not say this kindly.",
    "Every page needs a skeleton — a proper hull, if you want to think about it the way Wooch does. Everything on the page has to live inside a section that says what it's for. A header for the top. A main for the important part. A footer for the bottom.",
    "Wooch says this is exactly like sealing a hull — everything needs to be in its correct compartment or the whole structure fails inspection.",
  ],

  slides: [
    {
      id: "html-skeleton",
      heading: "The Real Skeleton — html, head, body",
      body: "Every real HTML page starts with one line that isn't technically a tag at all: `<!DOCTYPE html>`. This declaration tells the browser which set of rules to use when reading your page — specifically, that this is a modern HTML document, not some older or different format. It always comes first, before the `html` tag itself, and it never has a closing tag or any attributes — it's simply stated once, at the very top, and that's it. Is this optional? Technically, browsers will still try to render a page without it, using an older, less predictable rendering mode called quirks mode — but every real, professional page includes it, and skipping it can cause small, confusing inconsistencies in how your page displays. Think of it as the very first thing you write, every single time, before anything else. Every single HTML page, no matter how simple or complex, is built on the same three-part skeleton. The `html` tag `wraps the entire page` — everything else lives inside it. Inside `html`, there are exactly two direct children: `head` and `body`. `head` holds information about the page that isn't shown directly to the reader — things like the page title that shows in a browser tab, or metadata search engines read. We'll cover `head` in detail in a later mission. `body` holds everything the reader actually sees — every heading, paragraph, image, list, and button you've written so far has technically been living inside a `body` tag this whole time, even though you haven't had to type it. Is this skeleton optional? No — every real webpage has it, even if some of it is invisible in day-to-day building. Will you see `body` do anything different from what you already know? No — `body` is just the official container for everything visible. You've been building inside it without knowing it existed until now.",
      zanComment: "Every page has been living inside a body tag this entire time and no one told me. I have been building a house without knowing there were walls.",
      anatomy: [
        { text: "<!DOCTYPE html>", color: "#ffe94d", highlight: "#ffe94d", label: "<!DOCTYPE html>", explain: "Always first. No closing tag. Tells the browser this is modern HTML." },
        { text: "<html>", color: "#00f5c4", highlight: "#00f5c4", label: "<html>", explain: "Wraps the entire page. Everything else lives inside this." },
        { text: "<head>", color: "#ffe94d", highlight: "#ffe94d", label: "<head>", explain: "Invisible page info — title, metadata. Covered in a later mission." },
        { text: "<body>", color: "#39ff14", highlight: "#39ff14", label: "<body>", explain: "Everything the user sees lives after this tag." },
        { text: "</html>", color: "#00f5c4", highlight: "#00f5c4", label: "</html>", explain: "Closes the entire page." },
      ],
      relevantTags: ["html", "head", "body"],
      invisibleOutput: true,
      challenge: {
        id: "m5-skeleton",
        instruction: "Write the full page skeleton, starting correctly: `<!DOCTYPE html>`, then `html`, with an empty `head` inside it, then a `body` — with the word `Content` inside the `body`",
        relevantTags: ["html", "head", "body"],
        invisibleOutput: true,
        check: (v) => {
          const n = v.toLowerCase().trim();
          if (!n) return "Type something";
          const hasDoctype = /^\s*<!DOCTYPE\s+html>/i.test(v);
          const hasHtml = /<html>[\s\S]*<\/html>/i.test(v);
          const hasHead = /<head>\s*<\/head>/i.test(v);
          const hasBody = /<body>[\s\S]*content[\s\S]*<\/body>/i.test(v);
          if (hasDoctype && hasHtml && hasHead && hasBody) return "pass";
          if (!hasDoctype) return "Start with the doctype declaration: <!DOCTYPE html>";
          if (!hasHtml) return "Wrap everything in `html`";
          if (!hasHead) return "Add an empty `head` tag";
          if (!hasBody) return "Add a `body` tag containing the word Content";
          return "Check all four pieces are nested correctly inside html";
        },
        hint: "<!DOCTYPE html>\n<html>\n  <head></head>\n  <body>Content</body>\n</html>",
        progressChecks: [
          /^\s*<!DOCTYPE\s+html>/i,
          /<html>[\s\S]*<\/html>/i,
          /<head>\s*<\/head>/i,
          /<body>[\s\S]*content[\s\S]*<\/body>/i,
        ],
      },
    },
    {
      id: "header-footer",
      heading: "Header and Footer — The Top and Bottom",
      body: "Inside `body`, you can organize content into meaningful sections instead of just a flat pile of tags. `header` marks the top of a page, or the top of a section — usually a title, logo, or introductory content. `footer` marks the bottom — usually fine print, contact info, or closing content. Both are what's called semantic tags, meaning the tag name itself describes the role of the content inside it, not just how it looks. Before semantic tags existed, everyone used a generic `div` for everything, and neither browsers nor screen readers could tell a `header` from a `footer` from just... anything. Is `header` always at the very top of the whole page? Usually, but it can also mark the top of a smaller section within the page — we'll see that with `section` next. Will you always need both? Not always, but for a real distress signal with a title and a closing note, both fit perfectly.",
      zanComment: "header and footer. Named after where they go. HTML keeps doing this — naming things exactly what they are — and I keep being surprised by it, and at this point that says more about me than about HTML.",
      anatomy: [
        { text: "<header>", color: "#00f5c4", highlight: "#00f5c4", label: "<header>", explain: "Marks the top of the page or a section." },
        { text: "<h1>DISTRESS SIGNAL</h1>", color: "#c8f0ff", highlight: "#39ff14", label: "content", explain: "The title lives inside the header." },
        { text: "</header>", color: "#00f5c4", highlight: "#00f5c4", label: "</header>", explain: "Closes the header section." },
      ],
      relevantTags: ["header", "footer", "h1", "p"],
      challenge: {
        id: "m5-header-footer",
        instruction: "Write a `header` containing an `h1` that says `DISTRESS SIGNAL` — then a `footer` containing a `p` that says `Transmitted from unknown coordinates.`",
        relevantTags: ["header", "footer", "h1", "p"],
        check: (v) => {
          const n = v.toLowerCase().trim();
          if (!n) return "Type something";
          const hasHeader = /<header>[\s\S]*<h1>[\s\S]*distress signal[\s\S]*<\/h1>[\s\S]*<\/header>/i.test(v);
          const hasFooter = /<footer>[\s\S]*<p>[\s\S]*transmitted from unknown coordinates\.[\s\S]*<\/p>[\s\S]*<\/footer>/i.test(v);
          if (hasHeader && hasFooter) return "pass";
          if (!hasHeader) return "Add the header with an h1 inside it saying DISTRESS SIGNAL";
          if (!hasFooter) return "Add the footer with a p inside it saying the coordinates line";
          return "Check both sections and their contents match exactly";
        },
        hint: "<header>\n  <h1>DISTRESS SIGNAL</h1>\n</header>\n<footer>\n  <p>Transmitted from unknown coordinates.</p>\n</footer>",
      },
      drills: [
        { instruction: "Write a header with any h1 title of your choice", check: (v) => /<header>[\s\S]*<h1>[^<]{2,}<\/h1>[\s\S]*<\/header>/i.test(v), answer: "<header>\n  <h1>Ship Status</h1>\n</header>" },
        { instruction: "Write a footer with a p containing any short closing note", check: (v) => /<footer>[\s\S]*<p>[^<]{3,}<\/p>[\s\S]*<\/footer>/i.test(v), answer: "<footer>\n  <p>End of transmission.</p>\n</footer>" },
      ],
    },
    {
      id: "main-section",
      heading: "Main and Section — The Important Middle",
      body: "`main` marks the single most important content on the page — the actual point of the whole document. There should only be one `main` per page, similar to the one-`h1` rule you already learned. Inside `main`, you can break content into `section` tags — each `section` groups together content about one topic or theme. Think of `main` as the whole body of a letter, and `section` as each individual paragraph topic within it. Is `section` just a `div` with a different name? Not quite — `section` specifically implies the content inside it is thematically grouped and usually has its own heading. If content doesn't have a clear theme or heading, `div` is actually the more correct choice — we'll cover `div` separately since it has its own specific use. Will every page need multiple sections? No — a simple page might have just one, or none at all if main only contains a single paragraph. But for anything with distinct topics, `section` keeps things organized both visually and structurally.",
      zanComment: "One main per page. Multiple sections allowed. I have started applying this logic to my own life and determined I currently have several sections and no clear main. I am choosing not to explore that further right now.",
      anatomy: [
        { text: "<main>", color: "#00f5c4", highlight: "#00f5c4", label: "<main>", explain: "The single most important content block. One per page." },
        { text: "<section>", color: "#ffe94d", highlight: "#ffe94d", label: "<section>", explain: "Groups content around one theme, usually with its own heading." },
        { text: "<h2>Crash Report</h2>", color: "#c8f0ff", highlight: "#39ff14", label: "content", explain: "This section's own heading." },
        { text: "</section>", color: "#ffe94d", highlight: "#ffe94d", label: "</section>", explain: "Closes this section." },
        { text: "</main>", color: "#00f5c4", highlight: "#00f5c4", label: "</main>", explain: "Closes main." },
      ],
      relevantTags: ["main", "section", "h2", "p"],
      challenge: {
        id: "m5-main-section",
        instruction: "Write a `main` containing one `section` — the section should have an `h2` that says `Crash Report` and a `p` that says `Full transmission log attached below.`",
        relevantTags: ["main", "section", "h2", "p"],
        check: (v) => {
          const n = v.toLowerCase().trim();
          if (!n) return "Type something";
          const hasMain = /<main>[\s\S]*<\/main>/i.test(v);
          const hasSection = /<section>[\s\S]*<h2>[\s\S]*crash report[\s\S]*<\/h2>[\s\S]*<p>[\s\S]*full transmission log attached below\.[\s\S]*<\/p>[\s\S]*<\/section>/i.test(v);
          if (hasMain && hasSection) return "pass";
          if (!hasMain) return "Wrap everything in a main tag";
          if (!hasSection) return "Add a section inside main with the h2 and p, matching the exact text";
          return "Check main wraps section correctly and the content matches";
        },
        hint: "<main>\n  <section>\n    <h2>Crash Report</h2>\n    <p>Full transmission log attached below.</p>\n  </section>\n</main>",
      },
      drills: [
        { instruction: "Write a main with one section inside it — a heading tag like h1–h6 (not head) and a p of your choice", check: (v) => /<main>[\s\S]*<section>[\s\S]*<h[1-6]>[^<]+<\/h[1-6]>[\s\S]*<p>[^<]+<\/p>[\s\S]*<\/section>[\s\S]*<\/main>/i.test(v), answer: "<main>\n  <section>\n    <h2>Fuel Reserves</h2>\n    <p>Stable for now.</p>\n  </section>\n</main>" },
      ],
    },
  ],

  bossChallenge: {
    id: "m5-boss",
    zanComment: "Wooch wants to see the whole hull sealed at once — header, main with a section inside it, and footer, all in the correct order. Wooch has strong opinions about correct order. I did not know this about Wooch until today.",
    instruction: "Build the full structured page. Write: a `header` with an `h1` that says `DISTRESS SIGNAL`. Then a `main` containing a `section` with an `h2` that says `Crash Report` and a `p` that says `Full transmission log attached below.` Then a `footer` with a `p` that says `Transmitted from unknown coordinates.`",
    relevantTags: ["header", "main", "section", "footer", "h1", "h2", "p"],
    check: (v) => {
      if (!v.trim()) return "Type something";
      const hasHeader = /<header>[\s\S]*<h1>[\s\S]*distress signal[\s\S]*<\/h1>[\s\S]*<\/header>/i.test(v);
      const hasMainSection = /<main>[\s\S]*<section>[\s\S]*<h2>[\s\S]*crash report[\s\S]*<\/h2>[\s\S]*<p>[\s\S]*full transmission log attached below\.[\s\S]*<\/p>[\s\S]*<\/section>[\s\S]*<\/main>/i.test(v);
      const hasFooter = /<footer>[\s\S]*<p>[\s\S]*transmitted from unknown coordinates\.[\s\S]*<\/p>[\s\S]*<\/footer>/i.test(v);
      if (hasHeader && hasMainSection && hasFooter) return "pass";
      if (!hasHeader) return "Start with the header and h1";
      if (!hasMainSection) return "Add the main with the section, h2, and p inside it";
      if (!hasFooter) return "Add the footer at the end";
      return "Almost — check all three pieces are there in the right order";
    },
    hint: "<header>\n  <h1>DISTRESS SIGNAL</h1>\n</header>\n<main>\n  <section>\n    <h2>Crash Report</h2>\n    <p>Full transmission log attached below.</p>\n  </section>\n</main>\n<footer>\n  <p>Transmitted from unknown coordinates.</p>\n</footer>",
  },

  completionMessage: "Hull sealed. The page finally has a real skeleton. Wooch looked at it for a long time and said nothing, which from Wooch is basically a compliment.",
};