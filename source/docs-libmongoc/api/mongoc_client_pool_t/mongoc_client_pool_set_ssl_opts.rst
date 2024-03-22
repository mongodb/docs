.. _mongoc_client_pool_set_ssl_opts

mongoc_client_pool_set_ssl_opts()
=================================

Synopsis
--------

.. code-block:: c

  #ifdef MONGOC_ENABLE_SSL
  void
  mongoc_client_pool_set_ssl_opts (mongoc_client_pool_t *pool,
                                   const mongoc_ssl_opt_t *opts);
  #endif

This function is identical to :ref:`mongoc_client_set_ssl_opts()` except for
client pools. It ensures that all clients retrieved from
:ref:`mongoc_client_pool_pop()` or :ref:`mongoc_client_pool_try_pop()`
are configured with the same SSL settings.

The ``mongoc_ssl_opt_t`` struct is copied by the pool along with the strings
it points to (``pem_file``, ``pem_pwd``, ``ca_file``, ``ca_dir``, and
``crl_file``) so they don't have to remain valid after the call to
``mongoc_client_pool_set_ssl_opts``.

A call to ``mongoc_client_pool_set_ssl_opts`` overrides all TLS options set
through the connection string with which the ``mongoc_client_pool_t`` was
constructed.

Parameters
----------

* ``pool``: A :ref:`mongoc_client_pool_t`.
* ``opts``: A :ref:`mongoc_ssl_opt_t`.

.. include:: includes/mongoc_client_pool_call_once.txt

Availability
------------

This feature requires that the MongoDB C driver was compiled with ``-DENABLE_SSL``.

