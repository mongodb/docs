Each group of operations can have at most 
:limit:`1000 operations <Write Command Operation Limit Size>`. 
If a group exceeds this :limit:`limit<Write Command Operation Limit Size>`, 
MongoDB will divide the group into
smaller groups of 1000 or less. For example, if the queue consists of 2000 
operations, MongoDB creates 2 groups, each with 1000 operations.

The sizes and grouping mechanics are internal performance details and
are subject to change in future versions.
