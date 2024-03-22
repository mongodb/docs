.. _mongoc_client_session_start_transaction

mongoc_client_session_start_transaction()
=========================================

Synopsis
--------

.. code-block:: c

  bool
  mongoc_client_session_start_transaction (mongoc_client_session_t *session,
                                           const mongoc_transaction_opt_t *opts,
                                           bson_error_t *error);


Start a multi-document transaction for all following operations in this session. Any options provided in ``opts`` override options passed to :ref:`mongoc_session_opts_set_default_transaction_opts`, and options inherited from the :ref:`mongoc_client_t`. The ``opts`` argument is copied and can be freed after calling this function.

The transaction must be completed with :ref:`mongoc_client_session_commit_transaction` or :ref:`mongoc_client_session_abort_transaction`. An in-progress transaction is automatically aborted by :ref:`mongoc_client_session_destroy`.

Parameters
----------

* ``session``: A :ref:`mongoc_client_session_t`.
* ``opts``: A :ref:`mongoc_transaction_opt_t` or ``NULL``.
* ``error``: An optional location for a :symbol:`bson_error_t <errors>` or ``NULL``.

Return
------

Returns true if the transaction was started. Returns ``false`` and sets ``error`` if there are invalid arguments, such as a session with a transaction already in progress.

.. _mongoc_client_session_start_transaction_example:

Example
-------

The following example demonstrates how to use :ref:`error labels <error_labels>` to reliably execute a multi-document transaction despite network errors and other transient failures.

.. literalinclude:: ../examples/example-transaction.c
   :language: c
   :caption: example-transaction.c

.. include:: includes/seealso/session.txt
