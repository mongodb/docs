.. _mongoc_gridfs_bucket_destroy

mongoc_gridfs_bucket_destroy()
==============================

Synopsis
--------

.. code-block:: c

  void
  mongoc_gridfs_bucket_destroy (mongoc_gridfs_bucket_t *bucket);

Parameters
----------

* ``bucket``: A :ref:`mongoc_gridfs_bucket_t` or ``NULL``.

Description
-----------

Destroys a :ref:`mongoc_gridfs_bucket_t`. Does nothing if passed ``NULL``.
