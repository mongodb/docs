.. _mongoc_gridfs_bucket_open_upload_stream

mongoc_gridfs_bucket_open_upload_stream()
=========================================

Synopsis
--------

.. code-block:: c

   mongoc_stream_t *
   mongoc_gridfs_bucket_open_upload_stream (mongoc_gridfs_bucket_t *bucket,
                                            const char *filename,
                                            const bson_t *opts,
                                            bson_value_t *file_id,
                                            bson_error_t *error)
     BSON_GNUC_WARN_UNUSED_RESULT;

Parameters
----------

* ``bucket``: A :ref:`mongoc_gridfs_bucket_t`.
* ``filename``: The name of the file to create.
* ``opts``: A :ref:`bson_t` or ``NULL``.
* ``file_id``: A :ref:`bson_value_t` to receive the generated id of the file or ``NULL``.
* ``error``: A :ref:`bson_error_t` to receive any error or ``NULL``.

.. include:: includes/gridfs-bucket-upload-opts.txt

Description
-----------

Opens a stream for writing to a new file in GridFS. The file id is generated automatically.
To specify an explicit file id, use :ref:`mongoc_gridfs_bucket_open_upload_stream_with_id()`.

Returns
-------

A :ref:`mongoc_stream_t` that can be written to or ``NULL`` on failure. Errors on this stream can be retrieved with :ref:`mongoc_gridfs_bucket_stream_error`. After calling :ref:`mongoc_stream_close` the file is completely written in GridFS.

.. seealso::

  | :ref:`mongoc_gridfs_bucket_open_upload_stream_with_id()`

  | :ref:`mongoc_gridfs_bucket_stream_error()`

