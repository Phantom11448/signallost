export const mission7 = {
  id: 7,
  title: "Upgrade Life Pod Controls",
  subtitle: "Forms Part 2",
  badge: "🎛️",
  storyTag: "CONTROLS MODULE",
  atmosphere: "48 hours remaining",

  signalContribution: `<h2>Rescue Pod Configuration</h2>\n<form>\n  <label for="podType">Pod Type Requested:</label>\n  <select id="podType">\n    <option>Standard</option>\n    <option>Emergency</option>\n  </select>\n  <label for="notes">Additional Notes:</label>\n  <textarea id="notes" placeholder="Describe current condition"></textarea>\n  <label for="confirm">I confirm this request is accurate</label>\n  <input type="checkbox" id="confirm">\n  <button type="submit">Send Configuration</button>\n</form>`,
  bugExcerpt: `<select>\n  <option>Standard</option>\n  <option>Emergency</option>\n</select>\n<button type="submit">Send Configuration</button>`,

  storyIntro: [
    "Comms are active. Voss has acknowledged contact. Voss acknowledged it in exactly four words, which Wooch assures me is Voss being warm.",
    "Now Voss wants the actual rescue pod configured before dispatch. Not a text field this time. Real controls — a dropdown to pick the pod type, a way to add notes, a checkbox to confirm, and an actual button to send it.",
    "I have been informed that a submit button is different from a regular button. I did not know this distinction existed twenty minutes ago.",
    "Let's get the life pod ready.",
  ],

  slides: [
    {
      id: "select-option",
      heading: "Select and Option — A Dropdown Menu",
      body: "`select` creates a dropdown menu, and `option` defines each individual choice inside it. `select` is the outer container — on its own it's empty and useless — and every `option` tag nested inside it becomes one selectable item in the list. The text between the opening and closing `option` tags is exactly what the user sees and picks. Is there a way to make one `option` selected by default? Yes, using a selected attribute on one of the `option` tags, though we won't focus on that here. Will users be able to type their own answer into a `select`? No — that's the whole point of a dropdown, it restricts the user to only the choices you've defined, which is useful when you want to prevent typos or limit input to a known set of valid answers.",
      zanComment: "select restricts the user to only the choices you give them. I would like this tag installed in several conversations I have had recently.",
      anatomy: [
        { text: "<select>", color: "#00f5c4", highlight: "#00f5c4", label: "<select>", explain: "Opens the dropdown container." },
        { text: "<option>Standard</option>", color: "#ffe94d", highlight: "#ffe94d", label: "<option>", explain: "One selectable choice. Text inside is what the user sees and picks." },
        { text: "</select>", color: "#00f5c4", highlight: "#00f5c4", label: "</select>", explain: "Closes the dropdown." },
      ],
      relevantTags: ["select", "option"],
      challenge: {
        id: "m7-select",
        instruction: "Write a `select` with two `option` items inside it: `Standard` and `Emergency`",
        relevantTags: ["select", "option"],
        check: (v) => {
          const n = v.toLowerCase().trim();
          if (!n) return "Type something";
          if (!/<select/.test(n)) return "Use the `select` tag";
          if ((n.match(/<option>/g) || []).length < 2) return "Add two `option` items inside the select";
          if (/<select>[\s\S]*<option>\s*standard\s*<\/option>[\s\S]*<option>\s*emergency\s*<\/option>[\s\S]*<\/select>/i.test(v)) return "pass";
          return "Check both option items match exactly: Standard and Emergency";
        },
        hint: "<select>\n  <option>Standard</option>\n  <option>Emergency</option>\n</select>",
      },
      drills: [
        { instruction: "Write a select with three options of your choice", check: (v) => (v.match(/<option>/gi) || []).length >= 3 && /<select>/i.test(v) && /<\/select>/i.test(v), answer: "<select>\n  <option>Low</option>\n  <option>Medium</option>\n  <option>High</option>\n</select>" },
      ],
    },
    {
      id: "checkbox",
      heading: "Checkbox — A Yes or No Input",
      body: "You already know `input` from the last mission, but `type` isn't limited to text. `type=\"checkbox\"` turns an `input` into a small clickable box the user can check or uncheck — perfect for a yes-or-no confirmation. A `checkbox` works best paired with a `label`, exactly like you learned before — matching `for` and `id` values so clicking the label text toggles the `checkbox` too. Is a `checkbox` the same as a `button`? No — a `button` triggers an action, a `checkbox` represents a state, either checked or unchecked, that gets included when a `form` is submitted. Will you always need a `label` with a `checkbox`? Not strictly, but without one, a user has no idea what they're confirming, so in practice, yes, almost always.",
      dialogueExchange: [
        { speaker: "luvek", name: "LUVEK", text: "There's a lot of different input types huh?" },
        { speaker: "zhan", name: "ZHAN", text: "Yes... a lot." },
      ],
      anatomy: [
        { text: '<input type="checkbox"', color: "#00f5c4", highlight: "#00f5c4", label: 'type="checkbox"', explain: "Turns the input into a clickable checkbox instead of a text field." },
        { text: ' id="confirm">', color: "#ffe94d", highlight: "#ffe94d", label: 'id="confirm"', explain: "Should match a label's for attribute." },
      ],
      relevantTags: ["label", "input"],
      challenge: {
        id: "m7-checkbox",
        instruction: 'Write a `label` with `for="confirm"` that says `I confirm this request is accurate` — then an `input` with `type="checkbox"` and matching `id="confirm"`',
        relevantTags: ["label", "input"],
        check: (v) => {
          const n = v.toLowerCase().trim();
          if (!n) return "Type something";
          const hasLabel = /<label[^>]*for="confirm"[^>]*>[\s\S]*i confirm this request is accurate[\s\S]*<\/label>/i.test(v);
          const hasCheckbox = /<input[^>]*type="checkbox"[^>]*id="confirm"[^>]*>/i.test(v) || /<input[^>]*id="confirm"[^>]*type="checkbox"[^>]*>/i.test(v);
          if (hasLabel && hasCheckbox) return "pass";
          if (!hasLabel) return 'Add the label with for="confirm"';
          if (!hasCheckbox) return 'Add the checkbox input with matching id="confirm"';
          return "Almost — check for and id match exactly: confirm";
        },
        hint: '<label for="confirm">I confirm this request is accurate</label>\n<input type="checkbox" id="confirm">',
      },
    },
    {
      id: "textarea",
      heading: "Textarea — A Bigger Text Box",
      body: "`textarea` is like `input type=\"text\"`, but built for longer answers — multiple lines instead of one. Unlike `input`, `textarea` is not a void element — it has an `opening tag`, `a closing tag`, and any `default text` goes between them, though it's often left empty and just uses `placeholder` instead, exactly like you learned with `input`. You have, in fact, been typing inside a `textarea` this entire game — every challenge box you've filled out so far has been one. Is that a coincidence? No — a large text-entry box for multi-line content is exactly what `textarea` was built for, whether that content is a `paragraph` of notes or, apparently, an entire HTML page. Will you use `textarea` often? Anywhere you need more than a single line — comments, descriptions, messages — `textarea` is the correct choice over `input`.",
      zanComment: "Boxes in boxes in boxes with buttons...",
      anatomy: [
        { text: "<textarea ", color: "#00f5c4", highlight: "#00f5c4", label: "<textarea>", explain: "Opens a multi-line text box. Not a void element." },
        { text: 'placeholder="Describe current condition">', color: "#ffe94d", highlight: "#ffe94d", label: 'placeholder="..."', explain: "Hint text shown before typing, same as input." },
        { text: "</textarea>", color: "#00f5c4", highlight: "#00f5c4", label: "</textarea>", explain: "Closes the textarea. It always needs a closing tag." },
      ],
      relevantTags: ["textarea"],
      challenge: {
        id: "m7-textarea",
        instruction: 'Write a `textarea` with `placeholder="Describe current condition"`',
        relevantTags: ["textarea"],
        check: (v) => {
          const n = v.toLowerCase().trim();
          if (!n) return "Type something";
          if (!/<textarea/.test(n)) return "Use the `textarea` tag";
          if (!/<\/textarea>/.test(n)) return "You opened `textarea` but didn't close it";
          if (/<textarea[^>]*placeholder="describe current condition"[^>]*>\s*<\/textarea>/i.test(v)) return "pass";
          return "Check the placeholder text matches exactly: Describe current condition";
        },
        hint: '<textarea placeholder="Describe current condition"></textarea>',
      },
      drills: [
        { instruction: "Write a textarea with any placeholder text of your choice", check: (v) => /<textarea[^>]*placeholder="[^"]{2,}"[^>]*>\s*<\/textarea>/i.test(v), answer: '<textarea placeholder="Enter your message"></textarea>' },
      ],
    },
    {
      id: "submit-button",
      heading: "Submit Button — Buttons That Belong to a Form",
      body: "You already know `<button>` from Mission 3. Inside a `form`, `button` gets a new `attribute` that matters: `type=\"submit\"`. This tells the browser that clicking this specific `button` should `submit` the entire `form` it belongs to. Without `type=\"submit\"`, a `button` inside a `form` actually defaults to a different behavior in some cases, so being explicit matters. Is `type=\"submit\"` required for a `button` to work at all? Visually, no — it'll still render and look clickable either way. Functionally, yes — it's what connects the `button` to the actual act of `submitting` the `form`'s data. We still won't cover what submitting actually does behind the scenes, since that requires a server, but the `button` itself is now correctly wired to the `form`'s intended action.",
      zanComment: "type=\"submit\" is what makes a button inside a form actually mean something. Every button before this point in the game has been, structurally speaking, decorative. I have been transmitting decorative buttons this entire time.",
      anatomy: [
        { text: "<button ", color: "#00f5c4", highlight: "#00f5c4", label: "<button", explain: "The button tag, same as Mission 3." },
        { text: 'type="submit">', color: "#ffe94d", highlight: "#ffe94d", label: 'type="submit"', explain: "Connects this button to submitting its parent form." },
        { text: "Send Configuration", color: "#c8f0ff", highlight: "#39ff14", label: "content", explain: "The button's visible text." },
        { text: "</button>", color: "#00f5c4", highlight: "#00f5c4", label: "</button>", explain: "Closes the button." },
      ],
      relevantTags: ["button"],
      challenge: {
        id: "m7-submit",
        instruction: 'Write a `button` with `type="submit"` that says `Send Configuration`',
        relevantTags: ["button"],
        check: (v) => {
          const n = v.toLowerCase().trim();
          if (!n) return "Type something";
          if (!/<button/.test(n)) return "Use the `button` tag";
          if (!/type\s*=\s*"submit"/i.test(n)) return 'Add type="submit"';
          if (/<button[^>]*type="submit"[^>]*>\s*send configuration\s*<\/button>/i.test(v)) return "pass";
          return "Check the button text matches exactly: Send Configuration";
        },
        hint: '<button type="submit">Send Configuration</button>',
      },
    },
  ],

  bossChallenge: {
    id: "m7-boss",
    zanComment: "Voss wants the full pod configuration in one transmission — dropdown, notes, confirmation checkbox, and a properly wired submit button. I have never wanted to disappoint someone I've never met this badly.",
    instruction: 'Build the full configuration form. Write: a `form` containing a `select` with two options `Standard` and `Emergency`. Then a `textarea` with `placeholder="Describe current condition"`. Then a `label` for=\"confirm\" that says `I confirm this request is accurate` with a matching `checkbox` input. Then a `button` with `type="submit"` that says `Send Configuration`',
    relevantTags: ["form", "select", "option", "textarea", "label", "input", "button"],
    check: (v) => {
      if (!v.trim()) return "Type something";
      const hasForm = /<form>[\s\S]*<\/form>/i.test(v);
      const hasSelect = /<select>[\s\S]*<option>\s*standard\s*<\/option>[\s\S]*<option>\s*emergency\s*<\/option>[\s\S]*<\/select>/i.test(v);
      const hasTextarea = /<textarea[^>]*placeholder="describe current condition"[^>]*>\s*<\/textarea>/i.test(v);
      const hasCheckbox = /<label[^>]*for="confirm"[^>]*>[\s\S]*i confirm this request is accurate[\s\S]*<\/label>[\s\S]*<input[^>]*type="checkbox"[^>]*id="confirm"[^>]*>/i.test(v) || /<label[^>]*for="confirm"[^>]*>[\s\S]*i confirm this request is accurate[\s\S]*<\/label>[\s\S]*<input[^>]*id="confirm"[^>]*type="checkbox"[^>]*>/i.test(v);
      const hasSubmit = /<button[^>]*type="submit"[^>]*>\s*send configuration\s*<\/button>/i.test(v);
      if (hasForm && hasSelect && hasTextarea && hasCheckbox && hasSubmit) return "pass";
      if (!hasForm) return "Wrap everything in a form tag";
      if (!hasSelect) return "Add the select with both options";
      if (!hasTextarea) return "Add the textarea with the correct placeholder";
      if (!hasCheckbox) return "Add the label and matching checkbox input";
      if (!hasSubmit) return "Add the submit button with the correct text";
      return "Almost — check every piece is there and matches exactly";
    },
    hint: '<form>\n  <select>\n    <option>Standard</option>\n    <option>Emergency</option>\n  </select>\n  <textarea placeholder="Describe current condition"></textarea>\n  <label for="confirm">I confirm this request is accurate</label>\n  <input type="checkbox" id="confirm">\n  <button type="submit">Send Configuration</button>\n</form>',
  },

  completionMessage: "Life pod controls upgraded. Voss has the full configuration. Voss responded with a single word: 'Acceptable.' Wooch said he's never seen Voss so emotional before.",
};