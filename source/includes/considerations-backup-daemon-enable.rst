Excluded Namespaces
+++++++++++++++++++

Excluded namespaces are databases or collections that MMS will not
back up. Exclude name spaces to prevent backing up collections that
contain logging data, caches, or other ephemeral data. By excluding
these kinds of databases and collections will allow you to reduce
backup time and costs.

Snapshot Frequency and Retention Policy
+++++++++++++++++++++++++++++++++++++++

You can take snapshots every 6, 8, 12, or 24 hours and save them for 2-5
days. MMS can retain daily snapshots for up to 365 days, weekly snapshots
for up to 52 weeks, and monthly snapshots for up to 36 months.

By default, MMS takes snapshots every 6 hours and stores these for 2 days,
for use in point-in-time restores. Also by default, MMS retains daily
snapshots for a week, weekly snapshots for a month, and monthly snapshots
for a year.

.. only:: onprem

   You can set point-in-time restores going back 1, 2, 3, or 4 days.

Changes to the snapshot schedule will affect your snapshot storage costs. The
longer your snapshot window, the longer it will take to build a point in time
restore.
