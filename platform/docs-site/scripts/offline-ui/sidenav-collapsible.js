/**
 * Offline sidenav collapsible — injected into every HTML page by build-offline.ts.
 *
 * CollapsibleNavItem renders children only when isOpen=true. In offline builds
 * isOpen is forced to true so all sub-items appear in the static HTML. React
 * never hydrates, so the caret click handler (setIsOpen) is inert.
 *
 * The offline-collapsible-nav class and data-offline-level attribute land on
 * the inner <a>/<div> element, which LeafyGreen wraps in a <li>. Child items
 * are also inner elements inside their own <li> wrappers. Sibling traversal
 * must therefore walk <li> siblings and read the level from the inner element.
 *
 * Only direct children (parentLevel + 1) are toggled by each collapsible.
 * Deeper descendants are managed by their own nested collapsible.
 *
 * The Via sidenav (.offline-collapsible-nav-tree) is a React Aria Tree: rows are
 * flat siblings with aria-level, and offline builds render every section
 * expanded. Sections off the current page's path start collapsed.
 */
(function () {
  document.querySelectorAll('.offline-collapsible-nav[data-offline-level]').forEach((collapsibleEl) => {
    const parentLevel = parseInt(collapsibleEl.getAttribute('data-offline-level'), 10);

    // navEl is the inner <a>/<div> inside and we want the LeafyGreen <li> wrapper.
    const parentLi = collapsibleEl.closest('li');
    if (!parentLi) return;

    // Get list of all direct children of the parent collapsible
    const children = [];
    let siblingLi = parentLi.nextElementSibling;
    while (siblingLi) {
      const getLevelDataElement = siblingLi.querySelector('[data-offline-level]');
      if (!getLevelDataElement) break;
      const sibLevel = parseInt(getLevelDataElement.getAttribute('data-offline-level'), 10);
      if (sibLevel <= parentLevel) break;
      if (sibLevel === parentLevel + 1) children.push(siblingLi);
      siblingLi = siblingLi.nextElementSibling;
    }

    // Start open if the current page is within this section, collapsed otherwise.
    // Check ALL descendants at any depth, not just direct children, so that
    // deeply nested active pages correctly open every ancestor collapsible.
    const containsActivePage = (() => {
      let child = parentLi.nextElementSibling;
      while (child) {
        const levelEl = child.querySelector('[data-offline-level]');
        if (!levelEl) break;
        // If the child is at the same or higher level than the parent, stop checking
        // since its not a tru child of the parent collapsible
        if (parseInt(levelEl.getAttribute('data-offline-level'), 10) <= parentLevel) break;
        if (child.querySelector('[aria-current="page"]')) return true;
        child = child.nextElementSibling;
      }
      return false;
    })();
    const isCurrentSection = collapsibleEl.getAttribute('aria-current') === 'page' || containsActivePage;

    if (isCurrentSection) {
      collapsibleEl.classList.add('nav-open');
    } else {
      children.forEach((c) => {
        c.style.display = 'none';
      });
    }

    const toggleChildren = (isOpen) => {
      children.forEach((c) => {
        c.style.display = isOpen ? '' : 'none';
      });
    };

    // Caret: toggle only, no navigation
    const caret = collapsibleEl.querySelector('svg[aria-label="Caret Down Icon"]');
    if (caret) {
      caret.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleChildren(collapsibleEl.classList.toggle('nav-open'));
      });
    }

    // Clicking the label toggles the section. For tocItems with a 'url'  that navigate
    const isLink = collapsibleEl.tagName === 'A';
    collapsibleEl.addEventListener('click', () => {
      if (isLink && !collapsibleEl.classList.contains('nav-open')) {
        // Opening via navigation: just open, don't close on the destination page.
        collapsibleEl.classList.add('nav-open');
        toggleChildren(true);
      } else {
        toggleChildren(collapsibleEl.classList.toggle('nav-open'));
      }
    });
  });

  document.querySelectorAll('.offline-collapsible-nav-tree [role="treegrid"]').forEach((tree) => {
    const rows = Array.from(tree.querySelectorAll('[role="row"]'));
    const level = (row) => parseInt(row.getAttribute('aria-level'), 10);

    const render = () => {
      let collapsedLevel = Infinity;
      rows.forEach((row) => {
        if (level(row) > collapsedLevel) {
          row.style.display = 'none';
          return;
        }
        row.style.display = '';
        collapsedLevel = row.getAttribute('aria-expanded') === 'false' ? level(row) : Infinity;
      });
    };

    rows.forEach((row, i) => {
      // Non-collapsible sections stay open and don't toggle.
      if (!row.hasAttribute('aria-expanded') || row.hasAttribute('data-always-open')) return;
      let startOpen = !!row.querySelector('[aria-current="page"]');
      for (let j = i + 1; !startOpen && j < rows.length && level(rows[j]) > level(row); j++) {
        startOpen = !!rows[j].querySelector('[aria-current="page"]');
      }
      row.setAttribute('aria-expanded', String(startOpen));

      // The caret and an unlinked row toggle. A linked label opens a closed section and navigates.
      row.addEventListener('click', (e) => {
        const isOpen = row.getAttribute('aria-expanded') === 'true';
        const viaLink = !!e.target.closest('a[href]');
        if (viaLink && isOpen) return;
        row.setAttribute('aria-expanded', String(viaLink || !isOpen));
        render();
      });
    });

    render();
  });
})();
