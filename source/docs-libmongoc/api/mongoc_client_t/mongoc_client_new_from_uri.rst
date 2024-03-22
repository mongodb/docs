.. _mongoc_client_new_from_uri

mongoc_client_new_from_uri()
============================

Synopsis
--------

.. code-block:: c

  mongoc_client_t *
  mongoc_client_new_from_uri (const mongoc_uri_t *uri)
     BSON_GNUC_WARN_UNUSED_RESULT;

Creates a new :ref:`mongoc_client_t` using the :ref:`mongoc_uri_t` provided.

Parameters
----------

* ``uri``: A :ref:`mongoc_uri_t`.

Returns
-------

A newly allocated :ref:`mongoc_client_t` that should be freed with :ref:`mongoc_client_destroy()` when no longer in use. On error, ``NULL`` is returned and an error will be logged.

.. seealso::

  | :ref:`mongoc_client_new_from_uri_with_error()`

