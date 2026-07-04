export const mission3 = {
  id: 3,
  title: "Stabilize Life Support",
  subtitle: "Lists & Buttons",
  badge: "🫁",
  storyTag: "LIFE SUPPORT MODULE",
  atmosphere: "64 hours remaining",

  signalContribution: `<h2>Life Support Status</h2>\n<ul>\n  <li>Helium: critical, declining</li>\n  <li>Water reserves: stable</li>\n  <li>Heat shielding: damaged</li>\n</ul>\n<button>Request Emergency Supply Drop</button>`,
  bugExcerpt: `<ul>\n  <li>Helium: critical, declining</li>\n</ul>\n<button>Request Emergency Supply Drop</button>`,

  storyIntro: [
    "Phantar accepted the visual evidence. Regulation 4,112 is satisfied. Apparently that just means they believe I crashed. It does not mean they are coming to get me.",
    "New requirement: a full life support status report. Itemized. Phantar does not accept prose for this part. Brix from intake was very clear about this. 'We require a list, Pilot Zhan. Not a paragraph. A list.' I do not know why this distinction matters to Brix specifically. But it matters a great deal.",
    "I also need to include a button. An actual clickable request for a supply drop. Brix explained that a paragraph asking for help is 'a suggestion' but a button is 'an action.' Phantar's systems apparently only respond to actions.",
    "The helium levels are dropping faster than I'd like to admit. Gerald is back outside the window. Gerald does not appear to require oxygen. I am choosing not to explore that further right now.",
  ],

  slides: [
    {
      id: "unordered-lists",
      relevantTags: ["ul", "li"],
      heading: "Unordered Lists — When Order Doesn't Matter",
      body: "A list in HTML needs two things: a container tag that says 'a list starts here' and individual item tags for each thing in the list. For a list where order does not matter — like a grocery list or, in this case, a status report — you use `ul`, which stands for unordered list. Inside a `ul`, every single item goes inside its own `li` tag, which stands for list item. The browser automatically adds a bullet point in front of each `li` — you do not have to type the bullet yourself. The `ul` tag never holds text directly. It only holds `li` tags. Is `ul` the only kind of list? No — there's also `ol` for ordered lists, which we'll cover next. Will you use lists a lot? Constantly. Navigation menus, ingredient lists, status reports, feature lists on a webpage — almost all of it is built with ul and li working together.",
      dialogueExchange: [
        { speaker: "zhan", name: "ZHAN", text: "Typing codes into a box to produce bullet points..." },
        { speaker: "wooch", name: "WOOCH", text: "Our ancestors were tapping holograms for this." },
      ],
      anatomy: [
        { text: "<ul>", color: "#00f5c4", highlight: "#00f5c4", label: "<ul>", explain: "Opens an unordered list. Holds li items. Never holds text directly." },
        { text: "<li>", color: "#ffe94d", highlight: "#ffe94d", label: "<li>", explain: "List item. One per thing in the list. The browser adds the bullet." },
        { text: "Oxygen: critical", color: "#c8f0ff", highlight: "#39ff14", label: "content", explain: "The actual text of this list item." },
        { text: "</li>", color: "#ffe94d", highlight: "#ffe94d", label: "</li>", explain: "Closes this list item." },
        { text: "</ul>", color: "#00f5c4", highlight: "#00f5c4", label: "</ul>", explain: "Closes the whole list. Everything between the opening and this belongs to the list." },
      ],
      challenge: {
        id: "m3-ul",
        relevantTags: ["ul", "li"],
        instruction: "Write an unordered list with one item that says: `Helium: critical`",
        check: (v) => {
          const n = v.toLowerCase().trim();
          if (!n) return "Type something";
          if (!/<ul/.test(n)) return "Use the `<ul>` tag to start an unordered list";
          if (!/<li/.test(n)) return "You need at least one `<li>` item inside the list";
          if (/<ul>[\s\S]*<li>[\s\S]*helium:\s*critical[\s\S]*<\/li>[\s\S]*<\/ul>/i.test(v)) return "pass";
          if (!/<\/ul>/.test(n)) return "You opened `<ul>` but didn't close it — add `</ul>` at the end";
          if (!/<\/li>/.test(n)) return "You opened `<li>` but didn't close it — add `</li>`";
          return "Check your list item says exactly: `Helium: critical`";
        },
        hint: "<ul>\n  <li>Oxygen: critical</li>\n</ul>",
      },
      drills: [
        { relevantTags: ["ul", "li"], instruction: "Write a ul with one item that says: `Water reserves: stable`", check: (v) => /<ul>[\s\S]*<li>[\s\S]*water reserves:\s*stable[\s\S]*<\/li>[\s\S]*<\/ul>/i.test(v), answer: "<ul>\n  <li>Water reserves: stable</li>\n</ul>" },
        { relevantTags: ["ul", "li"], instruction: "Write a ul with two items — anything you want, one per li", check: (v) => (v.match(/<li>/gi) || []).length >= 2 && /<ul>/i.test(v) && /<\/ul>/i.test(v), answer: "<ul>\n  <li>Heat shielding: damaged</li>\n  <li>Power core: stable</li>\n</ul>" },
        { relevantTags: ["ul", "li"], instruction: "Write a ul with one item that says: `Heat shielding: damaged`", check: (v) => /<ul>[\s\S]*<li>[\s\S]*heat shielding:\s*damaged[\s\S]*<\/li>[\s\S]*<\/ul>/i.test(v), answer: "<ul>\n  <li>Heat shielding: damaged</li>\n</ul>" },
      ],
    },
    {
      id: "ordered-lists",
      relevantTags: ["ol", "li"],
      heading: "Ordered Lists — When Order Matters",
      body: "Sometimes order matters — like steps in an emergency procedure. That's what `ol` is for: ordered list. It works exactly like `ul`, except the browser numbers each item automatically instead of adding a bullet — 1, 2, 3, and so on. You still use `li` for every item inside, same as before. The only thing that changes is the outer container tag, from `ul` to `ol`. If you add, remove, or reorder items in an `ol`, the browser renumbers everything automatically — you never type the numbers yourself. Is there a limit to how many items you can have? No — `ol` and `ul` can hold as many `li` items as you need. Will you use `ol` as often as `ul`? Less often, honestly. Most lists on the web don't need strict order. But when you need step-by-step instructions, `ol` is exactly right.",
      dialogueExchange: [
        { speaker: "zhan", name: "ZHAN", text: "The list renumbers itself when I add a step." },
        { speaker: "luvek", name: "LUVEK", text: "Groundbreaking." },
        { speaker: "zhan", name: "ZHAN", text: "They still watch a rock orbit a star to keep track of time. What did you expect..." },
      ],
      anatomy: [
        { text: "<ol>", color: "#00f5c4", highlight: "#00f5c4", label: "<ol>", explain: "Opens an ordered list. Same rules as ul, but numbered instead of bulleted." },
        { text: "<li>", color: "#ffe94d", highlight: "#ffe94d", label: "<li>", explain: "Still li for items — same tag as unordered lists." },
        { text: "Seal the hatch", color: "#c8f0ff", highlight: "#39ff14", label: "content", explain: "This item's text. The browser numbers it automatically based on position." },
        { text: "</li>", color: "#ffe94d", highlight: "#ffe94d", label: "</li>", explain: "Closes this item." },
        { text: "</ol>", color: "#00f5c4", highlight: "#00f5c4", label: "</ol>", explain: "Closes the ordered list." },
      ],
      challenge: {
        id: "m3-ol",
        relevantTags: ["ol", "li"],
        instruction: "Write an ordered list with two steps: `Seal the hatch` and `Activate backup oxygen`",
        check: (v) => {
          const n = v.toLowerCase().trim();
          if (!n) return "Type something";
          if (!/<ol/.test(n)) return "Use the `<ol>` tag for an ordered list";
          if ((n.match(/<li>/g) || []).length < 2) return "You need two `<li>` items — one for each step";
          if (/<ol>[\s\S]*seal the hatch[\s\S]*activate backup oxygen[\s\S]*<\/ol>/i.test(v)) return "pass";
          return "Check both steps are there in order and the text matches exactly";
        },
        hint: "<ol>\n  <li>Seal the hatch</li>\n  <li>Activate backup oxygen</li>\n</ol>",
      },
      drills: [
        { relevantTags: ["ol", "li"], instruction: "Write an ol with three steps, anything you want", check: (v) => (v.match(/<li>/gi) || []).length >= 3 && /<ol>/i.test(v) && /<\/ol>/i.test(v), answer: "<ol>\n  <li>Check hull integrity</li>\n  <li>Vent excess pressure</li>\n  <li>Radio for status</li>\n</ol>" },
        { relevantTags: ["ol", "li"], instruction: "Write an ol with one step that says: `Distribute emergency rations`", check: (v) => /<ol>[\s\S]*<li>[\s\S]*distribute emergency rations[\s\S]*<\/li>[\s\S]*<\/ol>/i.test(v), answer: "<ol>\n  <li>Distribute emergency rations</li>\n</ol>" },
      ],
    },
    {
      id: "buttons",
      relevantTags: ["button"],
      heading: "Buttons — Turning Text Into an Action",
      body: "A `button` is simple: the `button` tag wraps whatever text you want the `button` to say. That's it. `button` is one of the few tags whose name is exactly what it sounds like. Right now, by itself, an HTML button doesn't actually do anything when clicked — no popup, no page change, nothing happens yet. That's because making a button perform an action requires JavaScript, which you have not learned yet and don't need to for this mission. For now, think of the `button` tag as the visual and structural piece — it tells the browser 'this is a clickable action, style it and treat it like one.' The behavior gets wired up later. Is button the only clickable thing in HTML? No — you already learned about the `a` tag for links, which is also clickable. The difference: links `a` are for navigating somewhere else. Buttons `button` are for triggering an action on the current page, like submitting a form or requesting something. We'll see forms in a future mission where this distinction matters a lot more.",
      zanComment: "The button doesn't do anything yet. I clicked it eleven times. Nothing happened. Apparently that's correct. I have never been more suspicious of something being correct.",
      anatomy: [
        { text: "<button>", color: "#00f5c4", highlight: "#00f5c4", label: "<button>", explain: "Opens a button. Renders as a clickable box by default." },
        { text: "Request Emergency Supply Drop", color: "#c8f0ff", highlight: "#39ff14", label: "content", explain: "The text displayed on the button itself." },
        { text: "</button>", color: "#00f5c4", highlight: "#00f5c4", label: "</button>", explain: "Closes the button tag." },
      ],
      challenge: {
        id: "m3-button",
        relevantTags: ["button"],
        instruction: "Write a button that says: `Request Emergency Supply Drop`",
        check: (v) => {
          const n = v.toLowerCase().trim();
          if (!n) return "Type something";
          if (!/<button/.test(n)) return "Use the `<button>` tag";
          if (/<button/.test(n) && !/<\/button>/.test(n)) return "You opened `<button>` but didn't close it — add `</button>`";
          if (/<button>\s*request emergency supply drop\s*<\/button>/i.test(v)) return "pass";
          return "Check the button text matches exactly: `Request Emergency Supply Drop`";
        },
        hint: "<button>Request Emergency Supply Drop</button>",
      },
      drills: [
        { relevantTags: ["button"], instruction: "Write a button that says: `Send Distress Signal`", check: (v) => /<button>\s*send distress signal\s*<\/button>/i.test(v), answer: "<button>Send Distress Signal</button>" },
        { relevantTags: ["button"], instruction: "Write a button that says: `Confirm Coordinates`", check: (v) => /<button>\s*confirm coordinates\s*<\/button>/i.test(v), answer: "<button>Confirm Coordinates</button>" },
        { relevantTags: ["button"], instruction: "Write a button with any text you want", check: (v) => /<button>[^<]{3,}<\/button>/i.test(v), answer: "<button>Request Rescue</button>" },
      ],
    },
  ],

  bossChallenge: {
    id: "m3-boss",
    relevantTags: ["ul", "li", "ol", "button"],
    zanComment: "Brix wants the complete life support report: an itemized list AND an action button, in the same transmission. Brix used the word 'itemized' four times in one message. I now understand why Brix works intake and not anything requiring warmth.",
    instruction: "Build the complete life support report. Write: an `h2` that says `Life Support Status`. Then a `ul` with three items: `Helium: critical, declining`, `Water reserves: stable`, and `Heat shielding: damaged`. Then a `button` that says `Request Emergency Supply Drop`",
    check: (v) => {
      if (!v.trim()) return "Type something";
      const hasH2 = /<h2>[\s\S]*life support status[\s\S]*<\/h2>/i.test(v);
      const hasList = /<ul>[\s\S]*helium[\s\S]*critical[\s\S]*water reserves[\s\S]*stable[\s\S]*heat shielding[\s\S]*damaged[\s\S]*<\/ul>/i.test(v);
      const hasButton = /<button>\s*request emergency supply drop\s*<\/button>/i.test(v);
      if (hasH2 && hasList && hasButton) return "pass";
      if (!hasH2) return "Start with the h2 heading — Life Support Status";
      if (!hasList) return "Add the ul with all three status items — check the exact wording of each";
      if (!hasButton) return "Add the button — Request Emergency Supply Drop";
      return "Almost — check all three pieces are there and match exactly";
    },
    hint: '<h2>Life Support Status</h2>\n<ul>\n  <li>Helium: critical, declining</li>\n  <li>Water reserves: stable</li>\n  <li>Heat shielding: damaged</li>\n</ul>\n<button>Request Emergency Supply Drop</button>',
  },

  completionMessage: "Life support module stabilized. Phantar has the itemized report Brix required, and the supply drop request has been logged as an action rather than a suggestion. Whether Phantar actually sends anything remains unclear. Gerald has not left the window in six hours. I am starting to wonder if Gerald is also waiting for rescue.",
};