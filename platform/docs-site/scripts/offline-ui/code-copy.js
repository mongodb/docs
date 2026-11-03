/**
 * Offline code copy button — injected into every HTML page by build-offline.ts.
 *
 * When building offline, Code.tsx renders a persistent <Button aria-label="Copy">
 * in each code block so it is present in the SSR output.
 * Because React never hydrates in the offline build, the button's onClick
 * handler never runs. This script wires up the Clipboard API click handler.
 */
(function () {
  document.querySelectorAll('.intro-code-block').forEach(function (codeBlock) {
    const copyBtn = codeBlock.querySelector('[aria-label="Copy"]');
    const codeEl = codeBlock.querySelector('code');
    if (!copyBtn || !codeEl) return;

    copyBtn.addEventListener('click', function () {
      if (navigator && navigator.clipboard) {
        navigator.clipboard.writeText(codeEl.innerText);
      }
    });
  });
})();
