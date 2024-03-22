.. _mongoc_collection_insert

mongoc_collection_insert()
==========================

Synopsis
--------

.. code-block:: c

  bool
  mongoc_collection_insert (mongoc_collection_t *collection,
                            mongoc_insert_flags_t flags,
                            const bson_t *document,
                            const mongoc_write_concern_t *write_concern,
                            bson_error_t *error);

Parameters
----------

* ``collection``: A :ref:`mongoc_collection_t`.
* ``flags``: A :ref:`mongoc_insert_flags_t`.
* ``document``: A :ref:`bson:bson_t`.
* ``write_concern``: A :ref:`mongoc_write_concern_t`.
* ``error``: An optional location for a :symbol:`bson_error_t <errors>` or ``NULL``.

Description
-----------

Superseded by :ref:`mongoc_collection_insert_one()` and :ref:`mongoc_collection_insert_many()`.

This function shall insert ``document`` into ``collection``.

If no ``_id`` element is found in ``document``, then a :ref:`bson:bson_oid_t` will be generated locally and added to the document. If you must know the inserted document's ``_id``, generate it in your code and include it in the ``document``. The ``_id`` you generate can be a :ref:`bson:bson_oid_t` or any other non-array BSON type.

Errors
------

Errors are propagated via the ``error`` parameter.

Returns
-------

Returns ``true`` if successful. Returns ``false`` and sets ``error`` if there are invalid arguments or a server or network error.

A write concern timeout or write concern error is considered a failure.

