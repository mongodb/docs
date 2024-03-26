.. _mongoc_client_get_database_names_with_opts

mongoc_client_get_database_names_with_opts()
============================================

Synopsis
--------

.. code-block:: c

  char **
  mongoc_client_get_database_names_with_opts (mongoc_client_t *client,
                                              const bson_t *opts,
                                              bson_error_t *error)
     BSON_GNUC_WARN_UNUSED_RESULT;

This function queries the MongoDB server for a list of known databases.

.. include:: includes/retryable-read.txt

Parameters
----------

* ``client``: A :ref:`mongoc_client_t`.
* ``opts``: A :ref:`bson_t` containing additional options.
* ``error``: An optional location for a :symbol:`bson_error_t <errors>` or ``NULL``.

.. |opts-source| replace:: ``client``

.. include:: includes/generic-opts.txt

For a list of all options, see `the MongoDB Manual entry on the listDatabases command <https://www.mongodb.com/docs/manual/reference/command/listDatabases/>`_.

Errors
------

Errors are propagated via the ``error`` parameter.

Returns
-------

A ``NULL`` terminated vector of ``NULL-byte`` terminated strings. The result should be freed with :ref:`bson:bson_strfreev()`.

``NULL`` is returned upon failure and ``error`` is set.

Examples
--------

.. code-block:: c

  {
     bson_error_t error;
     char **strv;
     unsigned i;

     if ((strv = mongoc_client_get_database_names_with_opts (client, NULL, &error))) {
        for (i = 0; strv[i]; i++)
           printf ("%s\n", strv[i]);
        bson_strfreev (strv);
     } else {
        fprintf (stderr, "Command failed: %s\n", error.message);
     }
  }

