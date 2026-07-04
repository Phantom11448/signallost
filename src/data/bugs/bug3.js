export const bug3 = {
  id: "bug3",
  title: "Bug in the System #3",
  subtitle: "Critical System Failure",
  badge: "🐛",
  unlocksAfter: 9,
  upToMissionId: 9,

  intro: [
    "Another catastrophic transmission failure. Gorp says the transmission must be formatted perfectly to survive travel intact. Let's see if we can rebuild this transmission properly and get it through.",
  ],

  brokenCode: `<!DOCTYPE html>\n<html>\n<head></head>\n<body>\n<header>\n  <h1>Signal Relay — StarBurner</h1>\n  <nav>\n    <a href="https://rescue.phantar">Status</a>\n    <a href="https://maps.google.com">Location</a>\n  </nav>\n</header>\n<main>\n  <section>\n    <h2>What Happened</h2>\n    <p>A hull breach forced an emergency landing. Repairs are ongoing.</p>\n    <img src="crashsite.jpg" alt="The StarBurner crashed in a field near Magnolia Texas">\n  </section>\n  <article>\n    <h3>Latest Update</h3>\n    <p><strong>Rescue authorized</strong> pending final review.</p>\n  </article>\n  <table>\n    <tr>\n      <th>Name</th>\n      <th>Role</th>\n      <th>Status</th>\n    </tr>\n    <tr>\n      <td>Zhan</td>\n      <td>Pilot</td>\n      <td>Alive</td>\n    </tr>\n  </table>\n  <form>\n    <label for="callsign">Callsign:</label>\n    <input type="text" id="callsign">\n    <label for="access">Access Code:</label>\n    <input type="password" id="access">\n    <textarea placeholder="Type your response"></textarea>\n    <button type="submit">Transmit Reply</button>\n  </form>\n</main>\n<aside>\n  <p><small>Relayed through three stations. Minor delay possible.</small></p>\n</aside>\n<footer>\n  <p><em>Signal integrity: stable.</em></p>\n</footer>\n</body>\n</html>`,

  challenge: {
    id: "bug3-fix",
    instruction: "Build one real, properly structured page from scratch.",
    requirementsDialogue: { wooch: "Did we lose it all again?", zhan: "yep..." },
    requirements: [
      "Write `<!DOCTYPE html>`, then `html`, with an empty `head`",
      "Inside `body`, write a `header` containing an `h1` that says `Signal Relay — StarBurner`",
      "Inside the header, write a `nav` with two links: one to `https://rescue.phantar` that says `Status`, and one to `https://maps.google.com` that says `Location`",
      "Still inside `body`, write a `main` containing a `section` with an `h2` that says `What Happened` and a `p` that says `A hull breach forced an emergency landing. Repairs are ongoing.`",
      "Inside that section, write an `img` with `src=\"crashsite.jpg\"` and a descriptive `alt`",
      "Still inside `main`, write an `article` with an `h3` that says `Latest Update` and a `p` with `strong` around `Rescue authorized` and the rest of the sentence: `pending final review.`",
      "Still inside `main`, write a `table` with a header row of three `th` cells — `Name`, `Role`, `Status` — and one data row: `Zhan`, `Pilot`, `Alive`",
      "Still inside `main`, write a `form` containing: a `label` with `for=\"callsign\"` that says `Callsign:` and a matching `input` with `type=\"text\"` and `id=\"callsign\"` — then a `label` with `for=\"access\"` that says `Access Code:` and a matching `input` with `type=\"password\"` and `id=\"access\"` — then a `textarea` with `placeholder=\"Type your response\"` — then a `button` with `type=\"submit\"` that says `Transmit Reply`",
      "After `main` closes, still inside `body`, write an `aside` containing a `p` with `small` inside it that says `Relayed through three stations. Minor delay possible.`",
      "Last, write a `footer` containing a `p` with `em` around `Signal integrity: stable.`",
    ],
    relevantTags: ["html", "head", "header", "h1", "nav", "a", "main", "section", "h2", "p", "img", "article", "h3", "strong", "table", "tr", "th", "td", "form", "label", "input", "textarea", "button", "aside", "small", "footer", "em"],
    check: (v) => {
      const n = v.toLowerCase().trim();
      if (!n) return "Type something";
      const hasSkeleton = /^\s*<!DOCTYPE\s+html>[\s\S]*<html>[\s\S]*<head>\s*<\/head>/i.test(v);
      const hasHeader = /<header>[\s\S]*<h1>[\s\S]*signal relay[\s\S]*starburner[\s\S]*<\/h1>[\s\S]*<\/header>/i.test(v);
      const hasNav = /<nav>[\s\S]*<a[^>]*href="https:\/\/rescue\.phantar"[^>]*>\s*status\s*<\/a>[\s\S]*<a[^>]*href="https:\/\/maps\.google\.com"[^>]*>\s*location\s*<\/a>[\s\S]*<\/nav>/i.test(v);
      const hasSection = /<main>[\s\S]*<section>[\s\S]*<h2>[\s\S]*what happened[\s\S]*<\/h2>[\s\S]*<p>[\s\S]*hull breach forced an emergency landing\. repairs are ongoing\.[\s\S]*<\/p>/i.test(v);
      const hasImg = /<img[^>]*src="crashsite\.jpg"[^>]*alt="[^"]{5,}"[^>]*>/i.test(v);
      const hasArticle = /<article>[\s\S]*<h3>[\s\S]*latest update[\s\S]*<\/h3>[\s\S]*<p>[\s\S]*<strong>[\s\S]*rescue authorized[\s\S]*<\/strong>[\s\S]*pending final review\.[\s\S]*<\/p>[\s\S]*<\/article>/i.test(v);
      const hasTable = /<table>[\s\S]*<tr>\s*<th>\s*name\s*<\/th>\s*<th>\s*role\s*<\/th>\s*<th>\s*status\s*<\/th>\s*<\/tr>[\s\S]*<tr>\s*<td>\s*zhan\s*<\/td>\s*<td>\s*pilot\s*<\/td>\s*<td>\s*alive\s*<\/td>\s*<\/tr>[\s\S]*<\/table>/i.test(v);
      const hasTextInput = /<label[^>]*for="callsign"[^>]*>[\s\S]*callsign:[\s\S]*<\/label>[\s\S]*<input[^>]*type="text"[^>]*id="callsign"[^>]*>/i.test(v) || /<label[^>]*for="callsign"[^>]*>[\s\S]*callsign:[\s\S]*<\/label>[\s\S]*<input[^>]*id="callsign"[^>]*type="text"[^>]*>/i.test(v);
      const hasPasswordInput = /<label[^>]*for="access"[^>]*>[\s\S]*access code:[\s\S]*<\/label>[\s\S]*<input[^>]*type="password"[^>]*id="access"[^>]*>/i.test(v) || /<label[^>]*for="access"[^>]*>[\s\S]*access code:[\s\S]*<\/label>[\s\S]*<input[^>]*id="access"[^>]*type="password"[^>]*>/i.test(v);
      const hasTextarea = /<textarea[^>]*placeholder="type your response"[^>]*>\s*<\/textarea>/i.test(v);
      const hasSubmit = /<button[^>]*type="submit"[^>]*>\s*transmit reply\s*<\/button>/i.test(v);
      const hasFormWrap = /<form>[\s\S]*<\/form>/i.test(v);
      const hasAside = /<aside>[\s\S]*<p>\s*<small>[\s\S]*relayed through three stations\. minor delay possible\.[\s\S]*<\/small>\s*<\/p>[\s\S]*<\/aside>/i.test(v);
      const hasFooter = /<footer>[\s\S]*<p>\s*<em>[\s\S]*signal integrity: stable\.[\s\S]*<\/em>\s*<\/p>[\s\S]*<\/footer>/i.test(v);

      if (hasSkeleton && hasHeader && hasNav && hasSection && hasImg && hasArticle && hasTable && hasTextInput && hasPasswordInput && hasTextarea && hasSubmit && hasFormWrap && hasAside && hasFooter) return "pass";
      if (!hasSkeleton) return "Still missing the doctype, html, and empty head";
      if (!hasHeader) return "Still missing the header with its h1";
      if (!hasNav) return "Still missing the nav with both links";
      if (!hasSection) return "Still missing the main/section with heading and paragraph";
      if (!hasImg) return "Still missing the crash site image";
      if (!hasArticle) return "Still missing the article with strong text";
      if (!hasTable) return "Still missing the table with header row and Zhan's row";
      if (!hasTextInput) return "Still missing the callsign label and text input";
      if (!hasPasswordInput) return "Still missing the access code label and password input";
      if (!hasTextarea) return "Still missing the textarea with its placeholder";
      if (!hasSubmit) return "Still missing the submit button";
      if (!hasFormWrap) return "Still missing the form wrapping all the inputs";
      if (!hasAside) return "Still missing the aside with its small text";
      if (!hasFooter) return "Still missing the footer with its em text";
      return "Almost — check every piece is there and matches exactly";
    },
    hint: '<!DOCTYPE html>\n<html>\n<head></head>\n<body>\n<header>\n  <h1>Signal Relay — StarBurner</h1>\n  <nav>\n    <a href="https://rescue.phantar">Status</a>\n    <a href="https://maps.google.com">Location</a>\n  </nav>\n</header>\n<main>\n  <section>\n    <h2>What Happened</h2>\n    <p>A hull breach forced an emergency landing. Repairs are ongoing.</p>\n    <img src="crashsite.jpg" alt="The StarBurner crashed in a field near Magnolia Texas">\n  </section>\n  <article>\n    <h3>Latest Update</h3>\n    <p><strong>Rescue authorized</strong> pending final review.</p>\n  </article>\n  <table>\n    <tr>\n      <th>Name</th>\n      <th>Role</th>\n      <th>Status</th>\n    </tr>\n    <tr>\n      <td>Zhan</td>\n      <td>Pilot</td>\n      <td>Alive</td>\n    </tr>\n  </table>\n  <form>\n    <label for="callsign">Callsign:</label>\n    <input type="text" id="callsign">\n    <label for="access">Access Code:</label>\n    <input type="password" id="access">\n    <textarea placeholder="Type your response"></textarea>\n    <button type="submit">Transmit Reply</button>\n  </form>\n</main>\n<aside>\n  <p><small>Relayed through three stations. Minor delay possible.</small></p>\n</aside>\n<footer>\n  <p><em>Signal integrity: stable.</em></p>\n</footer>\n</body>\n</html>',
  },

  completionMessage: "Retransmitted. Gorp confirmed receipt with the word 'structured' — which Wooch says is, from Gorp, essentially a standing ovation.",
};