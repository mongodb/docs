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
 *
 * Selector dropdowns hide their tabset's tabs, so [data-offline-selector] options switch the tabset by data-key.
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

  document.querySelectorAll('[data-offline-selector]').forEach((selector) => {
    const tabsetName = selector.getAttribute('data-offline-selector');
    const trigger = selector.querySelector('[aria-haspopup="listbox"]');
    const list = selector.querySelector('[data-offline-list]');
    const checkTemplate = selector.querySelector('template[data-offline-check]');
    if (!trigger || !list) return;

    const tabsets = allTabsets.filter((ts) => ts.getAttribute('data-tabset') === tabsetName);
    const options = Array.from(list.querySelectorAll('[role="option"]'));

    const setOpen = (open) => {
      list.hidden = !open;
      trigger.setAttribute('aria-expanded', String(open));
    };

    // Via styles selection from these attributes.
    const select = (option) => {
      options.forEach((opt) => {
        const isSelected = opt === option;
        opt.setAttribute('aria-selected', String(isSelected));
        opt.setAttribute('data-selected', String(isSelected));
        opt.querySelector(':scope > [slot="check"]')?.remove();
        if (isSelected && checkTemplate) opt.append(checkTemplate.content.cloneNode(true));
      });

      const valueEl = trigger.querySelector('span');
      if (valueEl) {
        valueEl.replaceChildren(
          ...Array.from(option.childNodes)
            .filter((node) => !(node instanceof Element && node.getAttribute('slot') === 'check'))
            .map((node) => node.cloneNode(true)),
        );
        valueEl.removeAttribute('data-placeholder');
      }
    };

    // The static export renders nothing selected, so start on the tab activated above.
    const activeKey = tabsets[0]?.querySelector('[role="tab"][aria-selected="true"]')?.getAttribute('data-key');
    const initial = options.find((opt) => opt.getAttribute('data-key') === activeKey);
    if (initial) select(initial);

    trigger.addEventListener('click', () => setOpen(list.hidden));

    options.forEach((option) => {
      option.addEventListener('click', () => {
        tabsets.forEach((ts) => activateTabById(ts, option.getAttribute('data-key')));
        select(option);
        setOpen(false);
      });
    });

    document.addEventListener('click', (event) => {
      if (!selector.contains(event.target)) setOpen(false);
    });
  });
})();
