.. _mongoc_client_decryption_decrypt

mongoc_client_decryption_decrypt()
==================================

Synopsis
--------

.. code-block:: c

   bool
   mongoc_client_encryption_decrypt (mongoc_client_encryption_t *client_encryption,
                                     const bson_value_t *ciphertext,
                                     bson_value_t *value,
                                     bson_error_t *error);

Performs explicit decryption.

``value`` is always initialized (even on failure). Caller must call :ref:`bson_value_destroy()` to free.

Parameters
----------

* ``client_encryption``: A :ref:`mongoc_client_encryption_t`
* ``ciphertext``: The ciphertext (a BSON binary with subtype 6) to decrypt.
* ``value``: A :ref:`bson_value_t` for the resulting decrypted value.
* ``error``: A :ref:`bson_error_t` set on failure.

Returns
-------

Returns ``true`` if successful. Returns ``false`` and sets ``error`` otherwise.

.. seealso::

  | :ref:`mongoc_client_enable_auto_encryption()`

  | :ref:`mongoc_client_encryption_encrypt()`

