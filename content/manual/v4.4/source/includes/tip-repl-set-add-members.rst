When a newly added secondary has its :rsconf:`~members[n].votes` and
:rsconf:`~members[n].priority` settings greater than zero, during
its initial sync, the secondary still counts as a voting member even
though it cannot serve reads nor become primary because its data is
not yet consistent.

This can lead to a case where a majority of the voting members are
online but no primary can be elected. To avoid such situations,
consider adding the new secondary initially with
:rsconf:`priority :0 <members[n].priority>` and :rsconf:`votes :0
<members[n].votes>`. Then, once the member has transitioned into
:replstate:`SECONDARY` state, use :method:`rs.reconfig()` to update its
priority and votes.
