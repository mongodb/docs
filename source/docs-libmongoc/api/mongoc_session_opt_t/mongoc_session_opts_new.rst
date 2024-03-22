.. _mongoc_session_opts_new

mongoc_session_opts_new()
=========================

Synopsis
--------

.. code-block:: c

  mongoc_session_opt_t *
  mongoc_session_opts_new (void);

.. include:: includes/session-lifecycle.txt

See the example code for :ref:`mongoc_session_opts_set_causal_consistency`.

Returns
-------

A new :ref:`mongoc_session_opt_t` that must be freed with :ref:`mongoc_session_opts_destroy()`.

.. include:: includes/seealso/session.txt
