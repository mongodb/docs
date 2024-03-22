.. _mongoc_client_encryption_encrypt_range_opts_destroy

mongoc_client_encryption_encrypt_range_opts_destroy()
=====================================================

Synopsis
--------

.. code-block:: c

  void
  mongoc_client_encryption_encrypt_range_opts_destroy (mongoc_client_encryption_encrypt_range_opts_t *range_opts);

.. important:: The {+range-is-experimental+} {+api-is-experimental+}
.. versionadded:: 1.24.0
    
Frees resources of a :ref:`mongoc_client_encryption_encrypt_range_opts_t` created with :ref:`mongoc_client_encryption_encrypt_range_opts_new()`. Does nothing if ``NULL`` is passed.

Parameters
----------

* ``range_opts``: A :ref:`mongoc_client_encryption_encrypt_range_opts_t`.

.. seealso::
    | :ref:`mongoc_client_encryption_encrypt_range_opts_t`