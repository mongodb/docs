.. _mongoc_client_encryption_rewrap_many_datakey_result_destroy

mongoc_client_encryption_rewrap_many_datakey_result_destroy()
=============================================================

Synopsis
--------

.. code-block:: c

   void
   mongoc_client_encryption_rewrap_many_datakey_result_destroy (
      mongoc_client_encryption_rewrap_many_datakey_result_t *result);

Frees resources of a :ref:`mongoc_client_encryption_rewrap_many_datakey_result_t` created with :ref:`mongoc_client_encryption_rewrap_many_datakey_result_new()`. Does nothing if ``NULL`` is passed.

Parameters
----------

* ``result``: A :ref:`mongoc_client_encryption_rewrap_many_datakey_result_t`.
