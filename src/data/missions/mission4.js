export const mission4 = {
  id: 4,
  title: "Restore the Ship Log",
  subtitle: "Text Formatting",
  badge: "📟",
  storyTag: "LOG MODULE",
  atmosphere: "60 hours remaining",

  signalContribution: `<h2>Captain's Log — Final Entries</h2>\n<p>Recovered from the ship's black box. <strong>Priority transmission.</strong></p>\n<blockquote>If you are receiving this, the StarBurner did not complete its eviction of the man trespassing on our moon. — Zandek, Systems Officer</blockquote>\n<p><em>Entry corrupted beyond this point.</em></p>\n<p>Crew status verified by Pilot Zhan.<br>Two confirmed deceased. One unaccounted for.</p>\n<p><small>Transmitted under Phantar Emergency Protocol 9. Log integrity not guaranteed.</small></p>`,
  bugExcerpt: `<blockquote>If you are receiving this, the StarBurner did not complete its eviction of the man trespassing on our moon.</blockquote>\n<p>Two confirmed deceased.<br>One unaccounted for.</p>`,

  storyIntro: [
    "The bug in the system set us back. Nothing should've taken this long. Can't think about that now.",
    "New requirement from Phantar: the ship's log. The actual black box recording. They want it formatted properly before they'll authorize a rescue vessel launch.",
    "I found the recovered log fragments. Some of it is Zandek's voice, transcribed. Some of it is corrupted. I have to present all of it clearly — what's important, what's uncertain, what's just... noise.",
    "Apparently plain text isn't good enough anymore. Phantar wants to know what matters and what doesn't just by looking at the page. Fine. Let's format a log.",
  ],

  slides: [
    {
      id: "strong-em",
      heading: "Strong and Em — Meaning, Not Just Looks",
      body: "Two tags let you emphasize text: `strong` and `em`. `strong` makes text bold and tells the browser this content is important — critical, urgent, something a reader shouldn't skim past. `em` makes text italic and tells the browser this content has stress or emphasis — like how your voice changes when you actually mean a word. Here's the important part: these tags are not just about how the text looks, they're about what the text means. You could make text bold with CSS instead, and we'll learn that later, but `strong` and `em` carry meaning that screen readers actually announce differently — a screen reader might change its tone or emphasis when it hits an `em` tag. This is different from just wanting something to look bold. If you want bold or italic purely for decoration with no real importance behind it, that's a CSS job, not an HTML job. But when something is genuinely important or genuinely emphasized, `strong` and `em` are the correct tags. Is there a difference between `strong` and `b`, or `em` and `i`? There are older tags called `b` and `i` that just mean bold and italic with no meaning attached — they still work, but `strong` and `em` are almost always the better choice because they carry actual significance.",
      dialogueExchange: [
        { speaker: "wooch", name: "WOOCH", text: "Don't forget the period again." },
        { speaker: "zhan", name: "ZHAN", text: "GOT IT." },
      ],
      anatomy: [
        { text: "<strong>", color: "#00f5c4", highlight: "#00f5c4", label: "<strong>", explain: "Marks text as important. Renders bold. Screen readers may emphasize it." },
        { text: "Priority transmission.", color: "#c8f0ff", highlight: "#39ff14", label: "content", explain: "The important text itself." },
        { text: "</strong>", color: "#00f5c4", highlight: "#00f5c4", label: "</strong>", explain: "Closes the tag." },
      ],
      challenge: {
        id: "m4-strong",
        instruction: "Write a paragraph that says: `Priority transmission.` — but wrap the whole thing in `strong` so Phantar knows it's important",
        relevantTags: ["p", "strong"],
        check: (v) => {
          const n = v.toLowerCase().trim();
          if (!n) return "Type something";
          if (!/<p/.test(n)) return "Wrap it in a `p` tag first";
          if (!/<strong/.test(n)) return "Use `strong` to mark it as important";
          if (/<p>\s*<strong>\s*priority transmission\.\s*<\/strong>\s*<\/p>/i.test(v)) return "pass";
          return "Check the text matches exactly and strong is inside the p tag";
        },
        hint: "<p><strong>Priority transmission.</strong></p>",
      },
      drills: [
        { instruction: "Write a paragraph with `em` around the phrase: `Entry corrupted beyond this point.`", check: (v) => /<p>[\s\S]*<em>[\s\S]*entry corrupted beyond this point\.[\s\S]*<\/em>[\s\S]*<\/p>/i.test(v), answer: "<p><em>Entry corrupted beyond this point.</em></p>" },
        { instruction: "Write a paragraph with `strong` around the phrase: `Two confirmed deceased.`", check: (v) => /<p>[\s\S]*<strong>[\s\S]*two confirmed deceased\.[\s\S]*<\/strong>[\s\S]*<\/p>/i.test(v), answer: "<p><strong>Two confirmed deceased.</strong></p>" },
        { instruction: "Write any sentence with `em` around one part of it — your choice", check: (v) => /<em>[^<]{3,}<\/em>/i.test(v), answer: "<p>The signal is <em>barely</em> holding.</p>" },
      ],
    },
    {
      id: "br",
      heading: "Line Breaks — br",
      body: "Sometimes you need a line break inside a block of text without starting a whole new paragraph — like an address, a poem, or in this case, separate short facts that belong together but should visually sit on their own lines. That's what `br` is for: it stands for break, and it forces a line break right where you place it. `br` is a void element, just like `img` — it has no content and no closing tag, it just does its job and that's it. Is `br` the only way to create space between lines? No, and it's actually not the best way most of the time. If you're separating two distinct paragraphs of text, you should use two separate `p` tags instead — the browser adds proper spacing automatically, and it's more meaningful structurally. `br` is really only appropriate when the line break is part of the actual content itself, not just a stylistic choice. Overusing `br` to create paragraph spacing is considered bad practice — you'll learn the correct way to control real spacing with CSS in a later course.",
      dialogueExchange: [
        { speaker: "zhan", name: "ZHAN", text: "4 buttons. Why not just press Enter..." },
        { speaker: "luvek", name: "LUVEK", text: "Cuz Enter enters stuff." },
      ],
      anatomy: [
        { text: "Two confirmed deceased.", color: "#c8f0ff", highlight: "#39ff14", label: "content", explain: "First line of text." },
        { text: "<br>", color: "#00f5c4", highlight: "#00f5c4", label: "<br>", explain: "Void element — no closing tag. Forces a line break right here." },
        { text: "One unaccounted for.", color: "#c8f0ff", highlight: "#39ff14", label: "content", explain: "Second line of text, now on its own line." },
      ],
      challenge: {
        id: "m4-br",
        instruction: "Write a paragraph with `Two confirmed deceased.` then a `br` then `One unaccounted for.` on the next line",
        relevantTags: ["p", "br"],
        check: (v) => {
          const n = v.toLowerCase().trim();
          if (!n) return "Type something";
          if (!/<p/.test(n)) return "Wrap it all in a `p` tag";
          if (!/<br/.test(n)) return "Add a `br` between the two lines";
          if (/<p>[\s\S]*two confirmed deceased\.[\s\S]*<br[\s\S]*one unaccounted for\.[\s\S]*<\/p>/i.test(v)) return "pass";
          return "Check both lines and the br are in the right order";
        },
        hint: "<p>Two confirmed deceased.<br>One unaccounted for.</p>",
      },
      drills: [
        { instruction: "Write a paragraph with two short lines of your choice separated by `br`", check: (v) => /<p>[^<]{2,}<br\s*\/?>[^<]{2,}<\/p>/i.test(v), answer: "<p>Hull breach confirmed.<br>Atmosphere stable.</p>" },
      ],
    },
    {
      id: "small-blockquote",
      heading: "Small Text and Blockquotes",
      body: "Two more formatting tags with very specific jobs. `small` is for fine print — legal disclaimers, footnotes, side notes, terms and conditions, anything less important than the surrounding text. It renders in a smaller font size and signals to both readers and screen readers that this content is secondary. `blockquote` is for quoting someone or something directly — a person's exact words, a passage from another document. Browsers usually indent `blockquote` content to visually set it apart from the surrounding text. Unlike `strong` and `em`, which change meaning within a sentence, `blockquote` marks off an entire block of quoted content on its own. Is `small` just for making text look smaller? No — like `strong` and `em`, it carries meaning. If you just want smaller text for a design reason with no semantic importance, that's a CSS decision, not this tag. Will you use `blockquote` often? Less often than paragraphs, but it matters a lot when you do — quoting a source correctly is both good practice and, in some fields, a legal requirement.",
      zanComment: "blockquote is for someone else's exact words. small is for the fine print no one reads. My people communicate legal documents through direct neural transfer.",
      anatomy: [
        { text: "<blockquote>", color: "#00f5c4", highlight: "#00f5c4", label: "<blockquote>", explain: "Opens a quoted block. Browser typically indents it." },
        { text: "If you are receiving this...", color: "#c8f0ff", highlight: "#39ff14", label: "content", explain: "The exact quoted words." },
        { text: "</blockquote>", color: "#00f5c4", highlight: "#00f5c4", label: "</blockquote>", explain: "Closes the quote block." },
      ],
      challenge: {
        id: "m4-small-blockquote",
        instruction: "Write a `blockquote` that says: `If you are receiving this, the StarBurner did not complete its eviction of the man trespassing on our moon.` — then below it, a `p` with `small` inside it that says: `Transmitted under Phantar Emergency Protocol 9.`",
        relevantTags: ["blockquote", "p", "small"],
        check: (v) => {
          const n = v.toLowerCase().trim();
          if (!n) return "Type something";
          const hasQuote = /<blockquote>[\s\S]*if you are receiving this[\s\S]*starburner[\s\S]*eviction[\s\S]*moon[\s\S]*<\/blockquote>/i.test(v);
          const hasSmall = /<p>\s*<small>[\s\S]*transmitted under phantar emergency protocol 9\.[\s\S]*<\/small>\s*<\/p>/i.test(v);
          if (hasQuote && hasSmall) return "pass";
          if (!hasQuote) return "Add the blockquote with the exact quoted text";
          if (!hasSmall) return "Add the p with small inside it for the fine print";
          return "Almost — check both pieces match exactly";
        },
        hint: "<blockquote>If you are receiving this, the StarBurner did not complete its eviction of the man trespassing on our moon.</blockquote>\n<p><small>Transmitted under Phantar Emergency Protocol 9.</small></p>",
      },
      drills: [
        { instruction: "Write a blockquote with any short quote of your choice", check: (v) => /<blockquote>[^<]{5,}<\/blockquote>/i.test(v), answer: "<blockquote>Hull integrity failing. Brace for impact.</blockquote>" },
        { instruction: "Write a p with small inside it that says: `Log integrity not guaranteed.`", check: (v) => /<p>\s*<small>[\s\S]*log integrity not guaranteed\.[\s\S]*<\/small>\s*<\/p>/i.test(v), answer: "<p><small>Log integrity not guaranteed.</small></p>" },
      ],
    },
  ],

  bossChallenge: {
    id: "m4-boss",
    zanComment: "Phantar wants the complete log entry — quote, emphasis, line break, and fine print, all in the correct order, all in one transmission. I am told this is standard formatting.",
    instruction: "Build the complete log entry. Write: a `blockquote` that says `If you are receiving this, the StarBurner did not complete its eviction of the man trespassing on our moon.` Then a `p` with `em` around `Entry corrupted beyond this point.` Then a `p` with `Two confirmed deceased.` then `br` then `One unaccounted for.` Then a `p` with `small` around `Transmitted under Phantar Emergency Protocol 9.`",
    relevantTags: ["blockquote", "p", "em", "br", "small"],
    check: (v) => {
      if (!v.trim()) return "Type something";
      const hasQuote = /<blockquote>[\s\S]*if you are receiving this[\s\S]*starburner[\s\S]*eviction[\s\S]*moon[\s\S]*<\/blockquote>/i.test(v);
      const hasEm = /<p>\s*<em>[\s\S]*entry corrupted beyond this point\.[\s\S]*<\/em>\s*<\/p>/i.test(v);
      const hasBr = /<p>[\s\S]*two confirmed deceased\.[\s\S]*<br[\s\S]*one unaccounted for\.[\s\S]*<\/p>/i.test(v);
      const hasSmall = /<p>\s*<small>[\s\S]*transmitted under phantar emergency protocol 9\.[\s\S]*<\/small>\s*<\/p>/i.test(v);
      if (hasQuote && hasEm && hasBr && hasSmall) return "pass";
      if (!hasQuote) return "Start with the blockquote — check the exact quoted text";
      if (!hasEm) return "Add the p with em around the corrupted entry line";
      if (!hasBr) return "Add the p with br separating the two crew status lines";
      if (!hasSmall) return "Add the p with small around the protocol line";
      return "Almost — check all four pieces are there and match exactly";
    },
    hint: "<blockquote>If you are receiving this, the StarBurner did not complete its eviction of the man trespassing on our moon.</blockquote>\n<p><em>Entry corrupted beyond this point.</em></p>\n<p>Two confirmed deceased.<br>One unaccounted for.</p>\n<p><small>Transmitted under Phantar Emergency Protocol 9.</small></p>",
  },

  completionMessage: "Log module restored. Zandek's last words are on record. Phantar has confirmed receipt. I did not expect that part to feel the way it felt. Moving on.",
};