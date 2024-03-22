.. _mongoc_transaction_opts_set_read_concern

mongoc_transaction_opts_set_read_concern()
==========================================

Synopsis
--------

.. code-block:: c

  void
  mongoc_transaction_opts_set_read_concern (mongoc_transaction_opt_t *opts,
                                            const mongoc_read_concern_t *read_concern);

Configure the transaction's read concern. The argument is copied into the struct and can be freed after calling this function.

Parameters
----------

* ``opts``: A :ref:`mongoc_transaction_opt_t`.
* ``read_concern``: A :ref:`mongoc_read_concern_t`.

.. include:: includes/seealso/session.txt
