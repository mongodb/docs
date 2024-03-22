.. _mongoc_bulk_operation_get_write_concern

mongoc_bulk_operation_get_write_concern()
=========================================

Synopsis
--------

.. code-block:: c

  const mongoc_write_concern_t *
  mongoc_bulk_operation_get_write_concern (const mongoc_bulk_operation_t *bulk);

Parameters
----------

* ``bulk``: A :ref:`mongoc_bulk_operation_t`.

Description
-----------

Fetches the write concern to be used for ``bulk``.

Returns
-------

A :ref:`mongoc_write_concern_t` that should not be modified or freed.

