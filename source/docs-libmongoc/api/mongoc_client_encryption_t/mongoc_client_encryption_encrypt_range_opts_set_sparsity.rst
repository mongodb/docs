.. _mongoc_client_encryption_encrypt_range_opts_set_sparsity

mongoc_client_encryption_encrypt_range_opts_set_sparsity()
==========================================================

Synopsis
--------

.. code-block:: c

    void
    mongoc_client_encryption_encrypt_range_opts_set_sparsity (
         mongoc_client_encryption_encrypt_range_opts_t *range_opts, int64_t sparsity);

.. important:: The {+range-is-experimental+} {+api-is-experimental+}
.. versionadded:: 1.24.0

Sets sparsity for explicit encryption. Sparsity is required for explicit encryption of range indexes.
Only applies when the algorithm set by :ref:`mongoc_client_encryption_encrypt_opts_set_algorithm()` is "RangePreview".
It is an error to set sparsity when algorithm is not "RangePreview".

Sparsity must match the value set in the encryptedFields of the destination collection.
It is an error to set a different value.

Parameters
----------

* ``range_opts``: A :ref:`mongoc_client_encryption_encrypt_range_opts_t`
* ``sparsity``: A non-negative sparsity.

.. seealso::
    | :ref:`mongoc_client_encryption_encrypt_range_opts_t`
