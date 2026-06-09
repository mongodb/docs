The movie documents in the results contain the query term ``ghost``
in the ``plot`` or ``title`` field and aren't in the ``Comedy``
genre. |fts| didn't return documents in the ``Comedy`` genre with
the term ``ghost`` in the ``plot`` or ``title`` field because those
documents didn't rank in the top 10 documents since the query
reduced the score of those documents by 50%.
