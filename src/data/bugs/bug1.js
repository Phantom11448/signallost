export const bug1 = {
  id: "bug1",
  title: "Bug in the System #1",
  subtitle: "Transmission Failed — Sectors 1 through 3",
  badge: "🐛",
  unlocksAfter: 3,
  upToMissionId: 3,

  intro: [
    "Attempted full transmission. Everything I've built so far — the header, the crash report, the visual evidence, the life support status — bundled into one signal and sent to Phantar.",
    "It failed. Not rejected — failed. Somewhere over four hundred thousand kilometers of empty space, the entire thing just came apart. Brix received nothing usable.",
    "This is apparently normal for a first full assembly. Nobody mentioned that before I sent it.",
    "I have to rebuild the whole thing from memory. Every piece, in order.",
  ],

  brokenCode: `<h1>DISTRESS SIGNAL — StarBurner</h1>\n<p>Crash landed in an unknown region. Large white star on local flag.</p>\n<img src="crashsite.jpg" alt="The StarBurner crashed in a field near Magnolia Texas">\n<a href="https://rescue.phantar">Contact Phantar</a>\n<ul>\n  <li>Helium: critical, declining</li>\n</ul>\n<button>Request Emergency Supply Drop</button>`,

  challenge: {
    id: "bug1-fix",
    instruction: "Rebuild the full transmission from scratch.",
    requirements: [
      "Write an `h1` that says `DISTRESS SIGNAL — StarBurner`",
      "Write a `p` that says `Crash landed in an unknown region. Large white star on local flag.`",
      "Write an `img` with `src=\"crashsite.jpg\"` and a descriptive `alt`",
      "Write a `link` to `https://rescue.phantar` that says `Contact Phantar`",
      "Write a `ul` with one `li` that says `Helium: critical, declining`",
      "Write a `button` that says `Request Emergency Supply Drop`",
    ],
    check: (v) => {
      const n = v.toLowerCase().trim();
      if (!n) return "Type something";
      const hasH1 = /<h1>\s*distress signal\s*[—-]\s*starburner\s*<\/h1>/i.test(v);
      const hasP = /<p>[\s\S]*crash landed[\s\S]*<\/p>/i.test(v);
      const hasImg = /<img[^>]*src="crashsite\.jpg"[^>]*alt="[^"]{5,}"[^>]*>/i.test(v);
      const hasLink = /<a[^>]*href="https:\/\/rescue\.phantar"[^>]*>\s*contact phantar\s*<\/a>/i.test(v);
      const hasLi = /<li>\s*helium:\s*critical,\s*declining\s*<\/li>/i.test(v);
      const hasButton = /<button>\s*request emergency supply drop\s*<\/button>/i.test(v);
      if (hasH1 && hasP && hasImg && hasLink && hasLi && hasButton) return "pass";
      if (!hasH1) return "Still missing the h1 heading";
      if (!hasP) return "Still missing the p — the crash report text";
      if (!hasImg) return "Still missing the img — check src and alt";
      if (!hasLink) return "Still missing the link to rescue.phantar";
      if (!hasLi) return "Still missing the ul with the helium status item";
      if (!hasButton) return "Still missing the button";
      return "Almost — check every piece is there and matches exactly";
    },
    hint: '<h1>DISTRESS SIGNAL — StarBurner</h1>\n<p>Crash landed in an unknown region. Large white star on local flag.</p>\n<img src="crashsite.jpg" alt="The StarBurner crashed in a field near Magnolia Texas">\n<a href="https://rescue.phantar">Contact Phantar</a>\n<ul>\n  <li>Helium: critical, declining</li>\n</ul>\n<button>Request Emergency Supply Drop</button>',
  },

  completionMessage: "Rebuilt and clean. Brix confirmed receipt — Phantar now has the full picture: who you are, where you crashed, and what condition the ship is in.",
};
