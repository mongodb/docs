Indexes improve read performance, but a large number of indexes can
negatively impact write performance since indexes must be updated during
writes. It is important to consider this tradeoff when deciding whether
to create new indexes for a collection. Examine whether a query for such
a collection can be modified to take advantage of existing indexes, as
well as whether a query occurs often enough to justify the cost of a new
index.