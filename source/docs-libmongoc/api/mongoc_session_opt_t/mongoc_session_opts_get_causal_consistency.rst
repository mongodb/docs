.. _mongoc_session_opts_get_causal_consistency

mongoc_session_opts_get_causal_consistency()
============================================

Synopsis
--------

.. code-block:: c

  bool
  mongoc_session_opts_get_causal_consistency (const mongoc_session_opt_t *opts);

Return true if this session is configured for causal consistency (the default), else false. See :ref:`mongoc_session_opts_set_causal_consistency()`.

Parameters
----------

* ``opts``: A :ref:`mongoc_session_opt_t`.

.. include:: includes/seealso/session.txt
