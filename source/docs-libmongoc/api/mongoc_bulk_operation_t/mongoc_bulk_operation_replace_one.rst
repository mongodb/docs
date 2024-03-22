.. _mongoc_bulk_operation_replace_one

mongoc_bulk_operation_replace_one()
===================================

Synopsis
--------

.. code-block:: c

  void
  mongoc_bulk_operation_replace_one (mongoc_bulk_operation_t *bulk,
                                     const bson_t *selector,
                                     const bson_t *document,
                                     bool upsert);

Replace a single document as part of a bulk operation. This only queues the operation. To execute it, call :ref:`mongoc_bulk_operation_execute()`.

This function is superseded by :ref:`mongoc_bulk_operation_replace_one_with_opts()`.

Parameters
----------

* ``bulk``: A :ref:`mongoc_bulk_operation_t`.
* ``selector``: A :ref:`bson:bson_t` that selects which document to remove.
* ``document``: A :ref:`bson:bson_t` containing the replacement document.
* ``upsert``: ``true`` if this should be an ``upsert``.

.. warning::

  ``document`` may not contain fields with keys containing ``.`` or ``$``.

Errors
------

Errors are propagated via :ref:`mongoc_bulk_operation_execute()`.

.. seealso::

  | :ref:`mongoc_bulk_operation_replace_one_with_opts()`

