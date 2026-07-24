/**
 * Offline composable tutorials — injected into every HTML page by build-offline.ts that has composable tutorials.
 *
 * In offline builds, React never hydrates so ComposableContext is never updated
 * and no content would be visible. This script replaces that React state management
 * with vanilla JS using data attributes stamped onto the DOM at build time:
 *
 *   data-selections="{}"            on .offline-composable (tutorial root)
 *   data-option-value               on .configurable-option (the option key, e.g. "llm_provider")
 *   data-dependencies               on .configurable-option (JSON array of dependency objects)
 *   data-selection-value            on .configurable-option (tracks current selected value, mutable)
 *   data-value / data-text          on .offline-select-choice <li> items
 *   data-selections                 on .composable-content (JSON of required selections)
 *
 * The .offline-composable-select <ul> is the OfflineMenu component rendered alongside
 * the LeafyGreen Select. Clicking the LG trigger toggles it; clicking a list item
 * selects that option, updates dependent options, and shows the matching content blocks.
 */
(function () {
  function updateSelectButtonText(selectButton, text) {
    const divs = selectButton?.querySelectorAll('div');
    const buttonText = divs ? divs[divs.length - 1] : undefined;
    if (selectButton && buttonText) {
      buttonText.innerText = text;
    }
  }

  // Returns the [value, text] of the first list item in the option's offline menu
  // and hides the menu. Called when a dependent option becomes visible without a
  // previously stored selection value.
  function autoSelectFirstOption(configurableOption) {
    const firstItem = configurableOption.querySelector('li.offline-select-choice');
    const menu = configurableOption.querySelector('.offline-composable-select');
    if (menu) menu.setAttribute('hidden', 'true');
    return firstItem?.dataset['value'] && firstItem?.dataset['text']
      ? [firstItem.dataset['value'], firstItem.dataset['text']]
      : ['', ''];
  }

  function onSelectListItem(listItem, contents, menu, configurableOptions, currentIdx, selectButton) {
    const currentSelections = {};

    const selectedOptionValue = listItem.dataset['value'];
    const configurableOption = configurableOptions[currentIdx];
    const optionValue = configurableOption.dataset['optionValue'];
    if (optionValue && selectedOptionValue) {
      currentSelections[optionValue] = selectedOptionValue;
      configurableOption.dataset['selectionValue'] = selectedOptionValue;
    }

    for (let idx = 0; idx < configurableOptions.length; idx++) {
      if (idx === currentIdx) continue;

      const opt = configurableOptions[idx];
      const optBtn = opt.querySelector('button');
      const key = opt.dataset['optionValue'] ?? '';

      if (idx < currentIdx) {
        // Preceding options: read their stored values into currentSelections.
        const value = opt.dataset['selectionValue'] ?? '';
        currentSelections[key] = value;
        continue;
      }

      // Subsequent options: check if their dependencies are met.
      let dependencies = [];
      try {
        dependencies = JSON.parse(opt.dataset['dependencies'] ?? '[]');
      } catch {
        // ignore parse errors
      }

      const dependencyMet = dependencies.every((dep) =>
        Object.entries(dep).every(([k, v]) => currentSelections[k] === v),
      );

      if (dependencyMet) {
        let value = opt.dataset['selectionValue'] ?? '';
        let text = optBtn?.innerText ?? '';
        if (!value) {
          [value, text] = autoSelectFirstOption(opt);
        }
        if (optBtn) updateSelectButtonText(optBtn, text);
        currentSelections[key] = value;
        opt.removeAttribute('hidden');
      } else {
        opt.setAttribute('hidden', 'true');
      }
    }

    // Show content blocks whose required selections are all satisfied.
    for (const contentEl of contents) {
      let requiredSelections = {};
      try {
        requiredSelections = JSON.parse(contentEl.dataset['selections'] ?? '{}');
      } catch {
        // ignore parse errors
      }

      const requirementsMet = Object.entries(requiredSelections).every(
        ([key, value]) => String(value).toLowerCase() === 'none' || currentSelections[key] === value,
      );

      if (requirementsMet) {
        contentEl.removeAttribute('hidden');
      } else {
        contentEl.setAttribute('hidden', 'true');
      }
    }

    if (selectButton) updateSelectButtonText(selectButton, listItem.innerText);
    menu.setAttribute('hidden', 'true');
  }

  function onMenuButtonClick(selectButton, menu) {
    const width = selectButton.clientWidth;
    // OfflineMenu renders div.offline-composable-select > ul; toggle hidden on the wrapping div.
    const isHidden = menu?.hasAttribute('hidden');
    if (isHidden) {
      menu?.removeAttribute('hidden');
    } else {
      menu?.setAttribute('hidden', 'true');
    }
    if (menu) menu.style.width = `${width}px`;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const composables = Array.from(document.querySelectorAll('.offline-composable'));

    for (const composable of composables) {
      const configurableOptions = Array.from(composable.querySelectorAll('.configurable-option'));
      // Exclude the [data-selections] on the .offline-composable root itself.
      const contents = Array.from(composable.querySelectorAll('.composable-content[data-selections]'));

      for (let idx = 0; idx < configurableOptions.length; idx++) {
        const configurableOption = configurableOptions[idx];
        const selectButton = configurableOption.querySelector('button');
        // OfflineMenu: div.offline-composable-select wrapping the ul
        const menu = configurableOption.querySelector('.offline-composable-select');

        selectButton?.addEventListener('click', () => {
          onMenuButtonClick(selectButton, menu ?? undefined);
        });

        const listItems = Array.from(menu?.querySelectorAll('li.offline-select-choice') ?? []);

        for (let itemIdx = 0; itemIdx < listItems.length; itemIdx++) {
          const listItem = listItems[itemIdx];
          listItem.addEventListener('click', () => {
            onSelectListItem(listItem, contents, menu, configurableOptions, idx, selectButton ?? undefined);
          });

          // Auto-select the first option of the first dropdown to show default content on load.
          if (idx === 0 && itemIdx === 0) {
            listItem.click();
          }
        }
      }
    }
  });
})();
