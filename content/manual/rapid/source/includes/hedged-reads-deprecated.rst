Starting in MongoDB 8.0, hedged reads are deprecated. Queries that
specify the read preference :readmode:`nearest` no longer use hedged
reads by default. If you explicitly specify a hedged read, MongoDB
performs a hedged read and logs a warning.
