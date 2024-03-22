.. _mongoc_client_pool_pop

mongoc_client_pool_pop()
========================

Synopsis
--------

.. code-block:: c

  mongoc_client_t *
  mongoc_client_pool_pop (mongoc_client_pool_t *pool)
     BSON_GNUC_WARN_UNUSED_RESULT;

Retrieve a :ref:`mongoc_client_t` from the client pool, or create one. The total number of clients that can be created from this pool is limited by the URI option "maxPoolSize", default 100. If this number of clients has been created and all are in use, ``mongoc_client_pool_pop`` blocks until another thread returns a client with :ref:`mongoc_client_pool_push()`. If the "waitQueueTimeoutMS" URI option was specified with a positive value, then ``mongoc_client_pool_pop`` will return ``NULL`` when the timeout expires.

The returned :ref:`mongoc_client_t` must be returned to the pool with :ref:`mongoc_client_pool_push()`.

Parameters
----------

* ``pool``: A :ref:`mongoc_client_pool_t`.

Returns
-------

A :ref:`mongoc_client_t`.

.. include:: includes/mongoc_client_pool_thread_safe.txt
