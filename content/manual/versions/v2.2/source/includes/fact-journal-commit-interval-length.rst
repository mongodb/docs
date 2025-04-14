The default journal commit interval is 100 milliseconds if a single
block device (e.g. physical volume, RAID device, or LVM volume)
contains both the journal and the data files.

If the journal and data files are on file systems associated with
different block devices the default journal commit interval is 30
milliseconds.
