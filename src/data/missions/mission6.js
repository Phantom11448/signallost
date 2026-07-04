export const mission6 = {
  id: 6,
  title: "Activate Comms Array",
  subtitle: "Forms Part 1",
  badge: "📻",
  storyTag: "COMMS MODULE",
  atmosphere: "52 hours remaining",

  signalContribution: `<h2>Direct Contact Request</h2>\n<form>\n  <label for="callsign">Pilot Callsign:</label>\n  <input type="text" id="callsign" placeholder="Enter your designation">\n</form>`,
  bugExcerpt: `<form>\n  <label for="callsign">Pilot Callsign:</label>\n  <input type="text" id="callsign" placeholder="Enter your designation">\n</form>`,

  storyIntro: [
    "Hull's sealed. Phantar confirmed structural compliance, which is apparently a compliment on the scale Brix operates on.",
    "Now they want a way to talk back. Not just receive — talk back. A form. Something Phantar's rescue coordinator can fill out on their end to confirm contact with this specific transmission.",
    "Voss handles rescue coordination. Voss does not respond to paragraphs. Voss responds to forms. I am told this is a personality trait, not a system requirement, but at this point I am not going to argue with whoever gets to decide if a ship gets rescued.",
    "Let's build a form.",
  ],

  slides: [
    {
      id: "form-tag",
      heading: "The Form Tag — A Container for Input",
      body: "form is a container tag, just like div or section, except it has one specific job: it wraps a group of inputs that a user fills out and, eventually, submits. On its own, form doesn't do anything visible — it has no default appearance. It exists purely to group related inputs together and, later, to control what happens when the group gets submitted. Is form required to collect user input? Technically browsers will render an input tag even without a form wrapping it, but wrapping inputs in form is the correct structural choice — it tells the browser and any assistive technology that these fields belong together as one submission. Will we cover what happens when a form is submitted? Not yet — actually submitting data requires a server to receive it, which is beyond what we're covering in this mission. For now, form is just the correct container.",
      zanComment: "Forms do nothing visible on their own. Just like Wooch...",
      anatomy: [
        { text: "<form>", color: "#00f5c4", highlight: "#00f5c4", label: "<form>", explain: "Opens the form container. No visible appearance on its own." },
        { text: "...", color: "#c8f0ff", highlight: "#39ff14", label: "content", explain: "Inputs and labels go here." },
        { text: "</form>", color: "#00f5c4", highlight: "#00f5c4", label: "</form>", explain: "Closes the form." },
      ],
      relevantTags: ["form"],
      challenge: {
        id: "m6-form",
        instruction: "Write an empty `form` tag — just the opening and closing tags, nothing inside yet",
        relevantTags: ["form"],
        check: (v) => {
          const n = v.toLowerCase().trim();
          if (!n) return "Type something";
          if (/<form>\s*<\/form>/i.test(v)) return "pass";
          if (!/<form/.test(n)) return "Use the `form` tag";
          if (!/<\/form>/.test(n)) return "You opened `form` but didn't close it";
          return "Just an empty form tag for now — nothing inside yet";
        },
        hint: "<form></form>",
      },
    },
    {
      id: "input-text",
      heading: "Input — Where the User Types",
      body: "`input` is the tag that actually creates a fillable field. Like `img` and `br`, it's a void element — no closing tag, no content inside it. Instead, everything about an `input` is controlled through attributes. The `type` attribute tells the browser what kind of input this is — `type=\"text\"` creates a simple single-line text field, which is the most common `type` and the one we're focusing on here. The `placeholder` attribute shows light gray example text inside the field before the user types anything — it disappears the moment they start typing, and it is not the same as an actual `value`, it's just a visual hint. Is `type=\"text\"` the only kind of input? No — there are many types like `email`, `number`, and `password`, which we'll explore in a future mission. Does `placeholder` count as real data? No — if the user never types anything, the field is still considered empty even if placeholder text is visible. It's a hint, not a value.",
      dialogueExchange: [
        { speaker: "wooch", name: "WOOCH", text: "Make sure you're spelling everything right." },
        { speaker: "zhan", name: "ZHAN", text: "GOT IT" },
      ],
      invisibleOutput: false,
      anatomy: [
        { text: "<input ", color: "#00f5c4", highlight: "#00f5c4", label: "<input", explain: "Void element — no closing tag." },
        { text: 'type="text"', color: "#ffe94d", highlight: "#ffe94d", label: 'type="..."', explain: "Specifies what kind of input this is." },
        { text: ' placeholder="Enter your designation"', color: "#39ff14", highlight: "#39ff14", label: 'placeholder="..."', explain: "Hint text shown before typing. Disappears on input. Not a real value." },
        { text: ">", color: "#00f5c4", highlight: "#00f5c4", label: ">", explain: "Closes the tag. No </input> needed." },
      ],
      relevantTags: ["input"],
      challenge: {
        id: "m6-input",
        instruction: 'Write an `input` with `type="text"` and `placeholder="Enter your designation"`',
        relevantTags: ["input"],
        check: (v) => {
          const n = v.toLowerCase().trim();
          if (!n) return "Type something";
          if (!/<input/.test(n)) return "Use the `input` tag";
          if (!/type\s*=\s*"text"/i.test(n)) return 'Add type="text"';
          if (!/placeholder/i.test(n)) return "Add a placeholder attribute";
          if (/<input[^>]*type="text"[^>]*placeholder="enter your designation"[^>]*>/i.test(v) || /<input[^>]*placeholder="enter your designation"[^>]*type="text"[^>]*>/i.test(v)) return "pass";
          return "Check the placeholder text matches exactly: Enter your designation";
        },
        hint: '<input type="text" placeholder="Enter your designation">',
      },
      drills: [
        { instruction: 'Write an input with type="number" and placeholder="Callsign"', check: (v) => /<input[^>]*type="number"[^>]*placeholder="callsign"[^>]*>/i.test(v) || /<input[^>]*placeholder="callsign"[^>]*type="number"[^>]*>/i.test(v), answer: '<input type="number" placeholder="Callsign">' },
        { instruction: 'Write an input with type="date" and any placeholder text of your choice', check: (v) => /<input[^>]*type="date"[^>]*placeholder="[^"]{2,}"[^>]*>/i.test(v) || /<input[^>]*placeholder="[^"]{2,}"[^>]*type="date"[^>]*>/i.test(v), answer: '<input type="date" placeholder="Enter status">' },
      ],
    },
    {
      id: "label",
      heading: "Label — Connecting Text to Input",
      body: "label solves a real problem: how does a user know what an empty input field is actually for? A label is text tied directly to a specific input using two matching attributes. The label gets a for attribute, and the input gets a matching id attribute — when these two values are identical, the browser officially links them together. This does two important things: screen readers announce the label when the input is focused, and clicking the label text itself focuses the input, which is especially helpful on mobile where tapping a small input field can be difficult. Is label just visual text next to an input? No — the for and id connection is what makes it functionally linked, not just visually nearby. If the for and id values don't match exactly, the link is broken even if the label happens to sit right next to the input. Will every input need a label? In real-world professional projects, yes, almost always — unlabeled inputs are a common accessibility failure.",
      zanComment: "The for and the id have to match exactly or the connection breaks, invisibly, with no error message. I have decided this is either brilliant design or deeply unhinged. I have not decided which.",
      invisibleOutput: false,
      anatomy: [
        { text: '<label for="callsign">', color: "#00f5c4", highlight: "#00f5c4", label: 'for="callsign"', explain: "Must match the input's id exactly to link them." },
        { text: "Pilot Callsign:", color: "#c8f0ff", highlight: "#39ff14", label: "content", explain: "The visible label text." },
        { text: "</label>", color: "#00f5c4", highlight: "#00f5c4", label: "</label>", explain: "Closes the label." },
        { text: '<input id="callsign">', color: "#ffe94d", highlight: "#ffe94d", label: 'id="callsign"', explain: "Must match the label's for exactly." },
      ],
      relevantTags: ["label", "input"],
      challenge: {
        id: "m6-label",
        instruction: 'Write a `label` with `for="callsign"` that says `Pilot Callsign:` — then an `input` with matching `id="callsign"` and `type="text"`',
        relevantTags: ["label", "input"],
        check: (v) => {
          const n = v.toLowerCase().trim();
          if (!n) return "Type something";
          const hasLabel = /<label[^>]*for="callsign"[^>]*>\s*pilot callsign:\s*<\/label>/i.test(v);
          const hasInput = /<input[^>]*id="callsign"[^>]*type="text"[^>]*>/i.test(v) || /<input[^>]*type="text"[^>]*id="callsign"[^>]*>/i.test(v);
          if (hasLabel && hasInput) return "pass";
          if (!hasLabel) return 'Add the label with for="callsign" saying Pilot Callsign:';
          if (!hasInput) return 'Add the input with matching id="callsign" and type="text"';
          return "Almost — check both for and id match exactly: callsign";
        },
        hint: '<label for="callsign">Pilot Callsign:</label>\n<input type="text" id="callsign">',
      },
      drills: [
        { instruction: 'Write a label with for="status" that says: `Ship Status:` — then a matching input with id="status" and type="text"', check: (v) => /<label[^>]*for="status"[^>]*>[\s\S]*ship status:[\s\S]*<\/label>/i.test(v) && /<input[^>]*id="status"[^>]*>/i.test(v), answer: '<label for="status">Ship Status:</label>\n<input type="text" id="status">' },
      ],
    },
  ],

  bossChallenge: {
    id: "m6-boss",
    zanComment: "Voss wants the whole array active at once — form, label, and input, correctly linked, ready for a response. Don't forget the semicolon.",
    instruction: "Build the complete comms form. Write: a `form` containing a `label` with `for=\"callsign\"` that says `Pilot Callsign:` — then an `input` with `type=\"text\"`, matching `id=\"callsign\"`, and `placeholder=\"Enter your designation\"`",
    relevantTags: ["form", "label", "input"],
    check: (v) => {
      if (!v.trim()) return "Type something";
      const hasForm = /<form>[\s\S]*<\/form>/i.test(v);
      const hasLabel = /<label[^>]*for="callsign"[^>]*>[\s\S]*pilot callsign:[\s\S]*<\/label>/i.test(v);
      const hasInput = /<input[^>]*type="text"[^>]*id="callsign"[^>]*placeholder="enter your designation"[^>]*>/i.test(v) || /<input[^>]*id="callsign"[^>]*type="text"[^>]*placeholder="enter your designation"[^>]*>/i.test(v) || /<input[^>]*placeholder="enter your designation"[^>]*type="text"[^>]*id="callsign"[^>]*>/i.test(v);
      if (hasForm && hasLabel && hasInput) return "pass";
      if (!hasForm) return "Wrap everything in a form tag";
      if (!hasLabel) return "Add the label with for=\"callsign\"";
      if (!hasInput) return "Add the input with matching id, type, and placeholder";
      return "Almost — check the form wraps everything and for/id match";
    },
    hint: '<form>\n  <label for="callsign">Pilot Callsign:</label>\n  <input type="text" id="callsign" placeholder="Enter your designation">\n</form>',
  },

  completionMessage: "Comms array active. Two-way contact established with Phantar. Voss has not said anything yet. Wooch says silence from Voss is a good sign. I am choosing to believe Wooch.",
};