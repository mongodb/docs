When you execute an :method:`~db.collection.update()` with ``upsert: true`` and
the query matches no existing document, MongoDB will refuse to insert a new
document if the query specifies conditions on the ``_id`` field using
:ref:`dot notation <document-dot-notation>`.

.. end-short-description

This restriction ensures that the order of fields embedded in the ``_id``
document is well-defined and not bound to the order specified in the query

If you attempt to insert a document in this way, MongoDB will raise an error.
