.. _mongoc_client_session_get_client

mongoc_client_session_get_client()
==================================

Synopsis
--------

.. code-block:: c

  mongoc_client_t *
  mongoc_client_session_get_client (const mongoc_client_session_t *session);

Returns the :ref:`mongoc_client_t` from which this session was created. See :ref:`mongoc_client_start_session()`.

Parameters
----------

* ``session``: A :ref:`mongoc_client_session_t`.

Returns
-------

A :ref:`mongoc_client_t` that should not be freed.

.. include:: includes/seealso/session.txt
