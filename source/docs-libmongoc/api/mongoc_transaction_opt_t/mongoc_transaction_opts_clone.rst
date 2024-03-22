.. _mongoc_transaction_opts_clone

mongoc_transaction_opts_clone()
===============================

Synopsis
--------

.. code-block:: c

  mongoc_transaction_opt_t *
  mongoc_transaction_opts_clone (const mongoc_transaction_opt_t *opts)
     BSON_GNUC_WARN_UNUSED_RESULT;

Create a copy of a transaction options struct.

Parameters
----------

* ``opts``: A :ref:`mongoc_transaction_opt_t`.

Returns
-------

A new :ref:`mongoc_transaction_opt_t` that must be freed with :ref:`mongoc_transaction_opts_destroy()`.

.. include:: includes/seealso/session.txt
