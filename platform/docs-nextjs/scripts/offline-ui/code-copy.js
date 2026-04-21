/**
 * Offline code copy button — injected into every HTML page by build-offline.ts.
 *
 * When building offline, Code.tsx adds a custom <IconButton aria-label="Copy">
 * to each code block's customActionButtons so it is present in the SSR output.
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
