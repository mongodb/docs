/**
 * Offline sidenav collapsible — injected into every HTML page by build-offline.ts.
 *
 * The Via sidenav (.offline-collapsible-nav-tree) is a React Aria Tree: rows are
 * flat siblings with aria-level, and offline builds render every section
 * expanded. React never hydrates, so this script collapses sections off the
 * current page's path and wires the toggles.
 */
(function () {
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
