.. _mongoc_uri_new

mongoc_uri_new()
================

Synopsis
--------

.. code-block:: c

  mongoc_uri_t *
  mongoc_uri_new (const char *uri_string) BSON_GNUC_WARN_UNUSED_RESULT;

Parameters
----------

* ``uri_string``: A string containing a URI.

Description
-----------

Calls :ref:`mongoc_uri_new_with_error`.

Returns
-------

A newly allocated :ref:`mongoc_uri_t` if successful. Otherwise ``NULL``, using
MONGOC_WARNING on error.

.. warning::

  Failure to handle the result of this function is a programming error.

