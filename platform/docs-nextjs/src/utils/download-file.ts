const fetchAndSaveFile = async (url: string, filename: string) => {
  try {
    // Fetch the resource
    const response = await fetch(url);

    // Ensure the fetch was successful
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Convert the response to a Blob
    const blob = await response.blob();

    // Create a temporary object URL
    const objectURL = URL.createObjectURL(blob);
    const a = Object.assign(document.createElement('a'), {
      href: objectURL,
      download: filename,
    });

    // Trigger the download
    a.click();

    // Cleanup: revoke the object URL
    URL.revokeObjectURL(objectURL);
  } catch (error) {
    console.error('Error fetching and saving the file:', error);
    throw error;
  }
};

export default fetchAndSaveFile;
