.. _mongoc_transaction_opts_set_read_prefs

mongoc_transaction_opts_set_read_prefs()
========================================

Synopsis
--------

.. code-block:: c

  void
  mongoc_transaction_opts_set_read_prefs (mongoc_transaction_opt_t *opts,
                                          const mongoc_read_prefs_t *read_prefs);

Configure the transaction's read preference. The argument is copied into the struct and can be freed after calling this function.

Parameters
----------

* ``opts``: A :ref:`mongoc_transaction_opt_t`.
* ``read_prefs``: A :ref:`mongoc_read_prefs_t`.

.. include:: includes/seealso/session.txt
