config = new RealmConfiguration()
{
    ShouldCompactOnLaunch = (totalBytes, usedBytes) =>
    {
        /* totalBytes refers to the size of the file on disk in 
         * bytes (data + free space).
         * usedBytes refers to the number of bytes used by 
         * the realm file
         */

        // Compact if the file is over 100MB in size and less
        // than 50% 'used'

        var oneHundredMB = 100 * 1024 * 1024;

        return (totalBytes > (double)oneHundredMB) &&
            ((double)usedBytes / totalBytes < 0.5);
    }
};
var realm = await Realm.GetInstanceAsync(config);
