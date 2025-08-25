
    const shouldCompact = (totalBytes, usedBytes) => {
      // totalBytes refers to the size of the file on disk in bytes (data + free space)
      // usedBytes refers to the number of bytes used by data in the file

      // Compact if the file is over 100MB in size and less than 50% 'used'
      const oneHundredMB = 100 * 1024 * 1024;
      return totalBytes > oneHundredMB && usedBytes / totalBytes < 0.5;
    };
    const config = { shouldCompact };

    let realm = await Realm.open(config);

