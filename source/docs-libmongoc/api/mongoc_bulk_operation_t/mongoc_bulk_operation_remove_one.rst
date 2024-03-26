.. _mongoc_bulk_operation_remove_one

mongoc_bulk_operation_remove_one()
==================================

Synopsis
--------

.. code-block:: c

  void
  mongoc_bulk_operation_remove_one (mongoc_bulk_operation_t *bulk,
                                    const bson_t *selector);

Remove a single document as part of a bulk operation. This only queues the operation. To execute it, call :ref:`mongoc_bulk_operation_execute()`.

This function is superseded by :ref:`mongoc_bulk_operation_remove_one_with_opts()`.

Parameters
----------

* ``bulk``: A :ref:`mongoc_bulk_operation_t`.
* ``selector``: A :ref:`bson_t` that selects which document to remove.

Errors
------

Errors are propagated via :ref:`mongoc_bulk_operation_execute()`.

.. seealso::

  | :ref:`mongoc_bulk_operation_remove_one_with_opts()`

  | :ref:`mongoc_bulk_operation_remove_many_with_opts()`

