/**
 * Offline collapsible — injected into every HTML page by build-offline.ts.
 *
 * The Collapsible component renders as a <details>/<summary> pair with a
 * React-managed button inside. The <summary> calls e.preventDefault() to
 * suppress the native browser toggle so React state can control open/closed.
 * Because React never hydrates in the offline build, the prevention fires
 * but no state update follows, leaving the toggle inert.
 *
 * This script restores the behaviour: clicking the button (or anywhere on
 * the summary) toggles the <details> open attribute. CSS handles the chevron
 * direction via a rotate transform on details:not([open]).
 */
(function () {
  document.querySelectorAll('details.offline-collapsible').forEach(function (details) {
    var summary = details.querySelector('summary');
    if (!summary) return;

    summary.addEventListener('click', function (e) {
      e.preventDefault();
      details.open = !details.open;
    });
  });
})();
