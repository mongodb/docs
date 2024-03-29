.. _mongoc_server_api_destroy:

mongoc_server_api_destroy()
===========================

Synopsis
--------

.. code-block:: c

  void
  mongoc_server_api_destroy (mongoc_server_api_t *api);

Free a :ref:`mongoc_server_api_t`. Does nothing if ``api`` is NULL.
