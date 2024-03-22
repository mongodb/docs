.. _mongoc_stream_socket_new

mongoc_stream_socket_new()
==========================

Synopsis
--------

.. code-block:: c

  mongoc_stream_t *
  mongoc_stream_socket_new (mongoc_socket_t *socket)
     BSON_GNUC_WARN_UNUSED_RESULT;

Parameters
----------

* ``socket``: A :ref:`mongoc_socket_t`.

Creates a new :ref:`mongoc_stream_socket_t` using the :ref:`mongoc_socket_t` provided.

.. warning::

  This function transfers ownership of ``socket`` to the newly allocated stream.

Returns
-------

A newly allocated :ref:`mongoc_stream_socket_t` that should be freed with :ref:`mongoc_stream_destroy()` when no longer in use.

