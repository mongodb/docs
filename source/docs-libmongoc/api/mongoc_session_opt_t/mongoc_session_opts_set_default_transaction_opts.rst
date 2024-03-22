.. _mongoc_session_opts_set_default_transaction_opts

mongoc_session_opts_set_default_transaction_opts()
==================================================

Synopsis
--------

.. code-block:: c

  void
  mongoc_session_opts_set_default_transaction_opts (
     mongoc_session_opt_t *opts, const mongoc_transaction_opt_t *txn_opts);

Set the default options for transactions started with this session. The ``txn_opts`` argument is copied and can be freed after calling this function.

When a session is first created with :ref:`mongoc_client_start_session`, it inherits from the client the read concern, write concern, and read preference with which to start transactions. Each of these fields can be overridden independently. Create a :ref:`mongoc_transaction_opt_t` with :ref:`mongoc_transaction_opts_new`, and pass a non-NULL option to any of the :ref:`mongoc_transaction_opt_t` setter functions:

* :ref:`mongoc_transaction_opts_set_read_concern`
* :ref:`mongoc_transaction_opts_set_write_concern`
* :ref:`mongoc_transaction_opts_set_read_prefs`

Pass the resulting transaction options to :ref:`mongoc_session_opts_set_default_transaction_opts`. Each field set in the transaction options overrides the inherited client configuration. There is an opportunity to override each one of these fields again by passing a :ref:`mongoc_transaction_opt_t` to :ref:`mongoc_client_session_start_transaction`.

Parameters
----------

* ``opts``: A :ref:`mongoc_session_opt_t`.
* ``txn_opts``: A :ref:`mongoc_transaction_opt_t`.

.. include:: includes/seealso/session.txt
