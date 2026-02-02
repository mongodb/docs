If overlapping policy items generate the same snapshot, Atlas
associates the snapshot with the policy item with the longest retention
time.

For example, if the policy specifies a daily snapshot with two-day retention
and a weekly snapshot every Saturday with three-week retention, then |service| 
displays a frequency of :guilabel:`Weekly` in the :guilabel:`Frequency` column
on the :guilabel:`Snapshots` page for the snapshot taken on Saturday and 
retains the snapshot for three weeks. This is because the weekly policy item has a longer
retention time than the daily policy item. 