// GöÇGöÇ MISSION DATA GöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇ
// Each mission builds a section of Zhan's distress signal page.
// The cumulative HTML is stored in order and rendered in SignalPage.

export const MISSIONS_DATA = [
  {
    id: 1,
    title: "Boot the Terminal",
    subtitle: "Tags & Headings",
    badge: "=ƒôí",
    storyTag: "ANTENNA MODULE",
    atmosphere: "72 hours remaining",

    // What this mission adds to the distress signal page
    signalContribution: `<h1>DISTRESS SIGNAL GÇö StarBurner</h1>\n<p>Crash landed near Magnolia Texas. Hull breach on port side. Atmosphere at critical levels.</p>`,

    storyIntro: [
      "Okay. The StarBurner is down. Wooch and Luvek are alive. Zandek and Toch didn't make it.",
      "Zorbin is missing. I have marked him as 'unavailable' in the crew manifest for now. We will update this field later.",
      "The atmosphere generator is failing. I have maybe 72 hours of breathable air left. Earth's atmosphere is toxic to Phantarians. I cannot open the hatch. There is a cow looking at me through the window. I am not going to think about the cow.",
      "I've been scanning every communication system on this ship. Everything is destroyed. Everything except one ancient protocol that somehow survived the crash.",
      "HTML.",
      "My grandfather used to build websites with this. I laughed at him. I called it primitive. I called it embarrassing. He tried to teach me once and I told him I had more important things to do. I did not. As it turns out.",
      "Phantar's validator will only accept a properly built HTML page as a distress signal. Every tag has to be correct. One mistake and the transmission gets rejected.",
      "No pressure. Let's start.",
    ],

    slides: [
      {
        id: "what-is-html",
        heading: "What Even Is HTML?",
        body: "HTML stands for HyperText Markup Language. Let's break that down because it actually means something. HyperText means text that links to other text GÇö that's what makes the web a web instead of just a bunch of separate documents. Markup means you're adding labels to your content to describe what it is. Language means it has rules and syntax you have to follow. So HTML is literally: a set of rules for labeling your content so browsers know what to display and how. Every single webpage you have ever visited GÇö every news article, every social media post, every online store GÇö is built on HTML. It is the foundation of everything on the internet. Is HTML a programming language? Technically no GÇö and this matters. HTML describes content, it does not perform logic. You cannot do math in HTML or make decisions. That comes later when you learn JavaScript. HTML just says: this is a heading, this is a paragraph, this is an image. The browser does the rest.",
        zanComment: "I have just learned that HTML is not a programming language. I spent 140 years making fun of my grandfather for something that is not even a real programming language. I need a moment.",
        challenge: {
          id: "m1-what-is-html",
          instruction: "HTML stands for three words. Type them out GÇö just to confirm you read that.",
          check: (v) => {
            const n = v.toLowerCase();
            if (n.includes("hypertext") && n.includes("markup") && n.includes("language")) return "pass";
            return "Type the three words HTML stands for GÇö they're in the text above";
          },
          hint: "HyperText Markup Language",
        },
      },
      {
        id: "tags",
        heading: "Tags GÇö The Label Gun of the Web",
        body: "Think of HTML tags like a label gun at a warehouse. You wrap a label around something so everyone knows what it is. Every tag has two parts GÇö an opening tag that says where it starts, and a closing tag that says where it ends. The closing tag is identical to the opening tag but with a forward slash before the name. Everything between the opening and closing tag is the content. The tag name tells the browser what kind of content this is. h1 means Heading Level 1. p means paragraph. button means a clickable button. They all follow the exact same pattern: open it, put your content in, close it. Is this the only pattern? Almost GÇö you will learn later that some tags are self-closing and do not need a closing tag at all. We will cover those when we get to images in Mission 2.",
        zanComment: "Open tag. Content. Close tag. That's it. That's the whole thing. My grandfather built entire websites with this. I'm going to have to call him when I get home. This is going to be a very uncomfortable conversation.",
        anatomy: [
          { text: "<h1>", color: "#ffe94d", highlight: "#ffe94d", label: "<h1> opening tag", explain: "Opens the tag. h1 = Heading Level 1. The most important heading on the page." },
          { text: "DISTRESS SIGNAL", color: "#c8f0ff", highlight: "#39ff14", label: "content", explain: "Whatever you want to display. This is what users actually see on the page." },
          { text: "</h1>", color: "#ffe94d", highlight: "#ffe94d", label: "</h1> closing tag", explain: "Closes the tag. The / means this tag ends here. Must match the opening tag." },
        ],
        challenge: {
          id: "m1-tags",
          instruction: "Write any HTML tag wrapping any word. h1, p, h2 GÇö anything. Just show me you understand the open-content-close pattern.",
          check: (v) => {
            const n = v.toLowerCase().trim();
            if (!n) return "Type something GÇö any tag wrapping any word";
            if (/<([a-z][a-z0-9]*)>[^<]+<\/\1>/.test(n)) return "pass";
            if (/<[a-z]+>/.test(n) && !/<\/[a-z]+>/.test(n)) return "You opened a tag but forgot to close it GÇö add </ and the tag name and >";
            return "Try wrapping a word in a tag GÇö like <h1>Hello</h1>";
          },
          hint: "<h1>Hello</h1> or <p>anything you want</p>",
        },
      },
      {
        id: "h1",
        heading: "Headings GÇö h1 Through h6",
        body: "There are six heading tags in HTML GÇö h1, h2, h3, h4, h5, and h6. h1 is the biggest and most important. h6 is the smallest. Think of it like a newspaper GÇö the giant headline at the top is h1, the section titles are h2, the article subheadings are h3, and so on. The browser automatically sizes them GÇö h1 is huge, h6 is barely bigger than regular text. You control exactly how they look later with CSS. One important rule: use only ONE h1 per page. That is your main title GÇö the most important thing on the page. Search engines like Google read your h1 to understand what your page is about. Multiple h1 tags confuse both Google and screen readers. Will you use all six? Probably not often. h1, h2, and h3 cover 90% of real projects. But they all exist and they all work the same way.",
        zanComment: "Six heading sizes. The browser makes them different sizes automatically. I could have figured this out years ago. I chose not to. That was a mistake that is currently costing me oxygen.",
        anatomy: [
          { text: "<h1>", color: "#ffe94d", highlight: "#ffe94d", label: "<h1>", explain: "Heading Level 1 GÇö biggest, most important. One per page only." },
          { text: "Main Title", color: "#c8f0ff", highlight: "#39ff14", label: "content", explain: "Your page's main title. Google reads this to understand your page." },
          { text: "</h1>", color: "#ffe94d", highlight: "#ffe94d", label: "</h1>", explain: "Closes the h1. Always close what you open." },
        ],
        challenge: {
          id: "m1-h1",
          instruction: "Write the main heading for Zhan's distress signal. Write an h1 that says: DISTRESS SIGNAL GÇö StarBurner",
          check: (v) => {
            if (!v.trim()) return "Type something";
            if (/<h1>\s*distress signal\s*[GÇö-]\s*starburner\s*<\/h1>/i.test(v)) return "pass";
            if (!/<h1/.test(v.toLowerCase())) return "Use the h1 tag GÇö that's the main heading tag";
            if (/<h1/.test(v.toLowerCase()) && !/<\/h1>/.test(v.toLowerCase())) return "You opened h1 but didn't close it GÇö add </h1> at the end";
            if (/<h1>[^<]*<\/h1>/.test(v.toLowerCase())) return "The tag is right but check the text GÇö it needs to say: DISTRESS SIGNAL GÇö StarBurner";
            return "Almost GÇö check your spelling and make sure the text matches exactly";
          },
          hint: "<h1>DISTRESS SIGNAL GÇö StarBurner</h1>",
        },
        drills: [
          { instruction: "Write an h1 for a rescue mission called: Operation Bring Zhan Home", check: (v) => /<h1>\s*operation bring zhan home\s*<\/h1>/i.test(v), answer: "<h1>Operation Bring Zhan Home</h1>" },
          { instruction: "Write an h2 subheading that says: Crew Status Report", check: (v) => /<h2>\s*crew status report\s*<\/h2>/i.test(v), answer: "<h2>Crew Status Report</h2>" },
          { instruction: "Write an h3 for a section called: Last Known Coordinates", check: (v) => /<h3>\s*last known coordinates\s*<\/h3>/i.test(v), answer: "<h3>Last Known Coordinates</h3>" },
          { instruction: "Write an h1 that says: SOS GÇö Phantar Vessel Down", check: (v) => /<h1>\s*sos\s*[GÇö-]\s*phantar vessel down\s*<\/h1>/i.test(v), answer: "<h1>SOS GÇö Phantar Vessel Down</h1>" },
        ],
      },
      {
        id: "p",
        heading: "Paragraphs GÇö Regular Readable Text",
        body: "The p tag is for paragraphs GÇö blocks of regular readable text. p stands for paragraph, which is about as straightforward as HTML gets. Every time you start a new topic or new block of sentences wrap it in its own p tag. The browser automatically adds a little space between paragraphs so they do not run together. When do you use p vs a heading? Simple rule: if it is a title or label use a heading. If it is a sentence someone would read use a paragraph. Most of the text on any webpage GÇö the articles, the descriptions, the captions GÇö is in p tags. Is p the only way to display text? No GÇö you will learn about span later which handles inline text and there are other text elements like blockquote for quotes. But p is the workhorse. You will use it constantly.",
        zanComment: "p stands for paragraph. They named it after what it does. I respect that. Everything else about this situation I do not respect but I respect that.",
        anatomy: [
          { text: "<p>", color: "#00f5c4", highlight: "#00f5c4", label: "<p>", explain: "Opens a paragraph. p = paragraph GÇö a block of readable text." },
          { text: "Crash landed near Magnolia Texas. Hull breach on port side.", color: "#c8f0ff", highlight: "#39ff14", label: "content", explain: "Regular readable text. This is what users read on the page." },
          { text: "</p>", color: "#00f5c4", highlight: "#00f5c4", label: "</p>", explain: "Closes the paragraph. The browser adds spacing between paragraphs automatically." },
        ],
        challenge: {
          id: "m1-p",
          instruction: "Add Zhan's crash report. Write a paragraph that says: Crash landed near Magnolia Texas. Hull breach on port side. Atmosphere at critical levels.",
          check: (v) => {
            const n = v.toLowerCase().trim();
            if (!n) return "Type something";
            if (!/<p/.test(n)) return "Use the p tag GÇö that's for paragraphs of text";
            if (/<p/.test(n) && !/<\/p>/.test(n)) return "You opened p but didn't close it GÇö add </p> at the end";
            if (/crash landed/.test(n) && /magnolia/.test(n) && /atmosphere/.test(n) && /<p>[\s\S]*<\/p>/.test(n)) return "pass";
            if (/<p>[^<]*<\/p>/.test(n)) return "The tag is right but check the text GÇö needs to mention: Crash landed, Magnolia Texas, and Atmosphere";
            return "Wrap your text in a p tag";
          },
          hint: "<p>Crash landed near Magnolia Texas. Hull breach on port side. Atmosphere at critical levels.</p>",
        },
        drills: [
          { instruction: "Write a paragraph that says: Three crew members survived the crash. Two did not.", check: (v) => /<p>[\s\S]*three crew[\s\S]*<\/p>/i.test(v), answer: "<p>Three crew members survived the crash. Two did not.</p>" },
          { instruction: "Write a paragraph about Zhan's situation GÇö at least one full sentence, anything you want", check: (v) => /<p>[^<]{20,}<\/p>/i.test(v), answer: "<p>The StarBurner is down. Atmosphere failing. We need rescue immediately.</p>" },
          { instruction: "Write a paragraph that says: Navigator Zorbin is missing. Last seen before impact.", check: (v) => /<p>[\s\S]*zorbin[\s\S]*missing[\s\S]*<\/p>/i.test(v), answer: "<p>Navigator Zorbin is missing. Last seen before impact.</p>" },
        ],
      },
    ],

    bossChallenge: {
      id: "m1-boss",
      zanComment: "Phantar's validator requires a complete transmission header before it will process any rescue request. I need both my heading AND my crash report in the same block. This is apparently non-negotiable. I negotiated. It was non-negotiable.",
      instruction: "Write both: an h1 that says DISTRESS SIGNAL GÇö StarBurner AND a paragraph below it that says: Pilot Zhan transmitting from Magnolia Texas. Atmosphere critical. Send rescue immediately.",
      check: (v) => {
        if (!v.trim()) return "Type something";
        const hasH1 = /<h1>\s*distress signal\s*[GÇö-]\s*starburner\s*<\/h1>/i.test(v);
        const hasP = /<p>[\s\S]*magnolia[\s\S]*<\/p>/i.test(v.toLowerCase()) && /<p>[\s\S]*rescue[\s\S]*<\/p>/i.test(v.toLowerCase());
        if (hasH1 && hasP) return "pass";
        if (!hasH1 && !hasP) return "You need both an h1 heading AND a p paragraph";
        if (!hasH1) return "The paragraph looks good GÇö now add the h1 heading above it";
        if (!hasP) return "The heading looks good GÇö now add the paragraph below it";
        return "Almost GÇö check both elements are there and the text matches";
      },
      hint: "<h1>DISTRESS SIGNAL GÇö StarBurner</h1>\n<p>Pilot Zhan transmitting from Magnolia Texas. Atmosphere critical. Send rescue immediately.</p>",
    },

    completionMessage: "Antenna module restored. Phantar can see you exist. That's a start. The cow is still there.",
  },

  {
    id: 2,
    title: "Restore the Nav System",
    subtitle: "Links & Images",
    badge: "=ƒ¢+",
    storyTag: "NAV MODULE",
    atmosphere: "68 hours remaining",

    signalContribution: `<h2>Visual Evidence GÇö Regulation 4,112 Compliance</h2>\n<img src="crashsite.jpg" alt="The StarBurner crashed in a field near Magnolia Texas at night. Hull breach visible on port side. Smoke rising from engine compartment.">\n<a href="https://maps.google.com">Crash site coordinates GÇö 30.1658-¦ N, 95.4613-¦ W</a>`,

    storyIntro: [
      "Good news: Phantar received my heading and paragraph.",
      "Bad news: They rejected the transmission anyway.",
      "Reason: visual confirmation required before any rescue vessel can be dispatched. Phantar Regulation 4,112. I looked it up. It is real. Someone wrote an entire regulation about this.",
      "They need a photo of the crash site. And a link to my coordinates. As proof that I actually crashed.",
      "I am transmitting from the wreckage. The wreckage is on fire. But sure. Let me get you a photo.",
      "Also the cow is gone. I don't know where the cow went. I've added it to my list of concerns.",
    ],

    slides: [
      {
        id: "attributes",
        heading: "Attributes GÇö Extra Instructions Inside Tags",
        body: "Some tags need extra instructions GÇö like a shipping label that says FRAGILE or THIS SIDE UP. Those extra instructions are called attributes. They live inside the opening tag and always follow this exact pattern: name='value'. The name says what kind of instruction it is. The value in quotes says what that instruction actually is. The quotes are not optional GÇö leave them out and the browser gets confused. Attributes only go in the opening tag, never the closing tag. You will use attributes constantly GÇö almost every interesting HTML element needs at least one. The two most important ones you are about to learn are href for links and src for images.",
        zanComment: "Attributes go inside the opening tag. Name equals value in quotes. I wrote that down. On actual paper. With a pen I found in the wreckage. We're doing this.",
        anatomy: [
          { text: "<a ", color: "#00f5c4", highlight: "#00f5c4", label: "<a", explain: "Opens a link tag. a stands for anchor GÇö like anchoring your page to another location." },
          { text: 'href="https://phantar.gov"', color: "#ffe94d", highlight: "#ffe94d", label: 'href="..."', explain: "An attribute. href = hypertext reference. The address of where the link goes." },
          { text: ">", color: "#00f5c4", highlight: "#00f5c4", label: ">", explain: "Closes the opening tag. Link content starts now." },
          { text: "Contact Phantar", color: "#c8f0ff", highlight: "#a98dff", label: "link text", explain: "The words users see and click on the page." },
          { text: "</a>", color: "#00f5c4", highlight: "#00f5c4", label: "</a>", explain: "Closes the link tag." },
        ],
        challenge: {
          id: "m2-attributes",
          instruction: "Write a link that goes to https://phantar.gov and says: Contact Phantar",
          check: (v) => {
            const n = v.toLowerCase().trim();
            if (!n) return "Type something";
            if (!/<a/.test(n)) return "Use the <a> tag for links";
            if (/<a/.test(n) && !/<\/a>/.test(n)) return "You opened the link but didn't close it GÇö add </a> at the end";
            if (!/href/.test(n)) return "Links need an href attribute GÇö that's where you put the address";
            if (/href/.test(n) && !/phantar/.test(n)) return "Check your href value GÇö it should be https://phantar.gov";
            if (/<a[^>]*href="https:\/\/phantar\.gov"[^>]*>\s*contact phantar\s*<\/a>/i.test(v)) return "pass";
            return "Almost GÇö check the href address and the link text match exactly";
          },
          hint: '<a href="https://phantar.gov">Contact Phantar</a>',
        },
      },
      {
        id: "images",
        heading: "Images GÇö Hanging Photos on the Wall",
        body: "Adding an image is like taping a photo to a wall. The src attribute is the address of where the photo lives GÇö either on your computer or somewhere on the internet. src stands for source. The alt attribute is a written description of the image for people who cannot see it GÇö maybe they are blind and using a screen reader, or maybe the image failed to load. alt stands for alternative text. Always include both. The img tag is special GÇö it is what we call a void element or self-closing tag. It has no content to wrap so it has no closing tag. It just stands alone. You will see some people write it as img /> with a slash at the end GÇö that is from an older style called XHTML and it still works but is not required in modern HTML. Is alt text really necessary? Yes GÇö and not just for accessibility. Alt text shows up when images fail to load, helps Google understand your images, and is legally required in many countries for public websites.",
        zanComment: "The img tag has no closing tag. It just ends. Just like that. I spent ten minutes looking for where the closing tag goes. There is no closing tag. It just ends. Moving on.",
        anatomy: [
          { text: "<img ", color: "#00f5c4", highlight: "#00f5c4", label: "<img", explain: "The image tag. No closing tag needed GÇö img is a void element." },
          { text: 'src="crashsite.jpg"', color: "#ffe94d", highlight: "#ffe94d", label: 'src="..."', explain: "Source GÇö where the image file lives. Could be a filename or a full web address." },
          { text: ' alt="crashed ship"', color: "#39ff14", highlight: "#39ff14", label: 'alt="..."', explain: "Alternative text GÇö describes the image for screen readers and when images fail to load." },
          { text: ">", color: "#00f5c4", highlight: "#00f5c4", label: ">", explain: "Closes the tag. No </img> needed." },
        ],
        challenge: {
          id: "m2-images",
          instruction: 'Write an image tag with src="crashsite.jpg" and alt="The StarBurner crashed in a Texas field"',
          check: (v) => {
            const n = v.toLowerCase().trim();
            if (!n) return "Type something";
            if (!/<img/.test(n)) return "Use the <img> tag for images";
            if (!/src/.test(n)) return "Images need a src attribute GÇö that's where the image file is";
            if (!/alt/.test(n)) return "Images need an alt attribute too GÇö describe what the image shows";
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
          { instruction: 'Write an image with src="crew.jpg" and alt="Zhan Wooch and Luvek standing outside the crashed StarBurner"', check: (v) => /<img[^>]*src="crew\.jpg"[^>]*>/i.test(v) && /alt/i.test(v), answer: '<img src="crew.jpg" alt="Zhan Wooch and Luvek standing outside the crashed StarBurner">' },
          { instruction: 'Write an image with src="zorbin.jpg" and a descriptive alt text about Zorbin being missing', check: (v) => /<img[^>]*src="zorbin\.jpg"[^>]*alt="[^"]{10,}"[^>]*>/i.test(v), answer: '<img src="zorbin.jpg" alt="Navigator Zorbin last seen before the crash missing since impact">' },
          { instruction: "Write an image of anything GÇö make up a filename and write a proper descriptive alt text", check: (v) => /<img[^>]*src="[^"]+"[^>]*alt="[^"]{10,}"[^>]*>/i.test(v), answer: '<img src="texas-night.jpg" alt="The Texas countryside at night where the StarBurner crash landed">' },
        ],
      },
      {
        id: "combining",
        heading: "Putting It Together",
        body: "You now know two of the most important tags in HTML GÇö links and images. Here is what they look like combined on a real page. Notice that the img tag sits inside a paragraph tag GÇö that is perfectly fine. Tags can go inside other tags. The technical term for this is nesting and you will do it constantly. The only rule is that inner tags must close before outer tags close. We will cover nesting in much more detail in Mission 4.",
        zanComment: "Links and images. That's how the entire internet works. Billions of dollars of infrastructure and it's just links and images all the way down. I need to call my grandfather.",
        codeBlock: `<h2>Visual Evidence</h2>\n<img src="crashsite.jpg" alt="The StarBurner crashed in a field near Magnolia Texas">\n<p>\n  <a href="https://maps.google.com">View crash site coordinates</a>\n</p>`,
        challenge: {
          id: "m2-combining",
          instruction: 'Write an h2 that says: Crash Site Evidence GÇö then an image with src="crashsite.jpg" and any descriptive alt text GÇö then a link to https://maps.google.com that says: View coordinates',
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
            return "Almost GÇö check all three elements are there";
          },
          hint: '<h2>Crash Site Evidence</h2>\n<img src="crashsite.jpg" alt="The StarBurner crashed in a Texas field at night">\n<a href="https://maps.google.com">View coordinates</a>',
        },
      },
    ],

    bossChallenge: {
      id: "m2-boss",
      zanComment: "Regulation 4,112 requires visual confirmation AND coordinate access in the same transmission block. I have read Regulation 4,112 four times. It is as bad as it sounds. Let's just do it.",
      instruction: "Build the complete visual evidence section. Write: an h2 that says Visual Evidence GÇö Regulation 4,112 Compliance. Then an img with src='crashsite.jpg' and a detailed alt description. Then a link to https://maps.google.com that says: Crash site coordinates GÇö 30.1658-¦ N 95.4613-¦ W",
      check: (v) => {
        if (!v.trim()) return "Type something";
        const hasH2 = /<h2>[\s\S]*visual evidence[\s\S]*<\/h2>/i.test(v);
        const hasImg = /<img[^>]*src="crashsite\.jpg"[^>]*alt="[^"]{10,}"[^>]*>/i.test(v);
        const hasLink = /<a[^>]*href="https:\/\/maps\.google\.com"[^>]*>[\s\S]*coordinates[\s\S]*<\/a>/i.test(v);
        if (hasH2 && hasImg && hasLink) return "pass";
        if (!hasH2) return "Start with the h2 heading GÇö Visual Evidence GÇö Regulation 4,112 Compliance";
        if (!hasImg) return "Add the crashsite.jpg image with a detailed alt description";
        if (!hasLink) return "Add the coordinates link to https://maps.google.com";
        return "Almost GÇö check all three elements match";
      },
      hint: '<h2>Visual Evidence GÇö Regulation 4,112 Compliance</h2>\n<img src="crashsite.jpg" alt="The StarBurner crashed in a field near Magnolia Texas at night hull breach visible">\n<a href="https://maps.google.com">Crash site coordinates GÇö 30.1658-¦ N 95.4613-¦ W</a>',
    },

    completionMessage: "Nav module restored. Phantar has visual confirmation of the crash. They believe you now. Regulation 4,112 has been satisfied. You're welcome, Regulation 4,112.",
  },
];
