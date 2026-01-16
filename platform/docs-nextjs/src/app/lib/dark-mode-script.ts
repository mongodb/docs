// Inline blocking script that runs synchronously when HTML is parsed
// This must be inline to prevent any flash of unstyled content

export const darkModeScript = `
    (function() {
      try {
        var d = document.documentElement.classList;
        d.remove("light-theme", "dark-theme", "system");
        var h = window.location.href;
        if (h && h.includes('/openapi/preview')) return;
        var storage = null;
        try {
          storage = window.localStorage.getItem("mongodb-docs");
        } catch(e) {}
        var e = storage ? JSON.parse(storage || "{}")?.["theme"] : null;
        if ("system" === e || (!e)) {
          var t = "(prefers-color-scheme: dark)",
            m = window.matchMedia ? window.matchMedia(t) : null;
          if (m && (m.media !== t || m.matches)) {
            d.add("dark-theme", "system");
          } else {
            d.add("light-theme", "system");
          }
        } else if (e) {
          var x = { "light-theme": "light-theme", "dark-theme": "dark-theme" };
          if (x[e]) d.add(x[e]);
        }
      } catch (e) {
        // Silently fail - fallback to light mode
        document.documentElement.classList.add("light-theme");
      }
    })();
  `;
