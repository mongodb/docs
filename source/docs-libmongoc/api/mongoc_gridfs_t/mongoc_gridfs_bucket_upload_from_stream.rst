.. _mongoc_gridfs_bucket_upload_from_stream:

=========================================
mongoc_gridfs_bucket_upload_from_stream()
=========================================

Synopsis
--------

.. code-block:: c

   bool
   mongoc_gridfs_bucket_upload_from_stream (mongoc_gridfs_bucket_t *bucket,
                                            const char *filename,
                                            mongoc_stream_t *source,
                                            const bson_t *opts,
                                            bson_value_t *file_id,
                                            bson_error_t *error);

Parameters
----------

- ``bucket``: A :ref:`mongoc_gridfs_bucket_t`.
- ``filename``: The name of the file to create.
- ``source``: A :ref:`mongoc_stream_t` used as the source of the data to upload.
- ``opts``: A :ref:`bson_t` or ``NULL``.
- ``file_id``: A :ref:`bson_value_t` to receive the generated id of the file or ``NULL``.
- ``error``: A :ref:`bson_error_t` to receive any error or ``NULL``.

.. include:: ../../includes/gridfs-bucket-upload-opts.txt

Description
-----------

Reads from the ``source`` stream and writes to a new file in GridFS. The file id is generated automatically.
To specify an explicit file id, use :ref:`mongoc_gridfs_bucket_upload_from_stream_with_id`.

Reads from the ``source`` stream using :ref:`mongoc_stream_read` until the return value indicates end-of-file.
The ``source`` stream is not closed after calling :ref:`mongoc_gridfs_bucket_upload_from_stream`; call
:ref:`mongoc_stream_close` after.

Returns
-------

True if the operation succeeded. False otherwise and sets ``error``.

.. seealso::

  | :ref:`mongoc_stream_file_new` and :ref:`mongoc_stream_file_new_for_path`, which can be used to create
  | a source stream from a file.

