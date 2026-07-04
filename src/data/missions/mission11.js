export const mission11 = {
  id: 11,
  title: "Boot the Navigation Computer",
  subtitle: "Meta & Head",
  badge: "🧠",
  storyTag: "NAV BRAIN",
  atmosphere: "32 hours remaining",

  signalContribution: `<head>\n  <title>Distress Signal — StarBurner</title>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <meta name="description" content="Emergency transmission from the crashed vessel StarBurner. Rescue requested.">\n</head>`,

  storyIntro: [
    "The projector footage of Zorbin is the first real proof he's alive.",
    "The navigation computer came back online today, mostly. It boots, but it can't read anything — no page title, no character settings, nothing in its head. Every system on this ship apparently has a head and I did not know that until Mission 5.",
    "None of what I'm about to build will show up anywhere visible. Wooch says these invisible tags are like fine tuning a well built webpage. Sometimes i think Phantarians have too much pride in their webpages.",
    "Let's boot the brain.",
  ],

  slides: [
    {
      id: "title",
      heading: "Title — The Browser Tab Text",
      body: "`title` sets the text shown in the browser's tab, in bookmarks, and in search engine results as the clickable headline. It goes inside `head`, not `body`, and it never displays anywhere on the actual visible page — its entire job is representing the page everywhere except the page itself. This is different from an `h1`, which you already know displays directly on the page as the main visible `heading`. A page can have both: an `h1` that says something to the reader, and a completely different `title` that represents the page in a browser tab or a search result. Is title `required`? Technically a page will still load without one, but every real page has one — without it, browser tabs just show a blank label or the raw file URL, which looks broken and unprofessional. Will you see this render anywhere in the preview? No — this is genuinely invisible on the page itself. That's expected, not a bug.",
      zanComment: "Apparently the Validator will glow blue if it contains the correct inputs.",
      invisibleOutput: true,
      anatomy: [
        { text: "<title>", color: "#00f5c4", highlight: "#00f5c4", label: "<title>", explain: "Goes inside head. Never shows on the visible page itself." },
        { text: "Distress Signal — StarBurner", color: "#c8f0ff", highlight: "#39ff14", label: "content", explain: "Shows in the browser tab, bookmarks, and search results." },
        { text: "</title>", color: "#00f5c4", highlight: "#00f5c4", label: "</title>", explain: "Closes the title." },
      ],
      challenge: {
        id: "m11-title",
        instruction: "Write a `title` that says `Distress Signal — StarBurner`",
        relevantTags: ["title"],
        invisibleOutput: true,
        check: (v) => {
          const n = v.toLowerCase().trim();
          if (!n) return "Type something";
          if (!/<title/.test(n)) return "Use the `title` tag";
          if (!/<\/title>/.test(n)) return "You opened `title` but didn't close it";
          if (/<title>\s*distress signal\s*[—-]\s*starburner\s*<\/title>/i.test(v)) return "pass";
          return "Check the title text matches exactly: Distress Signal — StarBurner";
        },
        hint: "<title>Distress Signal — StarBurner</title>",
      },
    },
    {
      id: "meta-charset",
      heading: "Meta Charset — Character Encoding",
      body: "`meta` is a general-purpose `tag` for page metadata — information about the page that isn't content itself. Unlike most tags you've learned, `meta` is a void element with `no closing tag`, and it almost always needs a specific `attribute` to say what kind of metadata it actually is. The `charset` attribute tells the browser which character encoding the page uses — essentially, which system of rules translates raw file data into the letters, numbers, and symbols you actually see. `UTF-8` is the standard, near-universal choice — it correctly supports virtually every language and symbol in existence, including things like em dashes and accented letters. Is `charset` actually necessary? Yes, more than it might seem — without a correctly declared `charset`, special characters can render as garbled boxes or broken symbols instead of the actual character intended. Will you ever use anything other than `UTF-8`? Probably not — `UTF-8` is close to a permanent default at this point.",
      zanComment: "Invisible boxes for their ancient symbols. Primitive.",
      invisibleOutput: true,
      anatomy: [
        { text: "<meta ", color: "#00f5c4", highlight: "#00f5c4", label: "<meta", explain: "Void element. No closing tag. Needs a specific attribute to mean anything." },
        { text: 'charset="UTF-8">', color: "#ffe94d", highlight: "#ffe94d", label: 'charset="..."', explain: "Declares the character encoding. UTF-8 is the near-universal standard." },
      ],
      challenge: {
        id: "m11-charset",
        instruction: 'Write a `meta` tag with `charset="UTF-8"`',
        relevantTags: ["meta"],
        invisibleOutput: true,
        check: (v) => {
          const n = v.toLowerCase().trim();
          if (!n) return "Type something";
          if (!/<meta/.test(n)) return "Use the `meta` tag";
          if (/<meta[^>]*charset="utf-8"[^>]*>/i.test(v)) return "pass";
          return 'Check the charset value matches exactly: UTF-8';
        },
        hint: '<meta charset="UTF-8">',
      },
    },
    {
      id: "meta-viewport",
      heading: "Meta Viewport — Mobile Sizing",
      body: "This is the single most important `meta` tag for anything viewed on a phone, and you have technically been benefiting from a version of it this entire game. The `viewport` meta tag controls how a page scales on mobile devices. Without it, phones default to rendering pages as if they were full desktop screens, then zooming out to fit — resulting in tiny, unreadable text until a user manually pinches to zoom in. The `content` attribute here takes multiple `comma-separated values`. `width=device-width` tells the browser to match the page's `width` to the actual device's screen width, instead of a fixed desktop-sized default. `initial-scale=1.0` sets the starting zoom level to 100%, unscaled. Together, these two values are the standard configuration for any page meant to look correct on a phone without the user needing to zoom at all. Is this optional? In practice, no — nearly every real, professional website includes this exact line, because so much web traffic today happens on phones.",
      dialogueExchange: [
        { speaker: "wooch", name: "WOOCH", text: "If you had used the ship's viewport better we wouldn't be in this mess." },
        { speaker: "zhan", name: "ZHAN", text: "Thanks Wooch" },
      ],
      invisibleOutput: true,
      anatomy: [
        { text: "<meta ", color: "#00f5c4", highlight: "#00f5c4", label: "<meta", explain: "Same meta tag, different purpose based on the attribute used." },
        { text: 'name="viewport" ', color: "#ffe94d", highlight: "#ffe94d", label: 'name="viewport"', explain: "Specifies this meta tag controls mobile display sizing." },
        { text: 'content="width=device-width, initial-scale=1.0">', color: "#39ff14", highlight: "#39ff14", label: 'content="..."', explain: "Matches width to the device screen, starts at 100% zoom." },
      ],
      challenge: {
        id: "m11-viewport",
        instruction: 'Write a `meta` tag with `name="viewport"` and `content="width=device-width, initial-scale=1.0"`',
        relevantTags: ["meta"],
        invisibleOutput: true,
        check: (v) => {
          const n = v.toLowerCase().trim();
          if (!n) return "Type something";
          if (!/<meta/.test(n)) return "Use the `meta` tag";
          if (!/name\s*=\s*"viewport"/i.test(n)) return 'Add name="viewport"';
          if (/<meta[^>]*name="viewport"[^>]*content="width=device-width,\s*initial-scale=1\.0"[^>]*>/i.test(v) || /<meta[^>]*content="width=device-width,\s*initial-scale=1\.0"[^>]*name="viewport"[^>]*>/i.test(v)) return "pass";
          return "Check the content value matches exactly: width=device-width, initial-scale=1.0";
        },
        hint: '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
      },
      drills: [
        { instruction: 'Write the viewport meta tag one more time — name="viewport" and content="width=device-width, initial-scale=1.0"', check: (v) => /<meta[^>]*name="viewport"[^>]*content="width=device-width,\s*initial-scale=1\.0"[^>]*>/i.test(v) || /<meta[^>]*content="width=device-width,\s*initial-scale=1\.0"[^>]*name="viewport"[^>]*>/i.test(v), answer: '<meta name="viewport" content="width=device-width, initial-scale=1.0">' },
        { instruction: "Write the viewport meta tag again, from memory this time", check: (v) => /<meta[^>]*name="viewport"[^>]*content="width=device-width,\s*initial-scale=1\.0"[^>]*>/i.test(v) || /<meta[^>]*content="width=device-width,\s*initial-scale=1\.0"[^>]*name="viewport"[^>]*>/i.test(v), answer: '<meta name="viewport" content="width=device-width, initial-scale=1.0">' },
      ],
    },
    {
      id: "meta-description",
      heading: "Meta Description — The Search Result Preview",
      body: "One more version of `meta`: `name=\"description\"`. This one controls the short summary text that often appears beneath your page's `title` in search engine results — the preview snippet someone reads before deciding whether to click your link. Unlike `title`, which is a short label, `description` is meant to be a genuine one or two sentence summary of what the page actually contains. Search engines don't always use your exact description text — sometimes they pull different text from the page instead — but providing a well-written one significantly improves your odds of it being used, and gives you more control over how your page is represented. Is this required for a page to function? No, not technically. But for anything meant to be found and understood at a glance in search results, it's considered standard, professional practice.",
      zanComment: "description is a pitch. A one-sentence pitch for why anyone should click on this page instead of scrolling past it. I guess being shipwrecked on another planet isn't convincing enough.",
      invisibleOutput: true,
      anatomy: [
        { text: "<meta ", color: "#00f5c4", highlight: "#00f5c4", label: "<meta", explain: "Same meta tag again, different purpose." },
        { text: 'name="description" ', color: "#ffe94d", highlight: "#ffe94d", label: 'name="description"', explain: "Specifies this meta tag is the search result summary." },
        { text: 'content="Emergency transmission...">', color: "#39ff14", highlight: "#39ff14", label: 'content="..."', explain: "The actual one or two sentence summary text." },
      ],
      challenge: {
        id: "m11-description",
        instruction: 'Write a `meta` tag with `name="description"` and `content="Emergency transmission from the crashed vessel StarBurner. Rescue requested."`',
        relevantTags: ["meta"],
        invisibleOutput: true,
        check: (v) => {
          const n = v.toLowerCase().trim();
          if (!n) return "Type something";
          if (!/<meta/.test(n)) return "Use the `meta` tag";
          if (!/name\s*=\s*"description"/i.test(n)) return 'Add name="description"';
          if (/<meta[^>]*name="description"[^>]*content="emergency transmission from the crashed vessel starburner\. rescue requested\."[^>]*>/i.test(v) || /<meta[^>]*content="emergency transmission from the crashed vessel starburner\. rescue requested\."[^>]*name="description"[^>]*>/i.test(v)) return "pass";
          return "Check the content value matches exactly";
        },
        hint: '<meta name="description" content="Emergency transmission from the crashed vessel StarBurner. Rescue requested.">',
      },
      drills: [
        { instruction: 'Write a meta tag with name="description" and any content text of your choice', check: (v) => /<meta[^>]*name="description"[^>]*content="[^"]{10,}"[^>]*>/i.test(v) || /<meta[^>]*content="[^"]{10,}"[^>]*name="description"[^>]*>/i.test(v), answer: '<meta name="description" content="A distress signal built entirely with HTML.">' },
      ],
    },
  ],

  bossChallenge: {
    id: "m11-boss",
    zanComment: "The navigation computer wants its entire head restored at once — title, charset, viewport, and description, correctly configured, none of it visible, all of it apparently essential. I have made my peace with this contradiction.",
    instruction: 'Restore the full head section. Write: a `title` that says `Navigation Computer — StarBurner`. A `meta` with `charset="UTF-8"`. A `meta` with `name="viewport"` and `content="width=device-width, initial-scale=1.0"`. A `meta` with `name="description"` and `content="Emergency transmission from the crashed vessel StarBurner. Rescue requested."`',
    relevantTags: ["title", "meta"],
    invisibleOutput: true,
    check: (v) => {
      if (!v.trim()) return "Type something";
      const hasTitle = /<title>\s*navigation computer\s*[—-]\s*starburner\s*<\/title>/i.test(v);
      const hasCharset = /<meta[^>]*charset="utf-8"[^>]*>/i.test(v);
      const hasViewport = /<meta[^>]*name="viewport"[^>]*content="width=device-width,\s*initial-scale=1\.0"[^>]*>/i.test(v) || /<meta[^>]*content="width=device-width,\s*initial-scale=1\.0"[^>]*name="viewport"[^>]*>/i.test(v);
      const hasDescription = /<meta[^>]*name="description"[^>]*content="emergency transmission from the crashed vessel starburner\. rescue requested\."[^>]*>/i.test(v) || /<meta[^>]*content="emergency transmission from the crashed vessel starburner\. rescue requested\."[^>]*name="description"[^>]*>/i.test(v);
      if (hasTitle && hasCharset && hasViewport && hasDescription) return "pass";
      if (!hasTitle) return "Check the title tag";
      if (!hasCharset) return "Check the charset meta tag";
      if (!hasViewport) return "Check the viewport meta tag";
      if (!hasDescription) return "Check the description meta tag";
      return "Almost — check all four pieces match exactly";
    },
    hint: '<title>Navigation Computer — StarBurner</title>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<meta name="description" content="Emergency transmission from the crashed vessel StarBurner. Rescue requested.">',
  },

  completionMessage: "Navigation computer booted. Nothing about this mission produced anything I could see.",
};