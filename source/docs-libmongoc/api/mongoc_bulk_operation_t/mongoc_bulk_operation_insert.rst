.. _mongoc_bulk_operation_insert

mongoc_bulk_operation_insert()
==============================

Synopsis
--------

.. code-block:: c

  void
  mongoc_bulk_operation_insert (mongoc_bulk_operation_t *bulk,
                                const bson_t *document);

Queue an insert of a single document into a bulk operation. The insert is not performed until :ref:`mongoc_bulk_operation_execute()` is called.

This function is superseded by :ref:`mongoc_bulk_operation_insert_with_opts()`.

Parameters
----------

* ``bulk``: A :ref:`mongoc_bulk_operation_t`.
* ``document``: A :ref:`bson:bson_t`.

Errors
------

Errors are propagated via :ref:`mongoc_bulk_operation_execute()`.

.. seealso::

  | :doc:`bulk`

