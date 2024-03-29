.. _mongoc_gridfs_bucket_download_to_stream:

=========================================
mongoc_gridfs_bucket_download_to_stream()
=========================================

Synopsis
--------

.. code-block:: c

   bool
   mongoc_gridfs_bucket_download_to_stream (mongoc_gridfs_bucket_t *bucket,
                                            const bson_value_t *file_id,
                                            mongoc_stream_t *destination,
                                            bson_error_t *error);

Parameters
----------

- ``bucket``: A :ref:`mongoc_gridfs_bucket_t`.
- ``file_id``: A :ref:`bson_value_t` of the id of the file to download.
- ``destination``: A :ref:`mongoc_stream_t` which receives data from the downloaded file.
- ``error``: A :ref:`bson_error_t` to receive any error or ``NULL``.

Description
-----------

Reads from the GridFS file and writes to the ``destination`` stream.

Writes the full contents of the file to the ``destination`` stream.
The ``destination`` stream is not closed after calling :ref:`mongoc_gridfs_bucket_download_to_stream()`; call :ref:`mongoc_stream_close()` after.

.. include:: ../../includes/retryable-read.txt

Returns
-------

True if the operation succeeded. False otherwise, and sets ``error``.

.. seealso::

  | :ref:`mongoc_stream_file_new` and :ref:`mongoc_stream_file_new_for_path`, which can be used to create a destination stream from a file.

