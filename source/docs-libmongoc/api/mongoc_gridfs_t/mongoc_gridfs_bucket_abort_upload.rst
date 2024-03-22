.. _mongoc_gridfs_bucket_abort_upload

mongoc_gridfs_bucket_abort_upload()
===================================

Synopsis
--------

.. code-block:: c

   bool
   mongoc_gridfs_bucket_abort_upload (mongoc_stream_t *stream);

Parameters
----------

* ``stream``: A :ref:`mongoc_stream_t` created by :ref:`mongoc_gridfs_bucket_open_upload_stream` or :ref:`mongoc_gridfs_bucket_open_upload_stream_with_id`.

Description
-----------

Aborts the upload of a GridFS upload stream.

Returns
-------

True on success. False otherwise, and sets an error on ``stream``.

.. seealso::

  | :ref:`mongoc_gridfs_bucket_open_upload_stream`

  | :ref:`mongoc_gridfs_bucket_open_upload_stream_with_id()`

