In these results, the characters ``inter`` appear at the end of a
word in the ``title`` or ``plot`` field. |fts| returns results that
end with the specified query string because |fts| matches the query
term to the tokens that it creates for the ``title`` and ``plot``
fields starting from the right side of the words as delimited by
the analyzer.
