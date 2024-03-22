.. _mongoc_stream_close

mongoc_stream_close()
=====================

Synopsis
--------

.. code-block:: c

  int
  mongoc_stream_close (mongoc_stream_t *stream);

Parameters
----------

* ``stream``: A :ref:`mongoc_stream_t`.

This function shall close underlying file-descriptors of ``stream``.

Returns
-------

``0`` on success, otherwise ``-1`` and ``errno`` is set.

.. seealso::

  | :doc:`mongoc_stream_destroy() <mongoc_stream_destroy>`

