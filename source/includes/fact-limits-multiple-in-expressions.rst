When using two or more :query:`$in` expressions, the product of the
number of **distinct** elements in the :query:`$in` arrays must be
less than 4000000. Otherwise, MongoDB will throw an exception of
``"combinatorial limit of $in partitioning of result set exceeded"``.
