export const mission9 = {
  id: 9,
  title: "Decode the Alien Broadcast",
  subtitle: "Semantic HTML",
  badge: "📰",
  storyTag: "BROADCAST MODULE",
  atmosphere: "40 hours remaining",

  signalContribution: `<h2>Incoming Broadcast — Decoded</h2>\n<nav>\n  <a href="https://rescue.phantar">Rescue Status</a>\n  <a href="https://maps.google.com">Coordinates</a>\n</nav>\n<article>\n  <h3>Phantar Fleet Update</h3>\n  <p>A rescue vessel has been authorized pending final review.</p>\n</article>\n<aside>\n  <p><small>This message was relayed through three relay stations. Some delay expected.</small></p>\n</aside>\n<div class="signal-noise">Transmission static filtered.</div>`,
  bugExcerpt: `<nav>\n  <a href="https://rescue.phantar">Rescue Status</a>\n</nav>\n<article>\n  <h3>Phantar Fleet Update</h3>\n  <p>A rescue vessel has been authorized pending final review.</p>\n</article>`,

  storyIntro: [
    "The data matrix went through clean. Gorp reviewed it. Gorp said nothing, which Wooch keeps insisting is a compliment, and I keep choosing to believe.",
    "Something new happened today. For the first time since the crash, this ship received something instead of sending it. An actual incoming broadcast, from Phantar.",
    "It arrived structured — navigation links, a full article, a side note, and something the ship's decoder just labeled as a generic block with no real category. I have to read all of it, correctly, to understand what Phantar is telling us.",
    "This is the first message that isn't mine. I don't know why that changes how nervous I am to open it. But it does.",
  ],

  slides: [
    {
      id: "nav",
      relevantTags: ["nav", "a"],
      heading: "Nav — A Group of Navigation Links",
      body: "`nav` is a semantic container specifically for a group of `navigation` links — the kind of links meant to help someone move around a site or jump to different sections, not links buried inside regular paragraph text. Structurally, `nav` doesn't do anything a `div` couldn't technically do, but semantically it tells browsers, screen readers, and other tools 'this specific group of links is for navigation.' Screen readers can let users jump straight to a `nav` block, skipping past it entirely if they've already used it, which is a real accessibility benefit you don't get from an unlabeled group of links. Does every link on a page need to be inside `nav`? No — a `link` mentioned casually inside a `paragraph` stays right where it is, inside that `paragraph`. `nav` is specifically for a dedicated cluster of links whose entire purpose is `navigation`. Will you always see multiple links inside a `nav`? Almost always, though technically it could hold just one.",
      dialogueExchange: [
        { speaker: "wooch", name: "WOOCH", text: "They're making you add navigation links?" },
        { speaker: "zhan", name: "ZHAN", text: "Yeah apparently it's every bit as important as our decreasing atmosphere." },
      ],
      anatomy: [
        { text: "<nav>", color: "#00f5c4", highlight: "#00f5c4", label: "<nav>", explain: "Marks this group of links as navigation, not regular content." },
        { text: '<a href="...">Rescue Status</a>', color: "#c8f0ff", highlight: "#39ff14", label: "content", explain: "A navigation link, same a tag you already know." },
        { text: "</nav>", color: "#00f5c4", highlight: "#00f5c4", label: "</nav>", explain: "Closes the navigation group." },
      ],
      challenge: {
        id: "m9-nav",
        instruction: 'Write a `nav` containing two links: one to `https://rescue.phantar` that says `Rescue Status`, and one to `https://maps.google.com` that says `Coordinates`',
        relevantTags: ["nav", "a"],
        check: (v) => {
          const n = v.toLowerCase().trim();
          if (!n) return "Type something";
          if (!/<nav/.test(n)) return "Wrap the links in a `nav` tag";
          const hasLink1 = /<a[^>]*href="https:\/\/rescue\.phantar"[^>]*>\s*rescue status\s*<\/a>/i.test(v);
          const hasLink2 = /<a[^>]*href="https:\/\/maps\.google\.com"[^>]*>\s*coordinates\s*<\/a>/i.test(v);
          if (/<nav>[\s\S]*<\/nav>/i.test(v) && hasLink1 && hasLink2) return "pass";
          if (!hasLink1) return "Check the first link — Rescue Status";
          if (!hasLink2) return "Check the second link — Coordinates";
          return "Almost — check both links are inside the nav tag";
        },
        hint: '<nav>\n  <a href="https://rescue.phantar">Rescue Status</a>\n  <a href="https://maps.google.com">Coordinates</a>\n</nav>',
      },
    },
    {
      id: "article",
      relevantTags: ["article", "h3", "p"],
      heading: "Article — Self-Contained Content",
      body: "`article` marks content that could stand entirely on its own — a news story, a blog post, a forum comment, anything that would still make complete sense if you pulled it out of the page and put it somewhere else by itself. That's the real test for whether something belongs in an `article`: could this be copied out and dropped into a completely different page and still make full sense on its own? A news headline and its story, yes. A single sentence fragment from the middle of a bigger explanation, no. Is `article` different from `section`, which you learned in Mission 5? Yes — `section` groups related content that belongs to the bigger page around it, while `article` is specifically self-contained and independent. Will an `article` often have its own `heading`? Yes, almost always — since it's meant to stand alone, it usually needs its own title to make sense out of context.",
      zanComment: "The test for article is: could this survive being ripped out and dropped somewhere else and still make sense.",
      anatomy: [
        { text: "<article>", color: "#00f5c4", highlight: "#00f5c4", label: "<article>", explain: "Marks content that could stand entirely on its own." },
        { text: "<h3>Phantar Fleet Update</h3>", color: "#ffe94d", highlight: "#ffe94d", label: "heading", explain: "Self-contained content usually has its own heading." },
        { text: "</article>", color: "#00f5c4", highlight: "#00f5c4", label: "</article>", explain: "Closes the article." },
      ],
      challenge: {
        id: "m9-article",
        instruction: 'Write an `article` with an `h3` that says `Phantar Fleet Update` and a `p` that says `A rescue vessel has been authorized pending final review.`',
        relevantTags: ["article", "h3", "p"],
        check: (v) => {
          const n = v.toLowerCase().trim();
          if (!n) return "Type something";
          if (!/<article/.test(n)) return "Wrap it in an `article` tag";
          const hasHeading = /<h3>[\s\S]*phantar fleet update[\s\S]*<\/h3>/i.test(v);
          const hasBody = /<p>[\s\S]*a rescue vessel has been authorized pending final review\.[\s\S]*<\/p>/i.test(v);
          if (/<article>[\s\S]*<\/article>/i.test(v) && hasHeading && hasBody) return "pass";
          if (!hasHeading) return "Check the h3 heading matches exactly";
          if (!hasBody) return "Check the p text matches exactly";
          return "Almost — check both are inside the article tag";
        },
        hint: "<article>\n  <h3>Phantar Fleet Update</h3>\n  <p>A rescue vessel has been authorized pending final review.</p>\n</article>",
      },
      drills: [
        { instruction: "Write an article with an h3 and a p, any content of your choice", check: (v) => /<article>[\s\S]*<h3>[^<]+<\/h3>[\s\S]*<p>[^<]+<\/p>[\s\S]*<\/article>/i.test(v), answer: "<article>\n  <h3>Repair Log</h3>\n  <p>Hull sealed successfully.</p>\n</article>" },
      ],
    },
    {
      id: "aside-div",
      relevantTags: ["aside", "p", "small", "div"],
      heading: "Aside and Div — Side Notes and the Generic Fallback",
      body: "`aside` marks content that's related to the main content but not essential to it — a side note, a tangent, extra context someone could skip without losing the main point. Think of it like a footnote that adds flavor but isn't required reading. `div` is the opposite of every semantic tag you've learned — it means nothing. `div` stands for `division`, and it exists purely as a generic container with zero built-in meaning, used only when nothing else fits — no semantic tag accurately describes what this content is, so you fall back to the neutral option. Is it bad to use `div`? No, not at all — sometimes a generic wrapper really is the correct choice, especially for styling purposes later with CSS. The mistake is using `div` everywhere out of habit when a more specific semantic tag actually fits better. Now that you know `header`, `main`, `footer`, `section`, `nav`, `article`, and `aside`, `div` should be your last choice, not your first.",
      zanComment: "div means nothing. It is the tag equivalent of a shrug. I respect that.",
      anatomy: [
        { text: "<aside>", color: "#00f5c4", highlight: "#00f5c4", label: "<aside>", explain: "Related but non-essential content — a side note." },
        { text: "<div>", color: "#ffe94d", highlight: "#ffe94d", label: "<div>", explain: "Generic container, no built-in meaning. Last choice, not first." },
      ],
      challenge: {
        id: "m9-aside-div",
        instruction: 'Write an `aside` containing a `p` with `small` inside it that says `This message was relayed through three relay stations. Some delay expected.` — then a `div` that says `Transmission static filtered.`',
        relevantTags: ["aside", "p", "small", "div"],
        check: (v) => {
          const n = v.toLowerCase().trim();
          if (!n) return "Type something";
          const hasAside = /<aside>[\s\S]*<p>\s*<small>[\s\S]*this message was relayed through three relay stations\. some delay expected\.[\s\S]*<\/small>\s*<\/p>[\s\S]*<\/aside>/i.test(v);
          const hasDiv = /<div>[\s\S]*transmission static filtered\.[\s\S]*<\/div>/i.test(v);
          if (hasAside && hasDiv) return "pass";
          if (!hasAside) return "Check the aside — p with small inside, exact text";
          if (!hasDiv) return "Check the div — exact text";
          return "Almost — check both match exactly";
        },
        hint: "<aside>\n  <p><small>This message was relayed through three relay stations. Some delay expected.</small></p>\n</aside>\n<div>Transmission static filtered.</div>",
      },
    },
  ],

  bossChallenge: {
    id: "m9-boss",
    zanComment: "Decode the full broadcast — navigation, the article, the aside, and the leftover static Phantar's decoder couldn't categorize. All four pieces, correctly labeled. I did not choose this job.",
    instruction: 'Build the full decoded broadcast. Write: a `nav` with a link to `https://rescue.phantar` that says `Rescue Status`. Then an `article` with an `h3` that says `Phantar Fleet Update` and a `p` that says `A rescue vessel has been authorized pending final review.` Then an `aside` with a `p` and `small` that says `This message was relayed through three relay stations. Some delay expected.` Then a `div` that says `Transmission static filtered.`',
    relevantTags: ["nav", "a", "article", "h3", "p", "aside", "small", "div"],
    check: (v) => {
      if (!v.trim()) return "Type something";
      const hasNav = /<nav>[\s\S]*<a[^>]*href="https:\/\/rescue\.phantar"[^>]*>\s*rescue status\s*<\/a>[\s\S]*<\/nav>/i.test(v);
      const hasArticle = /<article>[\s\S]*<h3>[\s\S]*phantar fleet update[\s\S]*<\/h3>[\s\S]*<p>[\s\S]*a rescue vessel has been authorized pending final review\.[\s\S]*<\/p>[\s\S]*<\/article>/i.test(v);
      const hasAside = /<aside>[\s\S]*<small>[\s\S]*this message was relayed through three relay stations\. some delay expected\.[\s\S]*<\/small>[\s\S]*<\/aside>/i.test(v);
      const hasDiv = /<div>[\s\S]*transmission static filtered\.[\s\S]*<\/div>/i.test(v);
      if (hasNav && hasArticle && hasAside && hasDiv) return "pass";
      if (!hasNav) return "Check the nav and link";
      if (!hasArticle) return "Check the article — h3 and p text";
      if (!hasAside) return "Check the aside — small text";
      if (!hasDiv) return "Check the div text";
      return "Almost — check all four pieces match exactly";
    },
    hint: '<nav>\n  <a href="https://rescue.phantar">Rescue Status</a>\n</nav>\n<article>\n  <h3>Phantar Fleet Update</h3>\n  <p>A rescue vessel has been authorized pending final review.</p>\n</article>\n<aside>\n  <p><small>This message was relayed through three relay stations. Some delay expected.</small></p>\n</aside>\n<div>Transmission static filtered.</div>',
  },

  completionMessage: "Broadcast decoded. A rescue vessel has been authorized. Still pending final review, but authorized.",
};