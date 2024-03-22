.. _mongoc_auto_encryption_opts_new

mongoc_auto_encryption_opts_new()
=================================

Synopsis
--------

.. code-block:: c

  mongoc_auto_encryption_opts_t *
  mongoc_auto_encryption_opts_new (void) BSON_GNUC_WARN_UNUSED_RESULT;


Create a new :ref:`mongoc_auto_encryption_opts_t`.

Caller must set the required options:

* :ref:`mongoc_auto_encryption_opts_set_keyvault_namespace()`
* :ref:`mongoc_auto_encryption_opts_set_kms_providers()`

Caller may set optionally set the following:

* :ref:`mongoc_auto_encryption_opts_set_keyvault_client()`
* :ref:`mongoc_auto_encryption_opts_set_schema_map()`
* :ref:`mongoc_auto_encryption_opts_set_bypass_auto_encryption()`
* :ref:`mongoc_auto_encryption_opts_set_extra()`

This options struct is used to enable auto encryption with :ref:`mongoc_client_enable_auto_encryption()`.

Returns
-------

A new :ref:`mongoc_auto_encryption_opts_t`, which must be destroyed with :ref:`mongoc_auto_encryption_opts_destroy()`.

.. seealso::

  | :ref:`mongoc_auto_encryption_opts_destroy()`

  | :ref:`mongoc_client_enable_auto_encryption()`

  | :doc:`in-use-encryption`

