.. _mongoc_stream_socket_get_socket

mongoc_stream_socket_get_socket()
=================================

Synopsis
--------

.. code-block:: c

  mongoc_socket_t *
  mongoc_stream_socket_get_socket (mongoc_stream_socket_t *stream);

Parameters
----------

* ``stream``: A :ref:`mongoc_stream_socket_t`.

Retrieves the underlying :ref:`mongoc_socket_t` for a :ref:`mongoc_stream_socket_t`.

Returns
-------

A :ref:`mongoc_stream_socket_t`.

