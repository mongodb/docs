// Set a max file size equal to 100MB in bytes
val maxFileSize = 100 * 1024 * 1024

val config = RealmConfiguration.Builder(setOf(King::class))
    .compactOnLaunch{ totalBytes, usedBytes ->
        // totalBytes refers to the size of the file on disk in bytes (data + free space)
        // usedBytes refers to the number of bytes used by data in the file

        // Compact if the file is over the max file size and less than 50% 'used'
        (totalBytes > maxFileSize) && ((usedBytes / totalBytes) < 0.5)
    }
    .build()

val realm: Realm = Realm.open(config)
