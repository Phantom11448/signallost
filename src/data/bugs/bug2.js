export const bug2 = {
  id: "bug2",
  title: "Bug in the System #2",
  subtitle: "Transmission Failed — Sectors 1 through 6",
  badge: "🐛",
  unlocksAfter: 6,
  upToMissionId: 6,

  intro: [
    "Attempted another full transmission. Everything since the crash — header, crash report, visual evidence, life support, the log entry, the hull structure, the comms form — bundled together and sent.",
    "It failed. Same as before. Brix received nothing usable.",
    "Apparently this happens more than once for most pilots. That is somehow not reassuring.",
    "I have to rebuild the whole thing again. Everything. From the beginning.",
  ],

  brokenCode: `<h1>DISTRESS SIGNAL — StarBurner</h1>\n<p>Crash landed in an unknown region. Large white star on local flag.</p>\n<img src="crashsite.jpg" alt="The StarBurner crashed in a field near Magnolia Texas">\n<a href="https://rescue.phantar">Contact Phantar</a>\n<ul>\n  <li>Helium: critical, declining</li>\n</ul>\n<button>Request Emergency Supply Drop</button>\n<blockquote>If you are receiving this, the StarBurner did not complete its eviction of the man trespassing on our moon.</blockquote>\n<header>\n  <h1>DISTRESS SIGNAL — StarBurner</h1>\n</header>\n<footer>\n  <p>Transmitted from unknown coordinates.</p>\n</footer>\n<form>\n  <label for="callsign">Pilot Callsign:</label>\n  <input type="text" id="callsign" placeholder="Enter your designation">\n</form>`,

  challenge: {
    id: "bug2-fix",
    instruction: "Rebuild the full transmission from scratch.",
    requirements: [
      "Write a `header` containing an `h1` that says `DISTRESS SIGNAL — StarBurner`",
      "Write a `p` that says `Crash landed in an unknown region. Large white star on local flag.`",
      "Write an `img` with `src=\"crashsite.jpg\"` and a descriptive `alt`",
      "Write a `link` to `https://rescue.phantar` that says `Contact Phantar`",
      "Write a `ul` with one `li` that says `Helium: critical, declining`",
      "Write a `button` that says `Request Emergency Supply Drop`",
      "Write a `blockquote` that says `If you are receiving this, the StarBurner did not complete its eviction of the man trespassing on our moon.`",
      "Write a `form` containing a `label` with `for=\"callsign\"` that says `Pilot Callsign:` and a matching `input` with `id=\"callsign\"`",
      "Write a `footer` containing a `p` that says `Transmitted from unknown coordinates.`",
    ],
    relevantTags: ["h1", "p", "img", "a", "ul", "li", "button", "blockquote", "br", "header", "footer", "form", "label", "input"],
    check: (v) => {
      const n = v.toLowerCase().trim();
      if (!n) return "Type something";
      const hasH1 = /<h1>\s*distress signal\s*[—-]\s*starburner\s*<\/h1>/i.test(v);
      const hasCrashP = /<p>[\s\S]*crash landed[\s\S]*<\/p>/i.test(v);
      const hasImg = /<img[^>]*src="crashsite\.jpg"[^>]*alt="[^"]{5,}"[^>]*>/i.test(v);
      const hasLink = /<a[^>]*href="https:\/\/rescue\.phantar"[^>]*>\s*contact phantar\s*<\/a>/i.test(v);
      const hasLi = /<li>\s*helium:\s*critical,\s*declining\s*<\/li>/i.test(v);
      const hasButton = /<button>\s*request emergency supply drop\s*<\/button>/i.test(v);
      const hasQuote = /<blockquote>[\s\S]*eviction[\s\S]*moon[\s\S]*<\/blockquote>/i.test(v);
      const hasHeader = /<header>[\s\S]*<h1>[\s\S]*distress signal[\s\S]*<\/h1>[\s\S]*<\/header>/i.test(v);
      const hasFooter = /<footer>[\s\S]*<p>[\s\S]*transmitted from unknown coordinates\.[\s\S]*<\/p>[\s\S]*<\/footer>/i.test(v);
      const hasForm = /<form>[\s\S]*<label[^>]*for="callsign"[^>]*>[\s\S]*<\/label>[\s\S]*<input[^>]*id="callsign"[^>]*>[\s\S]*<\/form>/i.test(v);
      if (hasH1 && hasCrashP && hasImg && hasLink && hasLi && hasButton && hasQuote && hasHeader && hasFooter && hasForm) return "pass";
      if (!hasH1) return "Still missing the opening h1";
      if (!hasCrashP) return "Still missing the crash report paragraph";
      if (!hasImg) return "Still missing the crash site image";
      if (!hasLink) return "Still missing the link to rescue.phantar";
      if (!hasLi) return "Still missing the ul with the helium status";
      if (!hasButton) return "Still missing the supply drop button";
      if (!hasQuote) return "Still missing the blockquote";
      if (!hasHeader) return "Still missing the header with its h1";
      if (!hasFooter) return "Still missing the footer with its p";
      if (!hasForm) return "Still missing the form with matching label and input";
      return "Almost — check every piece is there and matches exactly";
    },
    hint: '<h1>DISTRESS SIGNAL — StarBurner</h1>\n<p>Crash landed in an unknown region. Large white star on local flag.</p>\n<img src="crashsite.jpg" alt="The StarBurner crashed in a field near Magnolia Texas">\n<a href="https://rescue.phantar">Contact Phantar</a>\n<ul>\n  <li>Helium: critical, declining</li>\n</ul>\n<button>Request Emergency Supply Drop</button>\n<blockquote>If you are receiving this, the StarBurner did not complete its eviction of the man trespassing on our moon.</blockquote>\n<header>\n  <h1>DISTRESS SIGNAL — StarBurner</h1>\n</header>\n<footer>\n  <p>Transmitted from unknown coordinates.</p>\n</footer>\n<form>\n  <label for="callsign">Pilot Callsign:</label>\n  <input type="text" id="callsign" placeholder="Enter your designation">\n</form>',
  },

  completionMessage: "Rebuilt and clean. Brix confirmed receipt. Six sections, all correct, all linked. Voss has still not said anything. Wooch still calls that a good sign.",
};