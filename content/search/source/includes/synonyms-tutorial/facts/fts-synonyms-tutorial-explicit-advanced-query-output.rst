The |fts| results contain documents for both the search terms. The
results contain movies with ``vessel``, ``boat``, and ``sail`` in
the ``title`` field for the query term ``boat`` because we
configured ``boat`` to be a synonym of ``boat``, ``vessel``, and
``sail`` in the synonyms source collection named
``transport_synonyms``.

|fts| doesn't include documents with either ``boat`` or ``sail`` in
the ``title`` field in the results for a search of the term
``vessel`` because we didn't configure ``vessel`` to be a synonym
of either ``boat`` or ``sail`` in the synonyms source collection.
Similary, |fts| doesn't include documents with either ``boat`` or
``vessel`` in the ``title`` field in the results for a search of
the term ``sail`` because we didn't configure ``sail`` to be a
synonym of either ``boat`` or ``vessel`` in the synonyms source
collection. To test these examples, replace the value of the
``query`` field in the query above with ``vessel`` or ``sail`` and
run the query again.

The result also contains movies with ``fedora`` and ``hat`` in the
title field for the query term ``hat`` because we configured
``hat`` to be a synonym of ``hat``, ``fedora``, and ``headgear``
in the synonyms source collection named ``attire_synonyms``.

|fts| doesn't include documents with either ``hat`` or ``fedora``
in the ``title`` field in the results for a search of the term
``headgear`` because we didn't configure ``headgear`` to be a
synonym of either ``hat`` or ``fedora`` in the synonyms source
collection. Similary, |fts| doesn't include documents with either
``hat`` or ``headgear`` in the ``title`` field in the results for
a search of the term ``fedora`` because we didn't configure
``fedora`` to be a synonym of either ``hat`` or ``headgear`` in
the synonyms source collection. To test these examples, replace the
value of the ``query`` field in the query above with ``fedora`` or
``headgear`` and run the query again.
