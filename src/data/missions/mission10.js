export const mission10 = {
  id: 10,
  title: "Restore the Holographic Projector",
  subtitle: "Media",
  badge: "📺",
  storyTag: "PROJECTOR MODULE",
  atmosphere: "36 hours remaining",

  signalContribution: `<h2>Holographic Log — Recovered Media</h2>\n<video controls>\n  <source src="crashsite.mp4" type="video/mp4">\n  <source src="crashsite.webm" type="video/webm">\n  Your browser does not support this video.\n</video>\n<audio controls src="crash2.mp3"></audio>`,

  storyIntro: [
    "The broadcast decoded clean. A rescue vessel is authorized. I have said that sentence too many times to believe it.",
    "The holographic projector came back online today. It's been dead since the crash. It's how this ship used to display recorded video and audio before everything else failed.",
    "There's something on it. A file. Small, garbled, barely playable. I don't recognize the format Phantar wants it embedded in, but the projector needs both video and sound restored before it'll show me anything at all.",
    "The file is timestamped after the crash. I don't know who sent it yet. I'm going to find out.",
  ],

  slides: [
    {
      id: "video-controls",
      heading: "Video and Controls",
      body: "The `video` tag embeds a video file directly on the page. On its own, with no `attributes`, a `video` tag actually shows no play button or interface at all — it just sits there silently. That's what the `controls attribute` is for: it tells the browser to show its own built-in play, pause, volume, and progress bar interface, so a viewer can actually interact with it. `controls` doesn't take a `value` like `src` does — you either include the word `controls`, or you leave it off entirely. This is called a boolean attribute — its presence alone turns the feature on, no equals sign or quotes required. Is `controls` required? Technically no, but without it, most users have no way to play the video at all unless you build custom play buttons yourself with JavaScript later. For now, `controls` is the standard, correct choice for anything you want a viewer to actually operate.",
      zanComment: "controls has no value. No equals sign, no quotes. It's either there or it isn't.",
      anatomy: [
        { text: "<video ", color: "#00f5c4", highlight: "#00f5c4", label: "<video", explain: "Opens the video tag." },
        { text: "controls", color: "#ffe94d", highlight: "#ffe94d", label: "controls", explain: "Boolean attribute. No value needed. Shows the browser's playback interface." },
        { text: ' src="crashsite.mp4">', color: "#39ff14", highlight: "#39ff14", label: 'src="..."', explain: "The video file to play, same pattern as img." },
        { text: "</video>", color: "#00f5c4", highlight: "#00f5c4", label: "</video>", explain: "Closes the video tag." },
      ],
      challenge: {
        id: "m10-video",
        instruction: 'Write a `video` tag with `controls` and `src="crashsite.mp4"`',
        relevantTags: ["video"],
        check: (v) => {
          const n = v.toLowerCase().trim();
          if (!n) return "Type something";
          if (!/<video/.test(n)) return "Use the `video` tag";
          if (!/controls/.test(n)) return "Add the `controls` attribute";
          if (!/src\s*=\s*"crashsite\.mp4"/i.test(n)) return 'Add src="crashsite.mp4"';
          if (/<video[^>]*controls[^>]*src="crashsite\.mp4"[^>]*>/i.test(v) || /<video[^>]*src="crashsite\.mp4"[^>]*controls[^>]*>/i.test(v)) return "pass";
          return "Check controls and src are both on the video tag";
        },
        hint: '<video controls src="crashsite.mp4"></video>',
      },
      drills: [
        { instruction: 'Write a video tag with controls and src="getstarted.mp4"', check: (v) => /<video[^>]*controls[^>]*src="getstarted\.mp4"[^>]*>/i.test(v) || /<video[^>]*src="getstarted\.mp4"[^>]*controls[^>]*>/i.test(v), answer: '<video controls src="getstarted.mp4"></video>' },
        { instruction: 'Write a video tag with controls and src="repair.mp4"', check: (v) => /<video[^>]*controls[^>]*src="repair\.mp4"[^>]*>/i.test(v) || /<video[^>]*src="repair\.mp4"[^>]*controls[^>]*>/i.test(v), answer: '<video controls src="repair.mp4"></video>' },
      ],
    },
    {
      id: "audio",
      heading: "Audio — Same Idea, Just Sound",
      body: "`audio` works exactly like `video`, minus the visual player — it embeds a sound file instead of a video file. It takes the same `src` attribute pointing to an `audio file`, and the same `controls` attribute to show a playback interface, this time just play, pause, and a volume/progress bar with no video frame. Is `audio` just `video` without a picture? Structurally, yes — they share almost identical attributes and behavior, they just embed different types of media. Will you use `controls` on `audio` too? Almost always, for the same reason as `video` — without it, there's no way for a viewer to actually play the sound.",
      zanComment: "Embedding audio? Let me get some classics for this.",
      anatomy: [
        { text: "<audio ", color: "#00f5c4", highlight: "#00f5c4", label: "<audio", explain: "Opens the audio tag. Same pattern as video." },
        { text: "controls", color: "#ffe94d", highlight: "#ffe94d", label: "controls", explain: "Same boolean attribute as video." },
        { text: ' src="crash2.mp3">', color: "#39ff14", highlight: "#39ff14", label: 'src="..."', explain: "The audio file to play." },
        { text: "</audio>", color: "#00f5c4", highlight: "#00f5c4", label: "</audio>", explain: "Closes the audio tag." },
      ],
      challenge: {
        id: "m10-audio",
        instruction: 'Write an `audio` tag with `controls` and `src="jams.mp3"`',
        relevantTags: ["audio"],
        check: (v) => {
          const n = v.toLowerCase().trim();
          if (!n) return "Type something";
          if (!/<audio/.test(n)) return "Use the `audio` tag";
          if (!/controls/.test(n)) return "Add the `controls` attribute";
          if (!/src\s*=\s*"jams\.mp3"/i.test(n)) return 'Add src="jams.mp3"';
          if (/<audio[^>]*controls[^>]*src="jams\.mp3"[^>]*>/i.test(v) || /<audio[^>]*src="jams\.mp3"[^>]*controls[^>]*>/i.test(v)) return "pass";
          return "Check controls and src are both on the audio tag";
        },
        hint: '<audio controls src="jams.mp3"></audio>',
      },
      drills: [
        { instruction: 'Write an audio tag with controls and src="phanjam.mp3"', check: (v) => /<audio[^>]*controls[^>]*src="phanjam\.mp3"[^>]*>/i.test(v) || /<audio[^>]*src="phanjam\.mp3"[^>]*controls[^>]*>/i.test(v), answer: '<audio controls src="phanjam.mp3"></audio>' },
        { instruction: 'Write an audio tag with controls and src="phanmix.mp3"', check: (v) => /<audio[^>]*controls[^>]*src="phanmix\.mp3"[^>]*>/i.test(v) || /<audio[^>]*src="phanmix\.mp3"[^>]*controls[^>]*>/i.test(v), answer: '<audio controls src="phanmix.mp3"></audio>' },
      ],
    },
    {
      id: "source-fallback",
      heading: "Source — Offering Multiple Formats",
      body: "Not every browser supports every `video` or `audio` file format. Instead of relying on one single `src` on the `video` tag itself, you can nest multiple `<source>` tags inside `video`, each one offering a different file format of the same content. `source` is a void element, like `img` and `br` — no closing tag. Each `source` tag also needs a `type attribute`, and this one is worth explaining properly: `type=\"video/mp4\"` is called a MIME type, a standardized label that tells the browser exactly what kind of file this is before it even tries to load it. The format is always `category/specific-format` — `video` is the general `category`, `mp4` is the `specific format` within that `category`. The browser reads the `type` first and can immediately skip any `source` it knows it can't play, without wasting time downloading a file it was never going to use. The browser reads through the `source` tags in order and plays the first format it actually supports, ignoring the rest. You can also add plain text right after the `source` tags, still inside `video` — if the browser can't play any of the offered formats at all, that fallback `text` displays instead, so the viewer at least sees a message rather than a blank broken box. Is `source` required? No — a single `src` attribute directly on `video`, like you already learned, works fine for a simple case with one format. `source` becomes valuable specifically when you want maximum compatibility across different browsers.",
      zanComment: "The browser tries each source tag until one works, and if none work, it falls back to plain text instead of just failing silently. I would like this exact behavior installed in Phantar's rescue division.",
      anatomy: [
        { text: "<video controls>", color: "#00f5c4", highlight: "#00f5c4", label: "<video>", explain: "No src here — using source tags inside instead." },
        { text: '<source src="crashsite.mp4" ', color: "#ffe94d", highlight: "#ffe94d", label: "<source>", explain: "Void element. One format option. Browser tries these in order." },
        { text: 'type="video/mp4">', color: "#a98dff", highlight: "#a98dff", label: 'type="..."', explain: "A MIME type — category/format. Tells the browser what kind of file this is before loading it." },
        { text: "Your browser does not support this video.", color: "#39ff14", highlight: "#39ff14", label: "fallback text", explain: "Shown only if no source format works." },
        { text: "</video>", color: "#00f5c4", highlight: "#00f5c4", label: "</video>", explain: "Closes video, including everything nested inside it." },
      ],
      challenge: {
        id: "m10-source",
        instruction: 'Write a `video` tag with `controls`, containing two `source` tags — one with `src="crashsite.mp4"` and `type="video/mp4"`, one with `src="crashsite.webm"` and `type="video/webm"` — then fallback text that says `Your browser does not support this video.`',
        relevantTags: ["video", "source"],
        check: (v) => {
          const n = v.toLowerCase().trim();
          if (!n) return "Type something";
          if (!/<video[^>]*controls/.test(n)) return "Start with a video tag that has controls";
          const hasMp4 = /<source[^>]*src="crashsite\.mp4"[^>]*type="video\/mp4"[^>]*>/i.test(v) || /<source[^>]*type="video\/mp4"[^>]*src="crashsite\.mp4"[^>]*>/i.test(v);
          const hasWebm = /<source[^>]*src="crashsite\.webm"[^>]*type="video\/webm"[^>]*>/i.test(v) || /<source[^>]*type="video\/webm"[^>]*src="crashsite\.webm"[^>]*>/i.test(v);
          const hasFallback = /your browser does not support this video\./i.test(v);
          if (hasMp4 && hasWebm && hasFallback && /<\/video>/i.test(n)) return "pass";
          if (!hasMp4) return "Check the mp4 source tag";
          if (!hasWebm) return "Check the webm source tag";
          if (!hasFallback) return "Add the fallback text inside video, after the source tags";
          return "Almost — check everything is inside the video tag correctly";
        },
        hint: '<video controls>\n  <source src="crashsite.mp4" type="video/mp4">\n  <source src="crashsite.webm" type="video/webm">\n  Your browser does not support this video.\n</video>',
      },
    },
  ],

  bossChallenge: {
    id: "m10-boss",
    zanComment: "The projector wants the full recovered file — video with both format options and a fallback, plus the audio channel restored separately. Whatever is on this recording, I am about to see it.",
    instruction: 'Restore the full projector output. Write: a `video` tag with `controls`, two `source` tags (`src="repair.mp4"` `type="video/mp4"` and `src="repair.webm"` `type="video/webm"`), and fallback text `Your browser does not support this video.` Then an `audio` tag with `controls` and `src="phanjam.mp3"`',
    relevantTags: ["video", "source", "audio"],
    check: (v) => {
      if (!v.trim()) return "Type something";
      const hasVideo = /<video[^>]*controls[^>]*>/i.test(v) && /<\/video>/i.test(v);
      const hasMp4 = /<source[^>]*src="repair\.mp4"[^>]*type="video\/mp4"[^>]*>/i.test(v) || /<source[^>]*type="video\/mp4"[^>]*src="repair\.mp4"[^>]*>/i.test(v);
      const hasWebm = /<source[^>]*src="repair\.webm"[^>]*type="video\/webm"[^>]*>/i.test(v) || /<source[^>]*type="video\/webm"[^>]*src="repair\.webm"[^>]*>/i.test(v);
      const hasFallback = /your browser does not support this video\./i.test(v);
      const hasAudio = /<audio[^>]*controls[^>]*src="phanjam\.mp3"[^>]*>/i.test(v) || /<audio[^>]*src="phanjam\.mp3"[^>]*controls[^>]*>/i.test(v);
      if (hasVideo && hasMp4 && hasWebm && hasFallback && hasAudio) return "pass";
      if (!hasVideo) return "Add the video tag with controls";
      if (!hasMp4 || !hasWebm) return "Check both source tags";
      if (!hasFallback) return "Add the fallback text";
      if (!hasAudio) return "Add the audio tag with controls and src";
      return "Almost — check every piece is there and matches exactly";
    },
    hint: '<video controls>\n  <source src="repair.mp4" type="video/mp4">\n  <source src="repair.webm" type="video/webm">\n  Your browser does not support this video.\n</video>\n<audio controls src="phanjam.mp3"></audio>',
  },

  completionMessage: "The projector flickers on. Video first, then sound. It's short. It's grainy. It's unmistakably Zorbin. He's alive. He's saying something. I can't understand most of it yet — the audio is corrupted past the first few words. But he's alive.",
};