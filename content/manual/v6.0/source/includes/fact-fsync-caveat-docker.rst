MongoDB requires a filesystem that supports ``fsync()``
*on directories*. Data created by unsupported MongoDB images in Docker 
may not persist between reboots on Windows and OSX.
