If overlapping policy items generate the same snapshot, Atlas
associates the snapshot with the policy item with the longest retention
time.

.. example::

   The policy specifies a daily snapshot with two-day retention and a 
   weekly snapshot every Saturday with three-week retention. Since the 
   retention time for the weekly policy item is longer than that 
   specified for the hourly policy item, Atlas displays a frequency of 
   :guilabel:`Weekly` in the :guilabel:`Frequency` column on the
   :guilabel:`Snapshots` page for the snapshot taken on Saturday and
   retains it for three weeks.