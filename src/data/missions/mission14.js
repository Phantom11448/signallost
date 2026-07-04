export const mission14 = {
  id: 14,
  title: "Patch the Visual Interface",
  subtitle: "HTML & CSS Intro",
  badge: "🎨",
  storyTag: "VISUAL MODULE",
  atmosphere: "8 hours remaining",

  signalContribution: `<style>\n  p { background-color: #020b18; color: #c8f0ff; }\n</style>\n<h1 style="color: #ffe94d;">TRANSMISSION COMPLETE</h1>\n<p>Signal strengthening.</p>`,

  storyIntro: [
    "Zorbin decoded, safe, presumably still eating whatever a Whataburger is. Signal strengthening. Every module on this ship restored, one HTML tag at a time.",
    "One last request from Phantar, and it's a strange one. Not structure. Not content. Something called styling — how the page actually looks, not just what it says.",
    "Wooch explained it like this: everything I've built so far is the skeleton and the organs. This is the skin. Wooch has been building metaphors this entire ordeal and I have decided, at this point, to simply accept them.",
    "There's a whole separate language for this. HTML says what something is. This new thing says what it looks like. I am told I will learn that language properly, later, in full. For now, I get a taste of it.",
  ],

  slides: [
    {
      id: "style-attribute",
      heading: "The Style Attribute — Styling One Element at a Time",
      body: "Every HTML element can accept a `style` attribute, which lets you apply visual formatting directly to that one element. Inside the `quotes`, you write one or more `declarations`, each following the pattern `property: value;`, with a `semicolon` separating each one if there's more than one. `color` changes text color. `background-color` changes the background behind the element. These are your first two `CSS` properties — `CSS` stands for `Cascading Style Sheets`, and it's the entire language dedicated to how things look, separate from HTML, which only handles what things are. Is style the normal way to write CSS? Not really — it works, and it's the fastest way to see CSS in action, but professional CSS almost always lives somewhere else, either in a `style tag` or a completely separate file, which keeps your content and your styling cleanly separated. We'll cover in a later course. For now, `style` is the quickest way to prove that `CSS` actually works, one element at a time.",
      dialogueExchange: [
        { speaker: "zhan", name: "ZHAN", text: "color and background-color. Two properties, one semicolon between them if I use both. I have officially written CSS like the ancient warriors of my ancestors." },
        { speaker: "wooch", name: "WOOCH", text: "Just wait until you see what JavaScript can do." },
      ],
      relevantTags: [],
      anatomy: [
        { text: "<h1 ", color: "#00f5c4", highlight: "#00f5c4", label: "<h1", explain: "Any element can take a style attribute." },
        { text: 'style="', color: "#ffe94d", highlight: "#ffe94d", label: 'style="..."', explain: "Opens the style attribute." },
        { text: "color: #ffe94d;", color: "#a98dff", highlight: "#a98dff", label: "declaration", explain: "property: value; — this one sets text color." },
        { text: '">', color: "#ffe94d", highlight: "#ffe94d", label: "closes attribute", explain: "Closes the style attribute's quotes, then the tag." },
      ],
      challenge: {
        id: "m14-style-attribute",
        instruction: 'Write an `h1` that says `TRANSMISSION COMPLETE` with a `style` attribute setting `color: #ffe94d;`',
        relevantTags: ["h1"],
        check: (v) => {
          const n = v.toLowerCase().trim();
          if (!n) return "Type something";
          if (!/<h1/.test(n)) return "Use the `h1` tag";
          if (!/style\s*=/.test(n)) return "Add a `style` attribute";
          if (!/color\s*:\s*#ffe94d/.test(n)) return "Check the color value: #ffe94d";
          if (/<h1[^>]*style="[^"]*color:\s*#ffe94d[^"]*"[^>]*>\s*transmission complete\s*<\/h1>/i.test(v)) return "pass";
          return "Check the h1 text matches exactly: TRANSMISSION COMPLETE";
        },
        hint: '<h1 style="color: #ffe94d;">TRANSMISSION COMPLETE</h1>',
      },
      drills: [
        { instruction: 'Write a p with a style attribute setting background-color to one of these: #00f5c4, #39ff14, or #4da6ff', check: (v) => /<p[^>]*style="[^"]*background-color:\s*#(00f5c4|39ff14|4da6ff)[^"]*"[^>]*>/i.test(v), answer: '<p style="background-color: #00f5c4;">Status nominal.</p>' },
      ],
    },
    {
      id: "style-tag",
      heading: "The Style Tag — Styling Many Elements at Once",
      body: "Writing `style` on every single element gets repetitive fast, especially if you want every `h1` on a page to look the same. The `style` tag solves this. It lives inside `head`, and it holds CSS rules that apply across the whole page at once, without needing a `style` attribute on every individual element. Each rule follows this pattern: a `selector`, which says which elements to target — like `h1` to target every `h1` on the page — followed by curly braces containing one or more `property: value;` declarations, the exact same syntax you just learned. This is just the same CSS organized differently. The only difference is where it lives and how many elements it affects at once. One `style` attribute affects one element. One `rule inside a style tag` can affect every matching element on the `entire page`. Will you learn much more about this? This mission is genuinely just a preview — selectors, more properties, and real styling patterns are their own full subject, waiting for you next.",
      entityHighlight: true,
      zanComment: "property: value; — colon separates them, semicolon ends them. Forget the semicolon and the browser simply ignores what you wrote. No warning. No error. It just quietly pretends you said nothing.",
      relevantTags: [],
      anatomy: [
        { text: "<style>", color: "#00f5c4", highlight: "#00f5c4", label: "<style>", explain: "Lives in head. Holds CSS rules for the whole page." },
        { text: "h1 ", color: "#ffe94d", highlight: "#ffe94d", label: "selector", explain: "Targets every h1 on the page." },
        { text: "{ color: #39ff14; }", color: "#a98dff", highlight: "#a98dff", label: "rule", explain: "Curly braces containing one or more declarations." },
        { text: "</style>", color: "#00f5c4", highlight: "#00f5c4", label: "</style>", explain: "Closes the style block." },
      ],
      challenge: {
        id: "m14-style-tag",
        instruction: "Write a `head` tag containing a `style` tag with one rule: `h1` selector with `color: #39ff14;` inside curly braces. Then, outside of `head`, write an `h1` with any text of your choice.",
        relevantTags: [],
        check: (v) => {
          const n = v.toLowerCase().trim();
          if (!n) return "Type something";
          if (!/<head>/.test(n)) return "Wrap the style tag in a `head` tag";
          if (!/<\/head>/.test(n)) return "You opened `head` but didn't close it";
          if (!/<style/.test(n)) return "Use the `style` tag inside head";
          if (!/h1\s*{/.test(n)) return "Add an h1 selector with curly braces";
          if (!/color\s*:\s*#39ff14/.test(n)) return "Check the color value: #39ff14";
          if (!/<head>\s*<style>\s*h1\s*{\s*color:\s*#39ff14;\s*}\s*<\/style>\s*<\/head>/i.test(v)) return "Check the head and style tag match exactly";
          if (!/<h1>[^<]+<\/h1>/i.test(v)) return "Add an h1 with any text, outside of head";
          return "pass";
        },
        hint: "<head>\n  <style>\n    h1 { color: #39ff14; }\n  </style>\n</head>\n<h1>Signal restored</h1>",
      },
    },
  ],

  bossChallenge: {
    id: "m14-boss",
    zanComment: "The last patch. A style block for the whole page, and one element styled individually on top of it. Wooch says once this transmits, we're done. But he said pay attention to detail.",
    instruction: "Build the final visual patch in two parts. First, write a `style` tag containing one rule: `p { background-color: #020b18; color: #c8f0ff; }`. Second, write an `h1` that says `TRANSMISSION COMPLETE` with ITS OWN `style` attribute setting `color: #ffe94d;` — then a `p` that says `Signal strengthening.` to see the background-color rule in action.",
    relevantTags: ["h1"],
    check: (v) => {
      if (!v.trim()) return "Type something";
      const hasStyleTag = /<style>[\s\S]*p\s*{\s*background-color:\s*#020b18;\s*color:\s*#c8f0ff;\s*}[\s\S]*<\/style>/i.test(v);
      const hasH1 = /<h1[^>]*style="[^"]*color:\s*#ffe94d[^"]*"[^>]*>\s*transmission complete\s*<\/h1>/i.test(v);
      const hasP = /<p>[\s\S]*signal strengthening\.[\s\S]*<\/p>/i.test(v);
      if (hasStyleTag && hasH1 && hasP) return "pass";
      if (!hasStyleTag) return "Check the style tag — both rules, exact colors";
      if (!hasH1) return "Check the h1 and its style attribute";
      if (!hasP) return "Add the p with Signal strengthening. to see the background-color rule take effect";
      return "Almost — check both pieces match exactly";
    },
    hint: '<style>\n  p { background-color: #020b18; color: #c8f0ff; }\n</style>\n<h1 style="color: #ffe94d;">TRANSMISSION COMPLETE</h1>\n<p>Signal strengthening.</p>',
  },

  completionMessage: "Transmission complete. Every module restored. Every tag correct. The distress signal is fully built, fully styled, fully sent. Wooch says there's nothing left to fix. Gerald is still watching us.",
};