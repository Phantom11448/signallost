export const mission1 = {
  id: 1,
  title: "Boot the Terminal",
  subtitle: "Tags & Headings",
  badge: "📡",
  storyTag: "ANTENNA MODULE",
  atmosphere: "72 hours remaining",

  // What this mission adds to the distress signal page
  signalContribution: `<h1>DISTRESS SIGNAL — StarBurner</h1>\n<p>Crash landed in an unknown region. Large white star on local flag. Hull breach on port side. Atmosphere at critical levels.</p>`,
  bugExcerpt: `<h1>DISTRESS SIGNAL — StarBurner</h1>\n<p>Crash landed in an unknown region. Large white star on local flag.</p>`,

  storyIntro: [
    "Okay. The StarBurner is down. Wooch and Luvek are alive. Zandek and Toch didn't make it.",
    "Zorbin is missing. I have marked him as 'unavailable' in the crew manifest for now. We will update this field later.",
    "The atmosphere generator is failing. I have maybe 72 hours of breathable air left. The air outside is toxic to Phantarians. I cannot open the hatch. There is a large four-legged creature looking at me through the window. It has not moved in three hours. I am not going to think about it.",
    "I've been scanning every communication system on this ship. Everything is destroyed. Everything except one ancient protocol that somehow survived the crash.",
    "HTML.",
    "My grandfather used to build websites with this. I laughed at him. I called it primitive. I called it embarrassing. He tried to teach me once and I told him I had more important things to do. I did not. As it turns out.",
    "Phantar's validator will only accept a properly built HTML page as a distress signal. Every tag has to be correct. One mistake and the transmission gets rejected.",
    "No pressure. Let's start.",
  ],

  slides: [
    {
      id: "what-is-html",
      relevantTags: [],
      heading: "What Even Is HTML?",
      body: "`HTML` stands for `HyperText Markup Language`. Let's break that down because it actually means something. `HyperText` means text that links to other text — that's what makes the web a web instead of just a bunch of separate documents. `Markup` means you're adding labels to your content to describe what it is. `Language` means it has rules and syntax you have to follow. So `HTML` is literally: a set of rules for labeling your content so browsers know what to display and how. Every single webpage you have ever visited — every news article, every social media post, every online store — is built on `HTML`. It is the foundation of everything on the internet. Is `HTML` a programming language? Technically no — and this matters. `HTML` describes content, it does not perform logic. You cannot do math in `HTML` or make decisions. That comes later when you learn JavaScript. `HTML` just says: this is a heading, this is a paragraph, this is an image. The browser does the rest.",
      dialogueExchange: [
        { speaker: "wooch", name: "WOOCH", text: "What is that big moo-sounding animal..." },
        { speaker: "zhan", name: "ZHAN", text: "Idk it hasn't moved for four hours now." },
        { speaker: "wooch", name: "WOOCH", text: "Neither have you." },
      ],
      challenge: {
        id: "m1-what-is-html",
        relevantTags: [],
        instruction: "HTML stands for three words. Type them out — just to confirm you read that.",
        check: (v) => {
          const n = v.toLowerCase();
          if (n.includes("hypertext") && n.includes("markup") && n.includes("language")) return "pass";
          return "Type the three words HTML stands for — they're in the text above";
        },
        hint: "HyperText Markup Language",
      },
    },
    {
      id: "tags",
      heading: "Tags — The Label Gun of the Web",
      body: "Think of `HTML tags` like a label gun at a warehouse. You wrap a label around something so everyone knows what it is. Every `tag` has two parts — an `opening tag(<)` that says where it starts, and a `closing tag(>)` that says where it ends. The `closing tag` is identical to the opening tag but with a `forward slash before the name(</..>)`. Everything between the opening and closing tag is the `content`. The tag name tells the browser what kind of content this is. `<h1>` means Heading Level 1. `<p>` means paragraph. `<button>` means a clickable button. They all follow the exact same pattern: open it, put your content in, close it. Is this the only pattern? Almost — you will learn later that some `tags` are self-closing and do not need a `closing tag` at all. We will cover those when we get to images in Mission 2.",
      zanComment: "Open tag. Content. Close tag. That's it?",
      anatomy: [
        { text: "<h1>", color: "#ffe94d", highlight: "#ffe94d", label: "<h1> opening tag", explain: "Opens the tag. h1 = Heading Level 1. The most important heading on the page." },
        { text: "DISTRESS SIGNAL", color: "#c8f0ff", highlight: "#39ff14", label: "content", explain: "Whatever you want to display. This is what users actually see on the page." },
        { text: "</h1>", color: "#ffe94d", highlight: "#ffe94d", label: "</h1> closing tag", explain: "Closes the tag. The / means this tag ends here. Must match the opening tag." },
      ],
      challenge: {
        id: "m1-tags",
        instruction: "Write any HTML tag wrapping any word. `<h1>`, `<p>`, `<h2>` — anything. Just show me you understand the open-content-close pattern.",
        check: (v) => {
          const n = v.toLowerCase().trim();
          if (!n) return "Type something — any tag wrapping any word";
          if (/<([a-z][a-z0-9]*)>[^<]+<\/\1>/.test(n)) return "pass";
          if (/<[a-z]+>/.test(n) && !/<\/[a-z]+>/.test(n)) return "You opened a tag but forgot to close it — add </ and the tag name and >";
          return "Try wrapping a word in a tag — like <h1>Hello</h1>";
        },
        hint: "<h1>Hello</h1> or <p>anything you want</p>",
      },
    },
    {
      id: "h1",
      relevantTags: ["h1"],
      heading: "Headings — h1 Through h6",
      body: "There are six `heading tags` in HTML — `h1, h2, h3, h4, h5, and h6`. `h1` is the biggest and most important. `h6` is the smallest. Think of it like a newspaper — the giant headline at the top is `h1`, the section titles are `h2`, the article subheadings are `h3`, and so on. The browser automatically sizes them — `h1` is huge, `h6` is barely bigger than regular text. You control exactly how they look later with CSS. One important rule: use only ONE `h1` per page. That is your main title — the most important thing on the page. Search engines like Google read your `h1` to understand what your page is about. Multiple `h1` tags confuse both Google and screen readers. Will you use all six? Probably not often. `h1`, `h2`, and `h3` cover 90% of real projects. But they all exist and they all work the same way.",
      zanComment: "Six heading sizes. The browser makes them different sizes automatically.",
      anatomy: [
        { text: "<h1>", color: "#ffe94d", highlight: "#ffe94d", label: "<h1>", explain: "Heading Level 1 — biggest, most important. One per page only." },
        { text: "Main Title", color: "#c8f0ff", highlight: "#39ff14", label: "content", explain: "Your page's main title. Google reads this to understand your page." },
        { text: "</h1>", color: "#ffe94d", highlight: "#ffe94d", label: "</h1>", explain: "Closes the h1. Always close what you open." },
      ],
      challenge: {
        id: "m1-h1",
        relevantTags: ["h1"],
        instruction: "Write the main heading for Zhan's distress signal. Write an h1 that says: DISTRESS SIGNAL — StarBurner",
        check: (v) => {
          if (!v.trim()) return "Type something";
          if (/<h1>\s*distress signal\s*[—-]\s*starburner\s*<\/h1>/i.test(v)) return "pass";
          if (!/<h1/.test(v.toLowerCase())) return "Use the h1 tag — that's the main heading tag";
          if (/<h1/.test(v.toLowerCase()) && !/<\/h1>/.test(v.toLowerCase())) return "You opened h1 but didn't close it — add </h1> at the end";
          if (/<h1>[^<]*<\/h1>/.test(v.toLowerCase())) return "The tag is right but check the text — it needs to say: DISTRESS SIGNAL — StarBurner";
          return "Almost — check your spelling and make sure the text matches exactly";
        },
        hint: "<h1>DISTRESS SIGNAL — StarBurner</h1>",
      },
      drills: [
        { relevantTags: ["h1"], instruction: "Write an h4 for a rescue mission called: Operation Bring Zhan Home", check: (v) => /<h4>\s*operation bring zhan home\s*<\/h4>/i.test(v), answer: "<h4>Operation Bring Zhan Home</h4>" },
        { relevantTags: ["h1"], instruction: "Write an h2 subheading that says: Crew Status Report", check: (v) => /<h2>\s*crew status report\s*<\/h2>/i.test(v), answer: "<h2>Crew Status Report</h2>" },
        { relevantTags: ["h1"], instruction: "Write an h3 for a section called: Last Known Coordinates", check: (v) => /<h3>\s*last known coordinates\s*<\/h3>/i.test(v), answer: "<h3>Last Known Coordinates</h3>" },
        { relevantTags: ["h1"], instruction: "Write an h1 that says: SOS — Phantar Vessel Down", check: (v) => /<h1>\s*sos\s*[—-]\s*phantar vessel down\s*<\/h1>/i.test(v), answer: "<h1>SOS — Phantar Vessel Down</h1>" },
      ],
    },
    {
      id: "p",
      relevantTags: ["p"],
      heading: "Paragraphs — Regular Readable Text",
      body: "The `<p>` tag is for paragraphs — blocks of regular readable text. `<p>` stands for `<p>`aragraph, which is about as straightforward as HTML gets. Every time you start a new topic or new block of sentences wrap it in its own `<p>` tag. The browser automatically adds a little space between `<p>`aragraphs so they do not run together. When do you use `<p>` vs a heading? Simple rule: if it is a title or label use a heading. If it is a sentence someone would read use a `<p>`aragraph. Most of the text on any webpage — the articles, the descriptions, the captions — is in `<p>` tags. Is `<p>` the only way to display text? No — you will learn about `<span>` later which handles inline text and there are other text elements like `<blockquote>` for quotes. But `<p>` is the workhorse. You will use it constantly.",
      zanComment: "p stands for paragraph. They named it after what it does. I respect that. Everything else about this situation I do not respect but I respect that.",
      anatomy: [
        { text: "<p>", color: "#00f5c4", highlight: "#00f5c4", label: "<p>", explain: "Opens a paragraph. p = paragraph — a block of readable text." },
        { text: "Crash landed near Magnolia Texas. Hull breach on port side.", color: "#c8f0ff", highlight: "#39ff14", label: "content", explain: "Regular readable text. This is what users read on the page." },
        { text: "</p>", color: "#00f5c4", highlight: "#00f5c4", label: "</p>", explain: "Closes the paragraph. The browser adds spacing between paragraphs automatically." },
      ],
      challenge: {
        id: "m1-p",
        relevantTags: ["p"],
        instruction: "Add Zhan's crash report. Write a paragraph that says: Crash landed in an unknown region. Large white star on local flag. Hull breach on port side. Atmosphere at critical levels.",
        check: (v) => {
          const n = v.toLowerCase().trim();
          if (!n) return "Type something";
          if (!/<p/.test(n)) return "Use the p tag — that's for paragraphs of text";
          if (/<p/.test(n) && !/<\/p>/.test(n)) return "You opened p but didn't close it — add </p> at the end";
          if (/crash landed/.test(n) && /atmosphere/.test(n) && /<p>[\s\S]*<\/p>/.test(n)) return "pass";
          if (/<p>[^<]*<\/p>/.test(n)) return "The tag is right but check the text — needs to mention: Crash landed, unknown region, and Atmosphere";
          return "Wrap your text in a p tag";
        },
        hint: "<p>Crash landed in an unknown region. Large white star on local flag. Hull breach on port side. Atmosphere at critical levels.</p>",
      },
      drills: [
        { relevantTags: ["p"], instruction: "Write a paragraph that says: Three crew members survived the crash. Two did not. One is somewhere in this strange place with the big white star flag.", check: (v) => /<p>[\s\S]*three crew[\s\S]*<\/p>/i.test(v), answer: "<p>Three crew members survived the crash. Two did not.</p>" },
        { relevantTags: ["p"], instruction: "Write a paragraph that says: Luvek has decided to name this moo animal Gerald.", check: (v) => /<p>\s*luvek has decided to name this moo animal gerald\.\s*<\/p>/i.test(v), answer: "<p>Luvek has decided to name this moo animal Gerald.</p>" },
      ],
    },
  ],

  bossChallenge: {
    id: "m1-boss",
    relevantTags: ["h1", "p"],
    zanComment: "Phantar's validator requires a complete transmission header before it will process any rescue request. I need both my heading AND my crash report in the same block. This is apparently non-negotiable.",
    instruction: "Write both: an `<h1>` that says DISTRESS SIGNAL — StarBurner AND a `<p>` below it that says: Pilot Zhan transmitting from unknown region. Large white star on local flag. Atmosphere critical. Send rescue immediately.",
    check: (v) => {
      if (!v.trim()) return "Type something";
      const hasH1 = /<h1>\s*distress signal\s*[—-]\s*starburner\s*<\/h1>/i.test(v);
      const hasP = /<p>[\s\S]*rescue[\s\S]*<\/p>/i.test(v.toLowerCase());
      if (hasH1 && hasP) return "pass";
      if (!hasH1 && !hasP) return "You need both an h1 heading AND a p paragraph";
      if (!hasH1) return "The paragraph looks good — now add the h1 heading above it";
      if (!hasP) return "The heading looks good — now add the paragraph below it";
      return "Almost — check both elements are there and the text matches";
    },
    hint: "<h1>DISTRESS SIGNAL — StarBurner</h1>\n<p>Pilot Zhan transmitting from unknown region. Large white star on local flag. Atmosphere critical. Send rescue immediately.</p>",
  },

  completionMessage: "Antenna module restored. Phantar can see you exist. That's a start. The large judgmental creature is still outside.",
};