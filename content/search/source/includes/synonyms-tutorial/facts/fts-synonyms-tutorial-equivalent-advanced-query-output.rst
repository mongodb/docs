The |fts| results contain documents for both the search terms. The
results contain movies with ``car`` in the ``title`` field for the
query term ``automobile`` because we configured ``automobile`` to
be a synonym of ``car``, ``vehicle``, and ``automobile`` in the
synonyms source collection named ``transport_synonyms``. The result
also contains movies with ``dress`` in the title field for the
query term ``attire`` because we configured ``attire`` to be a
synonym of ``dress``, ``apparel``, and ``attire`` in the synonyms
source collection named ``attire_synonyms``.

|fts| returns the same results for a search of ``car`` or
``vehicle`` in the ``transport_synonyms`` source collection and
``dress`` or ``apparel`` in the ``attire_synonyms`` source
collection. To test this example, replace the value of the
``query`` field in the query above with ``car`` or ``vehicle`` and
replace the value of the ``query`` field in the query above with
``dress`` or ``apparel``, and run the query again.
