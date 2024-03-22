.. _mongoc_client_encryption_get_keys

mongoc_client_encryption_get_keys()
===================================

Synopsis
--------

.. code-block:: c

   mongoc_cursor_t *
   mongoc_client_encryption_get_keys (mongoc_client_encryption_t *client_encryption,
                                      bson_error_t *error);

Get all the key documents in the key vault collection.

Parameters
----------

* ``client_encryption``: A :ref:`mongoc_client_encryption_t`.
* ``error``: Optional. :ref:`bson_error_t`.

Returns
-------

Returns the result of the internal find command if successful. Returns ``NULL`` and sets ``error`` otherwise.

.. seealso::

  | :ref:`mongoc_client_encryption_t`
