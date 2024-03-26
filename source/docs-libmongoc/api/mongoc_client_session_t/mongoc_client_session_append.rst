.. _mongoc_client_session_append

mongoc_client_session_append()
==============================

Synopsis
--------

.. code-block:: c

  bool
  mongoc_client_session_append (const mongoc_client_session_t *client_session,
                                bson_t *opts,
                                bson_error_t *error);

Parameters
----------

* ``client_session``: A pointer to a :ref:`mongoc_client_session_t`.
* ``opts``: A pointer to a :ref:`bson_t`.
* ``error``: An optional location for a :symbol:`bson_error_t <errors>` or ``NULL``.

Description
-----------

This function appends a logical session id to command options. Use it to configure a session for any function that takes an options document, such as :ref:`mongoc_client_write_command_with_opts`.

It is an error to use a session for unacknowledged writes.

Returns
-------

Returns true on success. If any arguments are invalid, returns false and fills out ``error``.

Example
-------

See the example code for :ref:`mongoc_client_session_t`.

