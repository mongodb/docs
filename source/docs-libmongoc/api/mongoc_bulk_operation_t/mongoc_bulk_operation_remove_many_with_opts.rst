.. _mongoc_bulk_operation_remove_many_with_opts

mongoc_bulk_operation_remove_many_with_opts()
=============================================

Synopsis
--------

.. code-block:: c

  bool
  mongoc_bulk_operation_remove_many_with_opts (mongoc_bulk_operation_t *bulk,
                                               const bson_t *selector,
                                               const bson_t *opts,
                                               bson_error_t *error); /* OUT */

Delete documents as part of a bulk operation. This only queues the operation. To execute it, call :ref:`mongoc_bulk_operation_execute()`.

Parameters
----------

* ``bulk``: A :ref:`mongoc_bulk_operation_t`.
* ``selector``: A :ref:`bson:bson_t` that selects which document to remove.
* ``error``: An optional location for a :symbol:`bson_error_t <errors>` or ``NULL``.

.. include:: includes/bulk-remove-many-opts.txt

Errors
------

Operation errors are propagated via :ref:`mongoc_bulk_operation_execute()`, while argument validation errors are reported by the ``error`` argument.

Returns
-------

Returns true on success, and false if passed invalid arguments.

.. seealso::

  | :ref:`mongoc_bulk_operation_remove()`

  | :ref:`mongoc_bulk_operation_remove_one_with_opts()`

