When using two or more :operator:`$in` expressions, the product of the
number of **distinct** elements in the :operator:`$in` arrays must be
less than 4000000. Otherwise, MongoDB will throw an exception of
``"combinatorial limit of $in partitioning of result set exceeded"``.
