.. _mongoc_session_opts_clone

mongoc_session_opts_clone()
===========================

Synopsis
--------

.. code-block:: c

  mongoc_session_opt_t *
  mongoc_session_opts_clone (const mongoc_session_opt_t *opts)
     BSON_GNUC_WARN_UNUSED_RESULT;

Create a copy of a session options struct.

Parameters
----------

* ``opts``: A :ref:`mongoc_session_opt_t`.

Returns
-------

A new :ref:`mongoc_session_opt_t` that must be freed with :ref:`mongoc_session_opts_destroy()`.

.. include:: includes/seealso/session.txt
