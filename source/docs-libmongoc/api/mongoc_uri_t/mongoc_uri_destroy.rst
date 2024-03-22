.. _mongoc_uri_destroy

mongoc_uri_destroy()
====================

Synopsis
--------

.. code-block:: c

  void
  mongoc_uri_destroy (mongoc_uri_t *uri);

Parameters
----------

* ``uri``: A :ref:`mongoc_uri_t`.

Description
-----------

Frees all resources associated with a uri. Does nothing if ``uri`` is NULL.
