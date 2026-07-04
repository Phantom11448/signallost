export const mission12 = {
  id: 12,
  title: "Repair the Universal Translator",
  subtitle: "Accessibility",
  badge: "♿",
  storyTag: "TRANSLATOR MODULE",
  atmosphere: "28 hours remaining",

  signalContribution: `<h2>Signal Controls</h2>\n<button aria-label="Replay distress transmission">Replay</button>\n<img src="crashsite.jpg" alt="" aria-hidden="true">\n<p>Transmission visual confirmed above. See written report for details.</p>`,

  storyIntro: [
    "Head restored. Wooch confirmed the navigation computer boots clean now, invisible parts and all.",
    "New system: the universal translator. This technology will read parts of our distress signal to the rescuing pilots, similar to a screen-reader.",
    "Some of what's on this page is decoration. A repeated icon, an image that's already fully explained elsewhere in text. Phantar wants those specifically hidden from the pilots, not described twice. And some of what's on this page has no visible label at all — just a button with a symbol on it. Those need an invisible label a human reader can't see, but a translator can.",
    "This entire mission is about the parts of the page nobody sees but somebody, hopefully, hears.",
  ],

  slides: [
    {
      id: "aria-label",
      heading: "Aria-Label — Labeling the Unlabeled",
      body: "Sometimes a `button` or `link` doesn't have enough visible text to fully explain what it does on its own — or in the most common real-world case, no visible text at all, just an icon. `aria-label` is an `attribute` you add directly to an element to provide a fuller, more descriptive name specifically for assistive technology. It never displays visually on the page — sighted users only see whatever text or icon is already there. Screen reader users hear the `aria-label` text read aloud instead, in place of whatever's visible. Is `aria-label` the same as `alt` text? Similar idea, different job — `alt` is specifically for images, `aria-label` works on almost any element, especially interactive ones like `buttons` and `links`. Will you need this often? Most commonly on icon-only buttons with no text at all, but it's also useful anywhere the visible text alone doesn't fully explain the action.",
      zanComment: "We need to make sure the pilots aren't distracted flying 40mph in the left lane. Certain page elements will need to be read aloud. Or intentionally skipped over.",
      anatomy: [
        { text: "<button ", color: "#00f5c4", highlight: "#00f5c4", label: "<button", explain: "The button tag, same as before." },
        { text: 'aria-label="Replay distress transmission">', color: "#ffe94d", highlight: "#ffe94d", label: 'aria-label="..."', explain: "Invisible text, read aloud by screen readers only." },
        { text: "Replay", color: "#c8f0ff", highlight: "#39ff14", label: "visible content", explain: "The visible button text — still gets a fuller aria-label for assistive technology." },
        { text: "</button>", color: "#00f5c4", highlight: "#00f5c4", label: "</button>", explain: "Closes the button." },
      ],
      challenge: {
        id: "m12-aria-label",
        instruction: 'Write a `button` with `aria-label="Replay distress transmission"` containing the text `Replay`',
        relevantTags: ["button"],
        check: (v) => {
          const n = v.toLowerCase().trim();
          if (!n) return "Type something";
          if (!/<button/.test(n)) return "Use the `button` tag";
          if (!/aria-label/i.test(n)) return "Add the `aria-label` attribute";
          if (/<button[^>]*aria-label="replay distress transmission"[^>]*>\s*replay\s*<\/button>/i.test(v)) return "pass";
          return "Check the aria-label text matches exactly and the Replay text is inside the button";
        },
        hint: '<button aria-label="Replay distress transmission">Replay</button>',
      },
      drills: [
        { instruction: 'Write a button with aria-label="Mute transmission" containing the text Mute', check: (v) => /<button[^>]*aria-label="mute transmission"[^>]*>\s*mute\s*<\/button>/i.test(v), answer: '<button aria-label="Mute transmission">Mute</button>' },
      ],
    },
    {
      id: "decorative-alt",
      heading: "Empty Alt — Marking an Image as Decorative",
      body: "You already know `alt` from Mission 2 — a written description for images. But sometimes an image is purely decorative, adding no actual information a reader needs — maybe it's already fully explained elsewhere in text, or it's just a repeated visual flourish. For those specific cases, the correct `alt` value is an empty string: `alt=\"\"`. This is not a mistake or an oversight — it's a deliberate signal to screen readers to skip this image entirely and move on, instead of announcing something like 'image' with no useful context, which just adds noise. Is leaving `alt` off entirely the same as `alt=\"\"`? No — leaving it off is genuinely a mistake, since some screen readers will announce the raw filename instead, which is worse than nothing. `alt=\"\"` is a specific, correct choice, not a shortcut. When should you use it? Only when an image is truly decorative and adds zero new information — if it conveys any real content or meaning, it still needs a real description, exactly like you learned before.",
      zanComment: "alt=\"\" on purpose is correct. alt missing entirely is a mistake. These look almost identical and mean completely different things. This feels like a trap.",
      anatomy: [
        { text: "<img ", color: "#00f5c4", highlight: "#00f5c4", label: "<img", explain: "Same img tag as before." },
        { text: 'src="begin.png" ', color: "#ffe94d", highlight: "#ffe94d", label: 'src="..."', explain: "Same as always." },
        { text: 'alt="">', color: "#39ff14", highlight: "#39ff14", label: 'alt=""', explain: "Deliberately empty — signals this image is decorative, skip it." },
      ],
      challenge: {
        id: "m12-decorative-alt",
        instruction: 'Write an `img` with `src="begin.png"` and a deliberately empty `alt=""`',
        relevantTags: ["img"],
        check: (v) => {
          const n = v.toLowerCase().trim();
          if (!n) return "Type something";
          if (!/<img/.test(n)) return "Use the `img` tag";
          if (!/src\s*=\s*"begin\.png"/i.test(n)) return 'Add src="begin.png"';
          if (/<img[^>]*src="begin\.png"[^>]*alt=""[^>]*>/i.test(v) || /<img[^>]*alt=""[^>]*src="begin\.png"[^>]*>/i.test(v)) return "pass";
          return 'Check alt is present and deliberately empty: alt=""';
        },
        hint: '<img src="begin.png" alt="">',
      },
    },
    {
      id: "aria-hidden",
      heading: "Aria-Hidden — Hiding Any Element From Screen Readers",
      body: "`aria-hidden=\"true\"` extends the same idea as `alt=\"\"` to any element, not just images. It tells assistive technology to completely skip this element and everything inside it, even though it remains fully visible on the page for sighted users. This is useful for purely decorative elements that aren't images — a decorative icon next to text that already says the same thing, a visual flourish with zero informational value. Is this the same as hiding something visually? No — visually hidden and `aria-hidden` are two completely different concepts. An element with `aria-hidden=\"true\"` still displays exactly as normal on the page. Only screen readers skip it; sighted users see no difference at all. When should you use it? Specifically when something is visually present but would be redundant, confusing, or meaningless if read aloud on its own — like an icon that duplicates text already sitting right next to it.",
      zanComment: "aria-hidden hides something from screen readers while it stays completely visible to everyone else. Present for one audience, invisible to another.",
      anatomy: [
        { text: "<img ", color: "#00f5c4", highlight: "#00f5c4", label: "<img", explain: "Works on img, but also any other element." },
        { text: 'src="crashsite.jpg" alt="" ', color: "#ffe94d", highlight: "#ffe94d", label: 'src / alt=""', explain: "Already marked decorative through empty alt." },
        { text: 'aria-hidden="true">', color: "#39ff14", highlight: "#39ff14", label: 'aria-hidden="true"', explain: "Fully skips this element for screen readers, even though it's still visible." },
      ],
      challenge: {
        id: "m12-aria-hidden",
        instruction: 'Write an `img` with `src="crashsite.jpg"`, `alt=""`, and `aria-hidden="true"`',
        relevantTags: ["img"],
        check: (v) => {
          const n = v.toLowerCase().trim();
          if (!n) return "Type something";
          if (!/<img/.test(n)) return "Use the `img` tag";
          if (!/aria-hidden\s*=\s*"true"/i.test(n)) return 'Add aria-hidden="true"';
          if (/<img[^>]*src="crashsite\.jpg"[^>]*alt=""[^>]*aria-hidden="true"[^>]*>/i.test(v) ||
              /<img[^>]*alt=""[^>]*aria-hidden="true"[^>]*src="crashsite\.jpg"[^>]*>/i.test(v) ||
              /<img[^>]*aria-hidden="true"[^>]*src="crashsite\.jpg"[^>]*alt=""[^>]*>/i.test(v) ||
              /<img[^>]*src="crashsite\.jpg"[^>]*aria-hidden="true"[^>]*alt=""[^>]*>/i.test(v)) return "pass";
          return "Check all three attributes are present: src, empty alt, and aria-hidden";
        },
        hint: '<img src="crashsite.jpg" alt="" aria-hidden="true">',
      },
    },
  ],

  bossChallenge: {
    id: "m12-boss",
    zanComment: "The translator wants the full signal controls section — the icon button correctly labeled, the decorative image correctly hidden, and the report text explaining what the image already showed. All three working together, for two audiences at once.",
    instruction: 'Build the full signal controls section. Write: a `button` with `aria-label="Replay distress transmission"` containing `Replay`. Then an `img` with `src="wooch.png"`, `alt=""`, and `aria-hidden="true"`. Then a `p` that says `Transmission visual confirmed above. See written report for details.`',
    relevantTags: ["button", "img", "p"],
    check: (v) => {
      if (!v.trim()) return "Type something";
      const hasButton = /<button[^>]*aria-label="replay distress transmission"[^>]*>\s*replay\s*<\/button>/i.test(v);
      const hasImg = /<img[^>]*src="wooch\.png"[^>]*alt=""[^>]*aria-hidden="true"[^>]*>/i.test(v) ||
                     /<img[^>]*alt=""[^>]*aria-hidden="true"[^>]*src="wooch\.png"[^>]*>/i.test(v) ||
                     /<img[^>]*aria-hidden="true"[^>]*src="wooch\.png"[^>]*alt=""[^>]*>/i.test(v) ||
                     /<img[^>]*src="wooch\.png"[^>]*aria-hidden="true"[^>]*alt=""[^>]*>/i.test(v);
      const hasP = /<p>[\s\S]*transmission visual confirmed above\. see written report for details\.[\s\S]*<\/p>/i.test(v);
      if (hasButton && hasImg && hasP) return "pass";
      if (!hasButton) return "Check the button and its aria-label";
      if (!hasImg) return "Check the img — src, empty alt, and aria-hidden";
      if (!hasP) return "Check the paragraph text matches exactly";
      return "Almost — check all three pieces match exactly";
    },
    hint: '<button aria-label="Replay distress transmission">Replay</button>\n<img src="wooch.png" alt="" aria-hidden="true">\n<p>Transmission visual confirmed above. See written report for details.</p>',
  },

  completionMessage: "Translator repaired. Every part of this transmission now works whether it's seen or heard. Luvek says this is the part of the ship she's proudest we fixed. I did not expect that. I am not going to say anything about it. I am just going to note that she said it.",
};