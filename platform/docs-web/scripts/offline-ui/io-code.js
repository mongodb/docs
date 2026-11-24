/**
 * Offline IO code — injected into every HTML page by build-offline.ts.
 *
 * The IoCodeBlock component uses React state to show/hide the output panel
 * and update the button text/icon. Because React never hydrates in the
 * offline build, clicking the button does nothing.
 *
 * This script restores the toggle behaviour using the stable data-io-toggle
 * and data-io-output attributes added to the rendered markup.
 */
(function () {
  document.querySelectorAll('[data-io-toggle]').forEach(function (toggleBar) {
    var btn = toggleBar.querySelector('[data-lgid="lg-button"]');
    var outputWrapper = toggleBar.nextElementSibling;

    if (!btn || !outputWrapper) return;

    var span = btn.querySelector('span');
    var svg = btn.querySelector('svg');

    btn.addEventListener('click', function () {
      var isHidden = outputWrapper.style.display === 'none';
      if (isHidden) {
        outputWrapper.style.display = '';
        if (span) span.textContent = 'HIDE OUTPUT';
        if (svg) svg.style.transform = '';
      } else {
        outputWrapper.style.display = 'none';
        if (span) span.textContent = 'VIEW OUTPUT';
        if (svg) svg.style.transform = 'rotate(180deg)';
      }
    });
  });
})();
