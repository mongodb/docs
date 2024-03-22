.. _mongoc_gridfs_get_chunks

mongoc_gridfs_get_chunks()
==========================

Synopsis
--------

.. code-block:: c

  mongoc_collection_t *
  mongoc_gridfs_get_chunks (mongoc_gridfs_t *gridfs);

Parameters
----------

* ``gridfs``: A :ref:`mongoc_gridfs_t`.

Description
-----------

Returns a :ref:`mongoc_collection_t` that contains the chunks for files. This instance is owned by the :ref:`mongoc_gridfs_t` instance and should not be modified or freed.

Returns
-------

Returns a :ref:`mongoc_collection_t` that should not be modified or freed.

