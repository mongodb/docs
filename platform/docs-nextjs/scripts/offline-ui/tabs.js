/**
 * Offline tabs — injected into every HTML page by build-offline.ts.
 *
 * LeafyGreen Tabs sets aria-selected, aria-controls, and panel visibility
 * only after client-side React hydration. Since the offline build strips all
 * _next/ JS bundles, React never hydrates and tabs are stuck in an
 * uninitialized state (all aria-selected="false", all panels hidden).
 *
 * This script re-activates tabs with vanilla JS using the stable data-lgid
 * attributes LeafyGreen adds to the DOM, avoiding hashed class names that
 * can change between builds.
 *
 * Tab syncing mirrors TabContext, so clicking a tab updates every tabset on
 * the page that shares the same name.
 */
(function () {
  // Get the tabset name from the CSS class list.
  function getTabsetName(tabset) {
    return Array.from(tabset.classList).find(function (cls) {
      return !cls.startsWith('leafygreen-ui-') && !cls.startsWith('lg-');
    });
  }

  // Override the default LeafyGreen tab activation behavior to use the tabset name.
  function activateTabById(tabset, selectedTabId) {
    const buttons = Array.from(tabset.querySelectorAll('[data-lgid="lg-tabs-tab_list"] [role="tab"]'));
    const panels = Array.from(tabset.querySelectorAll('[data-lgid="lg-tabs-tab_panels"] [role="tabpanel"]'));
    const idx = buttons.findIndex((btn) => btn.getAttribute('data-tabid') === selectedTabId);
    if (idx === -1) return;
    buttons.forEach((btn, i) => {
      btn.setAttribute('aria-selected', i === idx ? 'true' : 'false');
      btn.setAttribute('tabindex', i === idx ? '0' : '-1');
    });
    panels.forEach((panel, i) => {
      panel.style.display = i === idx ? 'block' : 'none';
    });
  }

  // Find all tabsets on the page and activate the first tab in each.
  const allTabsets = Array.from(document.querySelectorAll('[data-lgid="lg-tabs"]'));

  allTabsets.forEach((tabset) => {
    const buttons = Array.from(tabset.querySelectorAll('[data-lgid="lg-tabs-tab_list"] [role="tab"]'));
    if (!buttons.length) return;

    // Initialize each tabset to its first tab
    const firstTabId = buttons[0].getAttribute('data-tabid');
    if (firstTabId) activateTabById(tabset, firstTabId);

    const tabsetName = getTabsetName(tabset);

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const selectedTabId = btn.getAttribute('data-tabid');
        if (!selectedTabId) return;

        // Sync all tabsets on the page that share the same tabset name
        const targets = tabsetName ? allTabsets.filter((ts) => getTabsetName(ts) === tabsetName) : [tabset];

        targets.forEach((ts) => activateTabById(ts, selectedTabId));
      });
    });
  });
})();
