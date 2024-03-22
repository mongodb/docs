.. _mongoc_uri_copy

mongoc_uri_copy()
=================

Synopsis
--------

.. code-block:: c

  mongoc_uri_t *
  mongoc_uri_copy (const mongoc_uri_t *uri) BSON_GNUC_WARN_UNUSED_RESULT;

Parameters
----------

* ``uri``: A :ref:`mongoc_uri_t`.

Description
-----------

Copies the entire contents of a URI.

Returns
-------

A newly allocated :ref:`mongoc_uri_t` that should be freed with :ref:`mongoc_uri_destroy()`. May return ``NULL`` on invalid host.

