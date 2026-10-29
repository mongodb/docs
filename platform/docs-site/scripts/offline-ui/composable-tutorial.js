/**
 * Offline composable tutorials — injected into every HTML page by build-offline.ts that has composable tutorials.
 *
 * In offline builds, React never hydrates so ComposableContext is never updated
 * and no content would be visible. This script replaces that React state management
 * with vanilla JS using data attributes stamped onto the DOM at build time:
 *
 *   data-option-value               on .configurable-option (the option key, e.g. "llm_provider")
 *   data-default                    on .configurable-option (the option's default choice)
 *   data-dependencies               on .configurable-option (JSON array of dependency objects)
 *   data-selection-value            on .configurable-option (tracks current selected value, mutable)
 *   data-selections                 on .composable-content (JSON of required selections)
 *
 * Each .configurable-option's choices are [role="option"] items keyed by data-key, in [data-offline-list].
 */
(function () {
  // Via styles selection from these attributes.
  function markSelected(configurableOption, option) {
    const list = configurableOption.querySelector('[data-offline-list]');
    const checkTemplate = list?.querySelector('template[data-offline-check]');
    list?.querySelectorAll('[role="option"]').forEach((opt) => {
      const isSelected = opt === option;
      opt.setAttribute('aria-selected', String(isSelected));
      opt.setAttribute('data-selected', String(isSelected));
      opt.querySelector(':scope > [slot="check"]')?.remove();
      if (isSelected && checkTemplate) opt.append(checkTemplate.content.cloneNode(true));
    });

    const valueEl = configurableOption.querySelector('[aria-haspopup="listbox"] span');
    if (valueEl) {
      valueEl.replaceChildren(
        ...Array.from(option.childNodes)
          .filter((node) => !(node instanceof Element && node.getAttribute('slot') === 'check'))
          .map((node) => node.cloneNode(true)),
      );
      valueEl.removeAttribute('data-placeholder');
    }
  }

  // Compare directly so option values never need selector escaping.
  function findOption(configurableOption, value) {
    return Array.from(configurableOption.querySelectorAll('[data-offline-list] [role="option"]')).find(
      (option) => option.getAttribute('data-key') === value,
    );
  }

  // Falls back to the first choice; offline can't check the default has content, as the live site does.
  function defaultOption(configurableOption) {
    const fallback = configurableOption.querySelector('[data-offline-list] [role="option"]');
    const value = configurableOption.dataset['default'];
    return (value && findOption(configurableOption, value)) || fallback;
  }

  function setOpen(configurableOption, open) {
    const list = configurableOption.querySelector('[data-offline-list]');
    const trigger = configurableOption.querySelector('[aria-haspopup="listbox"]');
    if (list) list.hidden = !open;
    trigger?.setAttribute('aria-expanded', String(open));
  }

  function applySelections(configurableOptions, contents) {
    const currentSelections = {};

    for (const opt of configurableOptions) {
      const key = opt.dataset['optionValue'] ?? '';
      let dependencies = [];
      try {
        dependencies = JSON.parse(opt.dataset['dependencies'] ?? '[]');
      } catch {
        // ignore parse errors
      }

      // Matches showComposable: a dependency on "none" always passes.
      const dependencyMet = dependencies.every((dep) =>
        Object.entries(dep).every(([k, v]) => String(v).toLowerCase() === 'none' || currentSelections[k] === v),
      );

      if (!dependencyMet) {
        opt.setAttribute('hidden', 'true');
        continue;
      }

      opt.removeAttribute('hidden');
      const option = findOption(opt, opt.dataset['selectionValue'] ?? '') ?? defaultOption(opt);
      if (!option) continue;
      const value = option.getAttribute('data-key') ?? '';
      opt.dataset['selectionValue'] = value;
      currentSelections[key] = value;
      markSelected(opt, option);
    }

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
  }

  document.addEventListener('DOMContentLoaded', () => {
    const composables = Array.from(document.querySelectorAll('.offline-composable'));

    for (const composable of composables) {
      const configurableOptions = Array.from(composable.querySelectorAll('.configurable-option'));
      // Exclude the [data-selections] on the .offline-composable root itself.
      const contents = Array.from(composable.querySelectorAll('.composable-content[data-selections]'));

      for (const configurableOption of configurableOptions) {
        const trigger = configurableOption.querySelector('[aria-haspopup="listbox"]');
        const list = configurableOption.querySelector('[data-offline-list]');

        trigger?.addEventListener('click', () => setOpen(configurableOption, !!list?.hidden));

        list?.querySelectorAll('[role="option"]').forEach((option) => {
          option.addEventListener('click', () => {
            configurableOption.dataset['selectionValue'] = option.getAttribute('data-key') ?? '';
            setOpen(configurableOption, false);
            applySelections(configurableOptions, contents);
          });
        });

        document.addEventListener('click', (event) => {
          if (!configurableOption.contains(event.target)) setOpen(configurableOption, false);
        });
      }

      applySelections(configurableOptions, contents);
    }
  });
})();
