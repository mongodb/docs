.. _mongoc_socket_destroy

mongoc_socket_destroy()
=======================

Synopsis
--------

.. code-block:: c

  void
  mongoc_socket_destroy (mongoc_socket_t *sock);

Parameters
----------

* ``sock``: A :ref:`mongoc_socket_t`.

Description
-----------

This function releases all resources associated with a :ref:`mongoc_socket_t`. This should be called when you are no longer using the socket. Does nothing if ``sock`` is NULL.
