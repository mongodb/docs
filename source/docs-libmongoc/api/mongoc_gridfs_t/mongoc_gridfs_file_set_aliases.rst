.. _mongoc_gridfs_file_set_aliases

mongoc_gridfs_file_set_aliases()
================================

Synopsis
--------

.. code-block:: c

  void
  mongoc_gridfs_file_set_aliases (mongoc_gridfs_file_t *file, const bson_t *bson);

Parameters
----------

* ``file``: A :ref:`mongoc_gridfs_file_t`.
* ``bson``: A :ref:`bson_t` containing the aliases.

Description
-----------

Sets the aliases for a gridfs file.

You need to call :ref:`mongoc_gridfs_file_save()` to persist this change.

