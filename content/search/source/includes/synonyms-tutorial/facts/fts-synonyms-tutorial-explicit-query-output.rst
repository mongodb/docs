The |fts| results contain movies with ``boat``, ``vessel``, and
``sail`` in the ``title`` field because we configured ``boat``,
``vessel``, and ``sail`` to be synonyms of ``boat`` in the synonyms
source collection named ``sample_synonyms``, which is specified in
the index for the collection.

|fts| returns the following documents only for a search of the word
``vessel`` in the results:

.. code-block:: json
   :copyable: false

   { "title" : "Vessel", "score" : 5.373150825500488 }
   { "title" : "Broken Vessels", "score" : 4.3452959060668945 }

|fts| doesn't include documents with either ``boat`` or ``sail`` in
the ``title`` field in the results because we didn't configure
``vessel`` to be a synonym of either ``boat`` or ``sail`` in the
synonyms source collection. To test this, replace the value of the
``query`` field in the query above with ``vessel`` and run the
query again.

Similarly, |fts| returns the following documents only in the
results for a search of the term ``sail``:

.. code-block:: json
   :copyable: false

   { "title" : "And the Ship Sails On", "score" : 4.3452959060668945 }
   { "title" : "Sailing to Paradise", "score" : 4.3452959060668945 }

|fts| doesn't include documents with either ``boat`` or ``vessel``
in the ``title`` field in the results because we didn't configure
``sail`` to be a synonym of either ``boat`` or ``vessel`` in the
synonyms source collection. To test this example, replace the value
of the ``query`` field in the query above with ``sail`` and run the
query again.
