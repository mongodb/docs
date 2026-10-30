// Offline bundles are several hundred MB. Let the browser stream them straight
// from the CDN instead of buffering them in memory via fetch + Blob.
const fetchAndSaveFile = (url: string, filename: string): void => {
  const a = Object.assign(document.createElement('a'), {
    href: url,
    download: filename,
  });
  document.body.appendChild(a);
  a.click();
  a.remove();
};

export default fetchAndSaveFile;
