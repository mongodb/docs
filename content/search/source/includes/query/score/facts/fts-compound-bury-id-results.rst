The movie documents in the results contain the query term ``ghost``
in the ``plot`` or ``title`` field and don't have the specified
ObjectIds in the ``_id`` field. |fts| didn't return the documents
with the specified ObjectsIds, even though they contain the query
term ``ghost`` in the ``title`` field, because the query reduced
the score of these documents by 50% and so, these documents didn't
rank in the top 10 documents.
