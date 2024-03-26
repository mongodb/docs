.. _mongoc_client_session_get_lsid

mongoc_client_session_get_lsid()
================================

Synopsis
--------

.. code-block:: c

  const bson_t *
  mongoc_client_session_get_lsid (mongoc_client_session_t *session);

Get the server-side "logical session ID" associated with this :ref:`mongoc_client_session_t` as a BSON document.

Parameters
----------

* ``session``: A :ref:`mongoc_client_session_t`.

Returns
-------

A :ref:`bson_t` that is valid only for the lifetime of ``session``.

.. include:: includes/seealso/session.txt
