Indexes improve read performance, but a large number of indexes can
negatively impact write performance since indexes must be updated during
writes. If your collection already has several indexes, consider this
tradeoff of read and write performance when deciding whether to create
new indexes. Examine whether a query for such a collection can be
modified to take advantage of existing indexes, as well as whether a
query occurs often enough to justify the cost of a new index.
