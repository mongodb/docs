The |fts| results contain movies with ``car`` and ``automobile`` in
the ``title`` field although the query term is ``automobile``
because we configured ``automobile`` to be a synonym of ``car``,
``vehicle``, and ``automobile`` in the synonyms source collection
named ``sample_synonyms``, which is specified in the index for the
collection. |fts| returns the same results for a search of the
words ``car`` and ``vehicle``. To test this, replace the value of
the ``query`` field in the query above with either ``car`` or
``vehicle`` and run the query.
