Both operations return the following:

.. code-block:: javascript
   :copyable: false

   { "_id" : 1, "category" : "café", "resultObject" : null }
   { "_id" : 2, "category" : "cafe", "resultObject" : { "match" : "cafe", "idx" : 0, "captures" : [ ] } }
   { "_id" : 3, "category" : "cafE", "resultObject" : null }

Because the query ignores the collation, it requires an exact match on
the ``category`` string (including case and accent marks), meaning only
document ``_id: 2`` is matched.
