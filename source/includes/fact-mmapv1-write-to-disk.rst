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

While MongoDB writes to journal files promptly, MongoDB writes to the
data files lazily. MongoDB may wait to write data to the data files for
as much as one minute by default. This does not affect durability, as
the journal has enough information to ensure crash recovery.
 
This "lazy" strategy provides advantages in situations where the
database receives a thousand increments to an object within one second.
With this "lazy" strategy, MongoDB only needs to flush this data to
disk once. To modify this strategy, you can use :dbcommand:`fsync` and
:doc:`/reference/write-concern` as well as modify the aforementioned
configuration options.
