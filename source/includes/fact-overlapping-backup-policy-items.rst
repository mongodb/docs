If overlapping policy items generate the same snapshot, Atlas
associates the snapshot with the policy item with the longest retention
time.

.. example::

   If the policy specifies a daily snapshot with a retention of two
   days and a weekly snapshot every Saturday with a retention of three
   weeks, Atlas must choose which frequency unit to associate with the
   snapshot taken on Saturday, hourly or weekly.

Since the retention time for the weekly policy item is longer than that
specified for the hourly policy item, Atlas displays a frequency of
:guilabel:`Weekly` in the :guilabel:`Frequency` column on the
:guilabel:`Snapshots` page for the snapshot taken on Saturday.
