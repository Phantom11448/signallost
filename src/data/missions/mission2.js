export const mission2 = {
  id: 2,
  title: "Restore the Nav System",
  subtitle: "Links & Images",
  badge: "🛸",
  storyTag: "NAV MODULE",
  atmosphere: "68 hours remaining",

  signalContribution: `<h2>Visual Evidence — Regulation 4,112 Compliance</h2>\n<img src="crashsite.jpg" alt="The StarBurner crashed in a field near Magnolia Texas at night. Hull breach visible on port side. Smoke rising from engine compartment.">\n<a href="https://maps.google.com">Crash site coordinates — somewhere near the big white star flag place</a>`,
  bugExcerpt: `<img src="crashsite.jpg" alt="The StarBurner crashed in a field near Magnolia Texas">\n<a href="https://rescue.phantar">Contact Phantar</a>`,

  storyIntro: [
    "Good news: Phantar received my heading and paragraph.",
    "Bad news: They rejected the transmission anyway.",
    "Reason: visual confirmation required before any rescue vessel can be dispatched. Phantar Regulation 4,112. I looked it up. It is real. Someone wrote an entire regulation about this.",
    "They need a photo of the crash site. And a link to my coordinates. As proof that I actually crashed.",
    "I am transmitting from the wreckage. The wreckage is on fire. But sure. Let me get you a photo.",
    "Also Gerald is gone. I don't know where Gerald went. I've added it to my list of concerns.",
  ],

  slides: [
    {
      id: "attributes",
      relevantTags: ["a"],
      heading: "Attributes — Extra Instructions Inside Tags",
      body: "Some tags need extra instructions — like a shipping label that says FRAGILE or THIS SIDE UP. Those extra instructions are called attributes. They live inside the opening tag and always follow this exact pattern: `name='value'`. The name says what kind of instruction it is. The value in quotes says what that instruction actually is. The quotes are not optional — leave them out and the browser gets confused. Attributes only go in the opening tag, never the closing tag. You will use attributes constantly — almost every interesting HTML element needs at least one. The two most important ones you are about to learn are href for links and src for images.",
      zanComment: "Attributes go inside the opening tag. Name equals value in quotes. I wrote that down. With a pen. I feel like an archaeologist discovering ancient tools.",
      anatomy: [
        { text: "<a ", color: "#00f5c4", highlight: "#00f5c4", label: "<a", explain: "Opens a link tag. a stands for anchor — like anchoring your page to another location." },
        { text: 'href="https://rescue.phantar"', color: "#ffe94d", highlight: "#ffe94d", label: 'href="..."', explain: "An attribute. href = hypertext reference. The address of where the link goes." },
        { text: ">", color: "#00f5c4", highlight: "#00f5c4", label: ">", explain: "Closes the opening tag. Link content starts now." },
        { text: "Contact Phantar", color: "#c8f0ff", highlight: "#a98dff", label: "link text", explain: "The words users see and click on the page." },
        { text: "</a>", color: "#00f5c4", highlight: "#00f5c4", label: "</a>", explain: "Closes the link tag." },
      ],
      challenge: {
        id: "m2-attributes",
        relevantTags: ["a"],
        instruction: "Write a link that goes to https://rescue.phantar and says: Contact Phantar",
        check: (v) => {
          const n = v.toLowerCase().trim();
          if (!n) return "Type something";
          if (!/<a/.test(n)) return "Use the <a> tag for links";
          if (/<a/.test(n) && !/<\/a>/.test(n)) return "You opened the link but didn't close it — add </a> at the end";
          if (!/href/.test(n)) return "Links need an href attribute — that's where you put the address";
          if (/href/.test(n) && !/phantar/.test(n)) return "Check your href value — it should be https://rescue.phantar";
          if (/<a[^>]*href="https:\/\/rescue\.phantar"[^>]*>\s*contact phantar\s*<\/a>/i.test(v)) return "pass";
          return "Almost — check the href address and the link text match exactly";
        },
        hint: '<a href="https://rescue.phantar">Contact Phantar</a>',
      },
    },
    {
      id: "images",
      relevantTags: ["img"],
      heading: "Images — Hanging Photos on the Wall",
      body: "Adding an image is like taping a photo to a wall. The `src` attribute is the address of where the photo lives — either on your computer or somewhere on the internet. `src` stands for source. The `alt` attribute is a written description of the image for people who cannot see it — maybe they are blind and using a screen reader, or maybe the image failed to load. `alt` stands for alternative text. Always include both. The `img` tag is special — it is what we call a void element or self-closing tag. It has no content to wrap so it has no closing tag. It just stands alone. You will see some people write it as img /> with a slash at the end — that is from an older style called XHTML and it still works but is not required in modern HTML. Is alt text really necessary? Yes — and not just for accessibility. Alt text shows up when images fail to load, helps Google understand your images, and is legally required in many countries for public websites.",
      zanComment: "The img tag has no closing tag. It just ends. Just like that. I spent ten minutes looking for where the closing tag goes. There is no closing tag. It just ends. Moving on.",
      anatomy: [
        { text: "<img ", color: "#00f5c4", highlight: "#00f5c4", label: "<img", explain: "The image tag. No closing tag needed — img is a void element." },
        { text: 'src="crashsite.jpg"', color: "#ffe94d", highlight: "#ffe94d", label: 'src="..."', explain: "Source — where the image file lives. Could be a filename or a full web address." },
        { text: ' alt="crashed ship"', color: "#39ff14", highlight: "#39ff14", label: 'alt="..."', explain: "Alternative text — describes the image for screen readers and when images fail to load." },
        { text: ">", color: "#00f5c4", highlight: "#00f5c4", label: ">", explain: "Closes the tag. No </img> needed." },
      ],
      challenge: {
        id: "m2-images",
        relevantTags: ["img"],
        instruction: 'Write an image tag with src="crashsite.jpg" and alt="The StarBurner crashed in a Texas field"',
        check: (v) => {
          const n = v.toLowerCase().trim();
          if (!n) return "Type something";
          if (!/<img/.test(n)) return "Use the <img> tag for images";
          if (!/src/.test(n)) return "Images need a src attribute — that's where the image file is";
          if (!/alt/.test(n)) return "Images need an alt attribute too — describe what the image shows";
          if (
            /<img[^>]*src="crashsite\.jpg"[^>]*alt="the starburnner crashed in a texas field"[^>]*>/i.test(v) ||
            /<img[^>]*alt="the starburnner crashed in a texas field"[^>]*src="crashsite\.jpg"[^>]*>/i.test(v) ||
            /<img[^>]*src="crashsite\.jpg"[^>]*alt="[^"]*starburnner[^"]*"[^>]*>/i.test(v) ||
            /<img[^>]*src="crashsite\.jpg"[^>]*alt="[^"]*crashed[^"]*"[^>]*>/i.test(v)
          ) return "pass";
          return "Check your src and alt values match what's asked";
        },
        hint: '<img src="crashsite.jpg" alt="The StarBurner crashed in a Texas field">',
      },
      drills: [
        { relevantTags: ["img"], instruction: 'Write an image with src="crew.jpg" and alt="Zhan Wooch and Luvek standing outside the crashed StarBurner"', check: (v) => /<img[^>]*src="crew\.jpg"[^>]*>/i.test(v) && /alt/i.test(v), answer: '<img src="crew.jpg" alt="Zhan Wooch and Luvek standing outside the crashed StarBurner">' },
        { relevantTags: ["img"], instruction: 'Write an image with src="zorbin.jpg" and a descriptive alt text about Zorbin being missing', check: (v) => /<img[^>]*src="zorbin\.jpg"[^>]*alt="[^"]{10,}"[^>]*>/i.test(v), answer: '<img src="zorbin.jpg" alt="Navigator Zorbin last seen before the crash missing since impact">' },
        { relevantTags: ["img"], instruction: "Write an image of anything — make up a filename and write a proper descriptive alt text", check: (v) => /<img[^>]*src="[^"]+"[^>]*alt="[^"]{10,}"[^>]*>/i.test(v), answer: '<img src="texas-night.jpg" alt="The Texas countryside at night where the StarBurner crash landed">' },
      ],
    },
    {
      id: "combining",
      relevantTags: ["h2", "img", "a"],
      heading: "Putting It Together",
      body: "You now know two of the most important tags in HTML — links and images. Here is what they look like combined on a real page. Notice that the img tag sits inside a paragraph tag — that is perfectly fine. Tags can go inside other tags. The technical term for this is nesting and you will do it constantly. The only rule is that inner tags must close before outer tags close. We will cover nesting in much more detail in Mission 4.",
      zanComment: "Links and images. That's how the entire internet works. Billions of dollars of infrastructure and it's just links and images all the way down. I need to call my grandfather.",
      codeBlock: `<h2>Visual Evidence</h2>\n<img src="crashsite.jpg" alt="The StarBurner crashed in a field near Magnolia Texas">\n<p>\n  <a href="https://maps.google.com">View crash site coordinates</a>\n</p>`,
      challenge: {
        id: "m2-combining",
        relevantTags: ["h2", "img", "a"],
        instruction: 'Write an `h2` that says: Crash Site Evidence — then an image with `src="crashsite.jpg"` and any descriptive `alt` text — then a `link` to `https://maps.google.com` that says: View coordinates',
        check: (v) => {
          const n = v.toLowerCase();
          if (!n.trim()) return "Type something";
          const hasH2 = /<h2>\s*crash site evidence\s*<\/h2>/i.test(v);
          const hasImg = /<img[^>]*src="crashsite\.jpg"[^>]*alt="[^"]{5,}"[^>]*>/i.test(v);
          const hasLink = /<a[^>]*href="https:\/\/maps\.google\.com"[^>]*>\s*view coordinates\s*<\/a>/i.test(v);
          if (hasH2 && hasImg && hasLink) return "pass";
          if (!hasH2) return "Start with an h2 heading that says: Crash Site Evidence";
          if (!hasImg) return "Add an img tag with src='crashsite.jpg' and a descriptive alt";
          if (!hasLink) return "Add a link to https://maps.google.com that says: View coordinates";
          return "Almost — check all three elements are there";
        },
        hint: '<h2>Crash Site Evidence</h2>\n<img src="crashsite.jpg" alt="The StarBurner crashed in a Texas field at night">\n<a href="https://maps.google.com">View coordinates</a>',
      },
    },
  ],

  bossChallenge: {
    id: "m2-boss",
    relevantTags: ["a", "img", "h2"],
    zanComment: "Regulation 4,112 requires visual confirmation AND coordinate access in the same transmission block. I have read Regulation 4,112 four times. It is as bad as it sounds. Let's just do it.",
    instruction: "Build the complete visual evidence section. Write: an `h2` that says `Visual Evidence — Regulation 4,112 Compliance`. Then an `img` with `src='crashsite.jpg'` and a detailed `alt` description. Then a `link` to `https://maps.google.com` that says: `Crash site coordinates — somewhere near the big white star flag place`",
    check: (v) => {
      if (!v.trim()) return "Type something";
      const hasH2 = /<h2>[\s\S]*visual evidence[\s\S]*<\/h2>/i.test(v);
      const hasImg = /<img[^>]*src="crashsite\.jpg"[^>]*alt="[^"]{10,}"[^>]*>/i.test(v);
      const hasLink = /<a[^>]*href="https:\/\/maps\.google\.com"[^>]*>[\s\S]*coordinates[\s\S]*<\/a>/i.test(v);
      if (hasH2 && hasImg && hasLink) return "pass";
      if (!hasH2) return "Start with the h2 heading — Visual Evidence — Regulation 4,112 Compliance";
      if (!hasImg) return "Add the crashsite.jpg image with a detailed alt description";
      if (!hasLink) return "Add the coordinates link to https://maps.google.com";
      return "Almost — check all three elements match";
    },
    hint: '<h2>Visual Evidence — Regulation 4,112 Compliance</h2>\n<img src="crashsite.jpg" alt="The StarBurner crashed in a field near Magnolia Texas at night hull breach visible">\n<a href="https://maps.google.com">Crash site coordinates — somewhere near the big white star flag place</a>',
  },

  completionMessage: "Nav module restored. Phantar has visual confirmation of the crash. They believe you now. Regulation 4,112 has been satisfied. Gerald has reappeared. Gerald is fine. I did not ask Gerald where it went.",
};