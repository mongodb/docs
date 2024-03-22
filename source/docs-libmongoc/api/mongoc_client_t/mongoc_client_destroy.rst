.. _mongoc_client_destroy

mongoc_client_destroy()
=======================

Synopsis
--------

.. code-block:: c

  void
  mongoc_client_destroy (mongoc_client_t *client);

Release all resources associated with ``client`` and free the structure. Does nothing if ``client`` is NULL.

Only call :ref:`mongoc_client_destroy` on a single-threaded client. Do not call on a :ref:`mongoc_client_t` obtained from a :ref:`mongoc_client_pool_t`, which should instead be pushed back with :ref:`mongoc_client_pool_push()`.

Parameters
----------

* ``client``: A :ref:`mongoc_client_t`.

.. seealso::

  | :ref:`mongoc_client_pool_push()` to push a multi-threaded client back onto a pool.
