When you filter and sort by a field that contains an array, the filter
does not affect the value used as the :term:`sort key`. The sort always
considers all array values as potential sort keys.

For example, the following query finds shoes with sizes greater than 9
and sorts the results by size in ascending order:
