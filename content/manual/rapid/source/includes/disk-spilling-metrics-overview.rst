|disk-spilling-intro| contain new metrics if the query execution writes
temporary files to disk. These metrics are prefixed by the query
execution stage that caused the query to exceed the memory limit. For
example, ``sortSpills`` indicates the number of times that the sort
stage of query execution wrote temporary files to disk.
