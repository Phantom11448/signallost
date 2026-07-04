export const mission13 = {
  id: 13,
  title: "Decode Zorbin's Transmission",
  subtitle: "Comments & Special Characters",
  badge: "💬",
  storyTag: "DECODER MODULE",
  atmosphere: "20 hours remaining",

  signalContribution: `<!-- Zorbin's full transmission, decoded -->\n<h2>Recovered Message — Navigator Zorbin</h2>\n<p>&quot;I&#39;m fine. Made it out before impact. Long story &mdash; I&#39;ll explain when this is over.&quot;</p>\n<p>Signal strengthening &amp; stabilizing</p>`,

  storyIntro: [
    "The translator works. Every part of this ship's transmissions now works for every kind of receiver. Luvek said that was the part she was proudest of. I am still thinking about that.",
    "The projector footage of Zorbin is still sitting there, mostly decoded. Mostly. The last stretch of audio came through as garbled symbols — ampersands, brackets, quote marks in places quote marks don't belong. Wooch says that's not corruption. Wooch says that's encoding.",
    "Some characters can't just be typed directly into HTML — they mean something else to the browser, or they don't exist on a normal keyboard at all. There's a whole system for enacting this ancient voodoo. Zorbin's message is buried inside that system.",
    "There's also something in the file itself — text that isn't meant to display at all, just sit there in the code, invisible to anyone reading the page normally. A note. Left for whoever eventually pulled this file apart line by line.",
    "That's me. I am going to pull this file apart line by line.",
  ],

  slides: [
    {
      id: "comments",
      heading: "Comments — Notes the Browser Never Shows",
      body: "An `HTML comment` is text written directly in your code that the browser completely ignores when displaying the page. It never renders, never shows up anywhere visible, no matter what's inside it. `Comments` start with `<!-- and end with -->`, and everything between those two markers is `invisible to anyone viewing the actual page` — it only exists in the raw code itself. Why would you write something nobody sees? Comments are notes to yourself or to anyone else reading the code later — reminders about why something was built a certain way, temporary notes during development, or, apparently, messages left specifically for whoever eventually goes looking. Is a `comment` the same as an invisible tag like `head` content? No — `head(h1, h2, etc.)` content like `title` still serves a real function for browsers, tabs, and search engines. A `comment` does nothing at all. It exists purely for humans reading the code, not for the browser or any user-facing purpose. Will this show up in the preview? No — genuinely nothing will appear. That's correct, not a bug.",
      zanComment: "No comment.",
      invisibleOutput: true,
      relevantTags: [],
      anatomy: [
        { text: "<!-- ", color: "#00f5c4", highlight: "#00f5c4", label: "<!--", explain: "Opens a comment. Everything after this is invisible to the browser's display." },
        { text: "Zorbin's full transmission, decoded", color: "#c8f0ff", highlight: "#39ff14", label: "comment text", explain: "Never renders. Exists only for someone reading the raw code." },
        { text: " -->", color: "#00f5c4", highlight: "#00f5c4", label: "-->", explain: "Closes the comment." },
      ],
      challenge: {
        id: "m13-comments",
        instruction: "Write a comment that says: `Zorbin's full transmission, decoded`",
        relevantTags: [],
        invisibleOutput: true,
        check: (v) => {
          const n = v.trim();
          if (!n) return "Type something";
          if (!/<!--/.test(n)) return "Comments start with <!--";
          if (!/-->/.test(n)) return "Comments end with -->";
          if (/<!--\s*zorbin's full transmission, decoded\s*-->/i.test(v)) return "pass";
          return "Check the comment text matches exactly";
        },
        hint: "<!-- Zorbin's full transmission, decoded -->",
      },
    },
    {
      id: "entities",
      heading: "Special Characters — Entities for Symbols HTML Reserves",
      entityHighlight: true,
      body: "Some characters can't just be typed directly into your HTML, because the browser would misread them as actual code instead of visible text. The most important example: the `<` and `>` characters, which the browser uses to recognize `tags`. If you type a literal `<` character intending it as visible text, the browser tries to interpret it as the start of a `tag` instead. To display these characters as actual visible symbols, HTML uses something called an `entity` — a special code starting with an `ampersand(&)` and ending with a `semicolon(;)`, which the browser converts into the actual character when it renders the page. `&lt;` displays a literal `<` symbol. `&gt;` displays a literal `>` symbol. `&amp;` displays a literal `&` symbol — which also needs its own `entity`, since `&` starts every `entity` code in the first place. `&quot;` displays a literal `\"` character, useful when you need actual quote marks inside text that's already inside quoted attribute values. Will you need these often? Mostly in specific situations — showing code examples on a page, displaying literal symbols that would otherwise break your HTML, or, apparently, decoding a corrupted transmission one character at a time. One more thing worth understanding: where a code like `&#39;` actually comes from. Every character your keyboard can produce — letters, numbers, punctuation, symbols — has an assigned number in a standardized system called `ASCII`, and by extension, a larger system called `Unicode`. `Apostrophe` happens to be character `number 39` in that system. `&#39;` is what's called a `numeric character reference` — the `&#` tells the browser 'what follows is a character's numeric code,' and the number says exactly which character. This exists as a reliable fallback for referencing any character, even ones without a friendly named `entity` like `&amp;` or `&lt;`. There is technically a named version for apostrophe too, called `&apos;`, but `&#39;` is more consistently supported across older systems and tools, which is why it's the one you'll see used most often.",
      zanComment: "The ampersand needs its own special code to display itself, because typing it directly would try to start a different special code. I have read that sentence four times. I still do not fully accept it. I am proceeding anyway.",
      relevantTags: ["p"],
      anatomy: [
        { text: "&lt;", color: "#00f5c4", highlight: "#00f5c4", label: "&lt;", explain: "Displays a literal < symbol." },
        { text: "&gt;", color: "#ffe94d", highlight: "#ffe94d", label: "&gt;", explain: "Displays a literal > symbol." },
        { text: "&amp;", color: "#39ff14", highlight: "#39ff14", label: "&amp;", explain: "Displays a literal & symbol." },
        { text: "&quot;", color: "#a98dff", highlight: "#a98dff", label: "&quot;", explain: 'Displays a literal " character.' },
      ],
      challenge: {
        id: "m13-entities",
        entityHighlight: true,
        instruction: 'Write a paragraph that says: `Signal strengthening & stabilizing` — using the entity for the ampersand instead of a literal & symbol',
        relevantTags: ["p"],
        check: (v) => {
          const n = v.toLowerCase().trim();
          if (!n) return "Type something";
          if (!/<p/.test(n)) return "Wrap it in a p tag";
          if (!/&amp;/i.test(n)) return "Use the &amp; entity instead of a literal & symbol";
          if (/<p>\s*signal strengthening\s*&amp;\s*stabilizing\s*<\/p>/i.test(v)) return "pass";
          return "Check the text matches exactly, including the &amp; entity";
        },
        hint: "<p>Signal strengthening &amp; stabilizing</p>",
      },
      drills: [
        { instruction: "Write a paragraph that says: `Use &lt;html&gt; to start a page.` — using entities for both the less-than and greater-than symbols around html", check: (v) => /<p>[\s\S]*&lt;html&gt;[\s\S]*<\/p>/i.test(v), answer: "<p>Use &lt;html&gt; to start a page.</p>" },
      ],
    },
    {
      id: "decode-message",
      heading: "Putting It Together — The Final Decode",
      entityHighlight: true,
      body: "One more entity worth knowing, since you'll need it here: &mdash; displays an em dash — the long dash you've seen throughout every transmission on this ship. Typing a literal em dash isn't always reliable across every keyboard and system, so &mdash; guarantees it renders correctly everywhere. There's also &#39;, which displays a literal apostrophe — useful specifically inside text that's already wrapped in single quotes elsewhere in your code, similar to how &quot; works for double quotes. Zorbin's message uses all of this — quotes around his own words, an apostrophe in a contraction, an em dash mid-sentence, and an ampersand at the end. Every piece you've learned this mission, together, in one message.",
      zanComment: "I am about to decode the actual words. Not a placeholder. Not a corrupted fragment. The actual words. I have not been this nervous since the crash itself.",
      relevantTags: ["p"],
      anatomy: [
        { text: "&mdash;", color: "#00f5c4", highlight: "#00f5c4", label: "&mdash;", explain: "Displays an em dash — reliable across every system." },
        { text: "&#39;", color: "#ffe94d", highlight: "#ffe94d", label: "&#39;", explain: "Displays a literal apostrophe." },
      ],
      challenge: {
        id: "m13-decode",
        entityHighlight: true,
        instruction: 'Decode the message. Write a paragraph that says: `&quot;I&#39;m fine. Made it out before impact. Long story &mdash; I&#39;ll explain when this is over.&quot;`',
        relevantTags: ["p"],
        check: (v) => {
          const n = v.toLowerCase().trim();
          if (!n) return "Type something";
          if (!/<p/.test(n)) return "Wrap it in a p tag";
          const hasQuotes = /&quot;/.test(n);
          const hasApostrophes = /&#39;/.test(n);
          const hasDash = /&mdash;/.test(n);
          if (!hasQuotes) return "Use &quot; for the quote marks around the message";
          if (!hasApostrophes) return "Use &#39; for the apostrophes in I'm and I'll";
          if (!hasDash) return "Use &mdash; for the em dash";
          if (/<p>\s*&quot;i&#39;m fine\. made it out before impact\. long story &mdash; i&#39;ll explain when this is over\.&quot;\s*<\/p>/i.test(v)) return "pass";
          return "Almost — check every entity and every word matches exactly";
        },
        hint: "<p>&quot;I&#39;m fine. Made it out before impact. Long story &mdash; I&#39;ll explain when this is over.&quot;</p>",
      },
    },
  ],

  bossChallenge: {
    id: "m13-boss",
    entityHighlight: true,
    zanComment: "The full recovered transmission. A hidden comment, and Zorbin's actual decoded words, entities and all. Whatever this says, I need to see all of it, correctly, at once.",
    instruction: 'Build the full recovered transmission. Write: a comment that says `Zorbin\'s full transmission, decoded`. Then a `p` that says `&quot;I&#39;m fine. Made it out before impact. Long story &mdash; I&#39;ll explain when this is over.&quot;` Then a `p` that says `Signal strengthening & stabilizing`',
    relevantTags: ["p"],
    check: (v) => {
      if (!v.trim()) return "Type something";
      const hasComment = /<!--\s*zorbin's full transmission, decoded\s*-->/i.test(v);
      const hasMessage = /<p>\s*&quot;i&#39;m fine\. made it out before impact\. long story &mdash; i&#39;ll explain when this is over\.&quot;\s*<\/p>/i.test(v);
      const hasSignal = /<p>\s*signal strengthening\s*&amp;\s*stabilizing\s*<\/p>/i.test(v);
      if (hasComment && hasMessage && hasSignal) return "pass";
      if (!hasComment) return "Check the comment text matches exactly";
      if (!hasMessage) return "Check Zorbin's decoded message and every entity";
      if (!hasSignal) return "Check the signal strength line and the &amp; entity";
      return "Almost — check all three pieces match exactly";
    },
    hint: "<!-- Zorbin's full transmission, decoded -->\n<p>&quot;I&#39;m fine. Made it out before impact. Long story &mdash; I&#39;ll explain when this is over.&quot;</p>\n<p>Signal strengthening &amp; stabilizing</p>",
  },

  completionMessage: "Decoded. Fully. Zorbin is alive. Zorbin has been alive this entire time, hiding among a group of costumed strangers at some kind of gathering, eating something called a Whataburger, waiting for exactly the right moment to explain himself. I have several questions. I am told the answers involve a food truck and extremely poor timing. I am choosing to be relieved first and furious second.",
};