|fts| returns documents that contain the term ``Gravity`` in the
``title`` field. The ``count`` field in the results indicate the number
of documents in the collection with the same title. In the results,
|fts| found three documents in the collection with ``Gravity`` as its
title, but |fts| ommited the duplicate titles and only returned one
matching document.

If you want to see the duplicate titles as shown in the results below, 
run the preceding :ref:`autocomplete-ref` operator query using 
:pipeline:`$search` without :ref:`fts-facet-ref`. 
