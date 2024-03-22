.. _mongoc_gridfs_destroy

mongoc_gridfs_destroy()
=======================

Synopsis
--------

.. code-block:: c

  void
  mongoc_gridfs_destroy (mongoc_gridfs_t *gridfs);

Parameters
----------

* ``gridfs``: A :ref:`mongoc_gridfs_t`.

Description
-----------

This function shall destroy the gridfs structure referenced by ``gridfs`` and any resources associated with the gridfs. Does nothing if ``gridfs`` is NULL.
