If overlapping policy items generate the same snapshot, |service| associates
the snapshot with the policy item with the longest retention time. For example,
if the policy specifies a daily snapshot with a retention of two days and a weekly
snapshot every Saturday with a retention of three weeks, |service| must choose
which frequency unit to associate with the snapshot taken on Saturday, hourly or weekly.
Since the frequency interval for the weekly policy item is larger than that specified
for the hourly policy item, |service| displays a frequency of :guilabel:`Weekly`
in the :guilabel:`Frequency` column on the :guilabel:`Snapshots` page for the snapshot
taken on Saturday.