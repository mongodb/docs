.. _mongoc_bulk_operation_destroy

mongoc_bulk_operation_destroy()
===============================

Synopsis
--------

.. code-block:: c

  void
  mongoc_bulk_operation_destroy (mongoc_bulk_operation_t *bulk);

Destroys a :ref:`mongoc_bulk_operation_t` and frees the structure. Does nothing if ``bulk`` is NULL.

Parameters
----------

* ``bulk``: A :ref:`mongoc_bulk_operation_t`.

