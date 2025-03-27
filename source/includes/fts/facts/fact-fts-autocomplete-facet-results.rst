|fts| returns documents that contain the term ``Gravity`` in the
``title`` field. The ``count`` field in the results indicate the number
of documents in the collection with the same title. In the results,
|fts| found three documents in the collection with ``Gravity`` as its
title, but |fts| omitted the duplicate titles and returned only one
matching document.

If you want to see the duplicate titles as shown in the results below, 
run the preceding :ref:`autocomplete-ref` operator query 
without :ref:`facets <fts-facet-ref>` and use 
the :pipeline:`$search` stage instead. You must also use the 
:pipeline:`$project` stage to exclude all fields except ``title``.
