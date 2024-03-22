.. _mongoc_transaction_opts_destroy

mongoc_transaction_opts_destroy()
=================================

Synopsis
--------

.. code-block:: c

  void
  mongoc_transaction_opts_destroy (mongoc_transaction_opt_t *opts);

Free a :ref:`mongoc_transaction_opt_t`. Does nothing if ``opts`` is NULL.

Parameters
----------

* ``opts``: A :ref:`mongoc_transaction_opt_t`.

.. include:: includes/seealso/session.txt
