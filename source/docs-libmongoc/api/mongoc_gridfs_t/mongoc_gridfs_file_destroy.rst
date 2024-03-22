.. _mongoc_gridfs_file_destroy

mongoc_gridfs_file_destroy()
============================

Synopsis
--------

.. code-block:: c

  void
  mongoc_gridfs_file_destroy (mongoc_gridfs_file_t *file);

Parameters
----------

* ``file``: A :ref:`mongoc_gridfs_file_t`.

Description
-----------

Destroys the :ref:`mongoc_gridfs_file_t` instance and any resources associated with it. Does nothing if ``file`` is NULL.
