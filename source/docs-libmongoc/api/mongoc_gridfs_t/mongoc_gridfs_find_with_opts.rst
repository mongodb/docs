.. _mongoc_gridfs_find_with_opts

mongoc_gridfs_find_with_opts()
==============================

Synopsis
--------

.. code-block:: c

  mongoc_gridfs_file_list_t *
  mongoc_gridfs_find_with_opts (mongoc_gridfs_t *gridfs,
                                const bson_t *filter,
                                const bson_t *opts) BSON_GNUC_WARN_UNUSED_RESULT;

Parameters
----------

* ``gridfs``: A :ref:`mongoc_gridfs_t`.
* ``filter``: A :ref:`bson_t` containing the query to execute.
* ``opts``: A :ref:`bson_t` query options, including sort order and which fields to return. Can be ``NULL``.

Description
-----------

Finds all gridfs files matching ``filter``. You can iterate the matched gridfs files with the resulting file list.

See :ref:`mongoc_collection_find_with_opts` for a description of the ``filter`` and ``opts`` parameters.

.. include:: includes/retryable-read.txt

Returns
-------

A newly allocated :ref:`mongoc_gridfs_file_list_t` that should be freed with :ref:`mongoc_gridfs_file_list_destroy()` when no longer in use.

