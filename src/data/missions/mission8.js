export const mission8 = {
  id: 8,
  title: "Reconstruct the Data Matrix",
  subtitle: "Tables",
  badge: "📊",
  storyTag: "DATA MODULE",
  atmosphere: "44 hours remaining",

  signalContribution: `<h2>Crew Manifest</h2>\n<table>\n  <tr>\n    <th>Name</th>\n    <th>Role</th>\n    <th>Status</th>\n  </tr>\n  <tr>\n    <td>Zhan</td>\n    <td>Pilot</td>\n    <td>Alive</td>\n  </tr>\n  <tr>\n    <td>Wooch</td>\n    <td>Engineer</td>\n    <td>Alive</td>\n  </tr>\n  <tr>\n    <td>Luvek</td>\n    <td>Medic</td>\n    <td>Alive</td>\n  </tr>\n  <tr>\n    <td>Zorbin</td>\n    <td>Navigator</td>\n    <td>Unaccounted for</td>\n  </tr>\n  <tr>\n    <td>Zandek</td>\n    <td>Co-Pilot</td>\n    <td>Deceased</td>\n  </tr>\n  <tr>\n    <td>Toch</td>\n    <td>Systems Officer</td>\n    <td>Deceased</td>\n  </tr>\n</table>`,
  bugExcerpt: `<table>\n  <tr>\n    <th>Name</th>\n    <th>Status</th>\n  </tr>\n  <tr>\n    <td>Zorbin</td>\n    <td>Unaccounted for</td>\n  </tr>\n</table>`,

  storyIntro: [
    "Voss accepted the pod configuration. 'Acceptable' remains the highest praise I've received all week.",
    "Phantar's next requirement is the crew manifest. The real one. Not the version I scribbled down in a panic on day one — an actual data matrix. Rows, columns, everything aligned.",
    "I still have Zorbin marked as 'unavailable.' I don't have a better word for it. He is not here. He is not confirmed anything else. Unaccounted for is the closest thing to true I have.",
    "Gorp reviews transmissions for two hundred years. Gorp will look at this table. I would like it to be a good table.",
  ],

  slides: [
    {
      id: "table-tr",
      heading: "Table and Tr — Rows of Data",
      body: "`table` is the outer container for anything organized into rows and columns — spreadsheets, schedules, manifests, anything grid-shaped. On its own, `table` is empty and does nothing visible. Inside it, `tr` creates a `table row` — which is what `tr` stands for. Every single row of data, including the very first row that usually holds column titles, is wrapped in its own `tr` tag. Is a `table` just one `tr`? No — a real `table` almost always has multiple `tr` tags stacked one after another, each representing one row of information. Will the browser automatically line up columns across rows? Yes, as long as each row has the same number of cells inside it, which we'll cover next — the browser handles alignment automatically, you don't control column width by hand at this stage.",
      zanComment: "tr stands for table row. Every row gets its own tr.",
      invisibleOutput: true,
      anatomy: [
        { text: "<table>", color: "#00f5c4", highlight: "#00f5c4", label: "<table>", explain: "The outer container for the whole grid." },
        { text: "<tr>", color: "#ffe94d", highlight: "#ffe94d", label: "<tr>", explain: "One row. Every row of data gets its own tr." },
        { text: "</tr>", color: "#ffe94d", highlight: "#ffe94d", label: "</tr>", explain: "Closes this row." },
        { text: "</table>", color: "#00f5c4", highlight: "#00f5c4", label: "</table>", explain: "Closes the whole table." },
      ],
      challenge: {
        id: "m8-table-tr",
        instruction: "Write a `table` with one empty `tr` inside it",
        relevantTags: ["table", "tr"],
        invisibleOutput: true,
        check: (v) => {
          const n = v.toLowerCase().trim();
          if (!n) return "Type something";
          if (!/<table/.test(n)) return "Use the `table` tag";
          if (!/<tr>\s*<\/tr>/i.test(n)) return "Add an empty `tr` inside the table";
          if (/<table>\s*<tr>\s*<\/tr>\s*<\/table>/i.test(v)) return "pass";
          return "Check the tr is properly nested inside the table";
        },
        hint: "<table>\n  <tr></tr>\n</table>",
      },
    },
    {
      id: "th-td",
      heading: "Th and Td — Header and Data Cells",
      body: "Inside a `tr`, individual cells go in one of two tags. `th` stands for `table header` — it's used for column titles, the first row that labels what each column means. Browsers automatically bold and center `th` content by default, visually setting it apart from regular data. `td` stands for `table data` — it's used for every actual piece of information, every regular cell in every row after the header. Is `th` required? No — a `table` can technically work with just `td` cells, but including a header row with `th` makes the `table` dramatically easier to read and is considered correct practice for any real `table`. Do `th` and `td` need to line up in the same order across every row? Yes — if your header row has three `th` cells in order Name, Role, Status, every `td` row after it needs exactly three `td` cells in that same order, or the data will be misaligned under the wrong column.",
      zanComment: "th cells get bolded automatically, td cells don't. This tag pairing organizes for me. This may be primitive but its kinda cool.",
      anatomy: [
        { text: "<th>Name</th>", color: "#00f5c4", highlight: "#00f5c4", label: "<th>", explain: "Header cell — bold, centered by default. Used for column titles." },
        { text: "<td>Zhan</td>", color: "#ffe94d", highlight: "#ffe94d", label: "<td>", explain: "Data cell — regular info. Used in every row after the header." },
      ],
      challenge: {
        id: "m8-th-td",
        instruction: "Write a `table` with two rows: the first `tr` has two `th` cells that say `Name` and `Role` — the second `tr` has two `td` cells that say `Zhan` and `Pilot`",
        relevantTags: ["table", "tr", "th", "td"],
        check: (v) => {
          const n = v.toLowerCase().trim();
          if (!n) return "Type something";
          const hasHeader = /<tr>\s*<th>\s*name\s*<\/th>\s*<th>\s*role\s*<\/th>\s*<\/tr>/i.test(v);
          const hasData = /<tr>\s*<td>\s*zhan\s*<\/td>\s*<td>\s*pilot\s*<\/td>\s*<\/tr>/i.test(v);
          if (/<table>/i.test(n) && hasHeader && hasData) return "pass";
          if (!/<table/.test(n)) return "Wrap everything in a table tag";
          if (!hasHeader) return "Check the header row — two th cells saying Name and Role";
          if (!hasData) return "Check the data row — two td cells saying Zhan and Pilot";
          return "Almost — check both rows are correct and in order";
        },
        hint: "<table>\n  <tr>\n    <th>Name</th>\n    <th>Role</th>\n  </tr>\n  <tr>\n    <td>Zhan</td>\n    <td>Pilot</td>\n  </tr>\n</table>",
      },
      drills: [
        { instruction: "Write a table with one header row (two th cells, your choice of text) and one data row (two td cells, your choice)", check: (v) => /<table>[\s\S]*<tr>[\s\S]*<th>[^<]+<\/th>[\s\S]*<th>[^<]+<\/th>[\s\S]*<\/tr>[\s\S]*<tr>[\s\S]*<td>[^<]+<\/td>[\s\S]*<td>[^<]+<\/td>[\s\S]*<\/tr>[\s\S]*<\/table>/i.test(v), answer: "<table>\n  <tr>\n    <th>Item</th>\n    <th>Quantity</th>\n  </tr>\n  <tr>\n    <td>Rations</td>\n    <td>12</td>\n  </tr>\n</table>" },
      ],
    },
  ],

  bossChallenge: {
    id: "m8-boss",
    zanComment: "Gorp wants the full manifest — every crew member, every role, every status, properly aligned. Gorp has reviewed transmissions for two hundred years... and he acts like it.",
    instruction: "Build the crew manifest table. Write: a `table` with a header row containing three `th` cells: `Name`, `Role`, `Status`. Then a row for `Zhan`, `Pilot`, `Alive`. Then a row for `Zorbin`, `Navigator`, `Unaccounted for`.",
    relevantTags: ["table", "tr", "th", "td"],
    check: (v) => {
      if (!v.trim()) return "Type something";
      const hasHeader = /<tr>\s*<th>\s*name\s*<\/th>\s*<th>\s*role\s*<\/th>\s*<th>\s*status\s*<\/th>\s*<\/tr>/i.test(v);
      const hasZhan = /<tr>\s*<td>\s*zhan\s*<\/td>\s*<td>\s*pilot\s*<\/td>\s*<td>\s*alive\s*<\/td>\s*<\/tr>/i.test(v);
      const hasZorbin = /<tr>\s*<td>\s*zorbin\s*<\/td>\s*<td>\s*navigator\s*<\/td>\s*<td>\s*unaccounted for\s*<\/td>\s*<\/tr>/i.test(v);
      if (/<table>/i.test(v) && hasHeader && hasZhan && hasZorbin) return "pass";
      if (!/<table/i.test(v)) return "Wrap everything in a table tag";
      if (!hasHeader) return "Check the header row — three th cells: Name, Role, Status";
      if (!hasZhan) return "Check Zhan's row";
      if (!hasZorbin) return "Check Zorbin's row — make sure Status says exactly: Unaccounted for";
      return "Almost — check all three rows are correct and in order";
    },
    hint: "<table>\n  <tr>\n    <th>Name</th>\n    <th>Role</th>\n    <th>Status</th>\n  </tr>\n  <tr>\n    <td>Zhan</td>\n    <td>Pilot</td>\n    <td>Alive</td>\n  </tr>\n  <tr>\n    <td>Zorbin</td>\n    <td>Navigator</td>\n    <td>Unaccounted for</td>\n  </tr>\n</table>",
  },

  completionMessage: "Data matrix reconstructed. Gorp reviewed it. Gorp did not flag a single misaligned cell. Wooch says that might be the nicest thing Gorp has ever not said about anything.",
};