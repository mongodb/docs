/**
 * Offline tabs — injected into every HTML page by build-offline.ts.
 *
 * The offline build strips all _next/ JS bundles, so React never hydrates and
 * the server-rendered tabs can't switch. This script re-wires them with vanilla
 * JS, using the data-tabset attribute Tabs.tsx sets and the data-key attribute
 * react-aria puts on each tab, avoiding hashed class names that can change
 * between builds.
 *
 * Tab syncing mirrors TabContext, so clicking a tab updates every tabset on
 * the page that shares the same name.
 */
(function () {
  // Scope to a tabset's own tabs and panels, skipping any nested tabsets.
  function ownElements(tabset, selector) {
    return Array.from(tabset.querySelectorAll(selector)).filter((el) => el.closest('[data-tabset]') === tabset);
  }

  function activateTabById(tabset, selectedTabId) {
    const buttons = ownElements(tabset, '[role="tab"]');
    const panels = ownElements(tabset, '[role="tabpanel"]');
    const idx = buttons.findIndex((btn) => btn.getAttribute('data-key') === selectedTabId);
    if (idx === -1) return;
    buttons.forEach((btn, i) => {
      btn.setAttribute('aria-selected', i === idx ? 'true' : 'false');
      btn.setAttribute('tabindex', i === idx ? '0' : '-1');
      // The server render only links the initially selected tab to its panel.
      if (i === idx && panels[i]?.id) btn.setAttribute('aria-controls', panels[i].id);
      else btn.removeAttribute('aria-controls');
    });
    panels.forEach((panel, i) => {
      panel.hidden = i !== idx;
    });
  }

  const allTabsets = Array.from(document.querySelectorAll('[data-tabset]'));

  allTabsets.forEach((tabset) => {
    const tabsetName = tabset.getAttribute('data-tabset');
    const buttons = ownElements(tabset, '[role="tab"]');
    if (!buttons.length) return;

    // The server render leaves every tab at tabindex="-1" until hydration.
    const selected = buttons.find((btn) => btn.getAttribute('aria-selected') === 'true') || buttons[0];
    activateTabById(tabset, selected.getAttribute('data-key'));

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const selectedTabId = btn.getAttribute('data-key');
        if (!selectedTabId) return;

        // Sync all tabsets on the page that share the same tabset name
        const targets = allTabsets.filter((ts) => ts.getAttribute('data-tabset') === tabsetName);

        targets.forEach((ts) => activateTabById(ts, selectedTabId));
      });
    });
  });
})();
