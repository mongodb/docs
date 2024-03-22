.. _mongoc_collection_update_one

mongoc_collection_update_one()
==============================

Synopsis
--------

.. code-block:: c

  bool
  mongoc_collection_update_one (mongoc_collection_t *collection,
                                const bson_t *selector,
                                const bson_t *update,
                                const bson_t *opts,
                                bson_t *reply,
                                bson_error_t *error);

Parameters
----------

* ``collection``: A :ref:`mongoc_collection_t`.
* ``selector``: A :ref:`bson:bson_t` containing the query to match the document for updating.
* ``update``: A :ref:`bson:bson_t` containing the update to perform. If updating with a pipeline, a :ref:`bson:bson_t` array.
* ``reply``: A ``bson_t-opt-storage-ptr`` to contain the results.
* ``error``: An optional location for a :symbol:`bson_error_t <errors>` or ``NULL``.

.. ``opts-source`` replace:: ``collection``

.. include:: includes/update-one-opts.txt

Description
-----------

This function updates at most one document in ``collection`` that matches ``selector``.

To update multiple documents see :ref:`mongoc_collection_update_many`.

If you pass a non-NULL ``reply``, it is filled out with fields  ``matchedCount``, ``modifiedCount``, and optionally ``upsertedId`` if applicable. If there is a server error then ``reply`` contains either a "writeErrors" array with one subdocument or a "writeConcernErrors" array. The reply must be freed with :ref:`bson:bson_destroy`.

Errors
------

Errors are propagated via the ``error`` parameter.

Returns
-------

Returns ``true`` if successful. Returns ``false`` and sets ``error`` if there are invalid arguments or a server or network error.

A write concern timeout or write concern error is considered a failure.

Example
-------
.. literalinclude:: ../examples/example-update.c
   :language: c
   :caption: example-update.c

.. seealso::

  | `MongoDB update command documentation <https://www.mongodb.com/docs/manual/reference/command/update/>`_ for more information on the update options.

  | :ref:`mongoc_collection_update_many`

  | :ref:`mongoc_collection_replace_one`

