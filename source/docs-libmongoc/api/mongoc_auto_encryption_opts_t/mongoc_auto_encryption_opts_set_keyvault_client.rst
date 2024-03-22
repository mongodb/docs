.. _mongoc_auto_encryption_opts_set_key_vault_client

mongoc_auto_encryption_opts_set_keyvault_client()
=================================================

Synopsis
--------

.. code-block:: c

   void
   mongoc_auto_encryption_opts_set_keyvault_client (
      mongoc_auto_encryption_opts_t *opts, mongoc_client_t *client);

Set an optional separate :ref:`mongoc_client_t` to use during key lookup for automatic encryption and decryption. Only applies to automatic encryption on a single-threaded :ref:`mongoc_client_t`.

Parameters
----------

* ``opts``: A :ref:`mongoc_auto_encryption_opts_t`.
* ``client``: A :ref:`mongoc_client_t` to use for key queries. This client should *not* have automatic encryption enabled, as it will only execute ``find`` commands against the key vault collection to retrieve keys for automatic encryption and decryption. This ``client`` MUST outlive any :ref:`mongoc_client_t` which has been enabled to use it through :ref:`mongoc_client_enable_auto_encryption()`.

.. seealso::

  | :ref:`mongoc_client_enable_auto_encryption()`

  | :ref:`mongoc_auto_encryption_opts_set_keyvault_client_pool()`

  | :doc:`in-use-encryption`

