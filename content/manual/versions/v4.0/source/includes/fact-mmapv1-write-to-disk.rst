In the default configuration for the :doc:`MMAPv1 storage engine
</core/mmapv1>`, MongoDB writes to the data files on disk every 60
seconds and writes to the :term:`journal` files roughly every 100
milliseconds. 

To change the interval for writing to the data files, use the
:setting:`storage.syncPeriodSecs` setting. For the journal files, see
:setting:`storage.journal.commitIntervalMs` setting.

These values represent the *maximum* amount of time between the
completion of a write operation and when MongoDB writes to the data
files or to the journal files. In many cases MongoDB and the operating
system flush data to disk more frequently, so that the above values
represents a theoretical maximum.
