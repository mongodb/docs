/**
 * Offline collapsible — injected into every HTML page by build-offline.ts.
 *
 * The Collapsible component renders a Via Disclosure whose expanded state
 * lives in React. Because React never hydrates in the offline build, the
 * trigger button does nothing.
 *
 * This script restores the toggle by mirroring what React Aria sets: the
 * root's data-expanded (Via's CSS opens the panel and turns the chevron from
 * it), the button's aria-expanded, and the panel's hidden attribute.
 */
(function () {
  document.querySelectorAll('.offline-collapsible').forEach(function (root) {
    var button = root.querySelector('button[slot="trigger"]');
    var panel = button && document.getElementById(button.getAttribute('aria-controls'));
    if (!panel) return;

    button.addEventListener('click', function () {
      var expand = button.getAttribute('aria-expanded') !== 'true';
      button.setAttribute('aria-expanded', String(expand));
      panel.setAttribute('aria-hidden', String(!expand));
      if (expand) {
        root.setAttribute('data-expanded', 'true');
        panel.removeAttribute('hidden');
      } else {
        root.removeAttribute('data-expanded');
        panel.setAttribute('hidden', '');
      }
    });
  });
})();
