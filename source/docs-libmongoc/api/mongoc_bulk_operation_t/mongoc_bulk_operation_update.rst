.. _mongoc_bulk_operation_update

mongoc_bulk_operation_update()
==============================

Synopsis
--------

.. code-block:: c

  void
  mongoc_bulk_operation_update (mongoc_bulk_operation_t *bulk,
                                const bson_t *selector,
                                const bson_t *document,
                                bool upsert);

This function queues an update as part of a bulk operation. This does not execute the operation. To execute the entirety of the bulk operation call :ref:`mongoc_bulk_operation_execute()`.

``document`` MUST only contain fields whose key starts with ``$``. See the update document specification for more details.

This function is superseded by :ref:`mongoc_bulk_operation_update_one_with_opts()` and :ref:`mongoc_bulk_operation_update_many_with_opts()`.

Parameters
----------

* ``bulk``: A :ref:`mongoc_bulk_operation_t`.
* ``selector``: A :ref:`bson_t` that selects which documents to remove.
* ``document``: A :ref:`bson_t` containing the update document.
* ``upsert``: ``true`` if an ``upsert`` should be performed.

Errors
------

Errors are propagated via :ref:`mongoc_bulk_operation_execute()`.

.. seealso::

  | :ref:`mongoc_bulk_operation_update_one_with_opts()`

  | :ref:`mongoc_bulk_operation_update_many_with_opts()`

