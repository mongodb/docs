Querying with two or more :query:`$in` expressions (e.g. ``{ a: { $in:
[ "a", "b", "c" ] }, b: { $in: [ "b", "c" ] } }`` ) can hit a
combinatorial limit if the query uses a compound index on these fields
(e.g. ``{ a: 1, b: 1 }`` ). Specifically, if the number of combinations
(i.e. the product of the number of **distinct** elements in the
respective arrays) is equal to or greater than 4000000, MongoDB will
throw an exception of ``"combinatorial limit of $in partitioning of
result set exceeded"``.
