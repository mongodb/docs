.. _mongoc_client_session_advance_cluster_time

mongoc_client_session_advance_cluster_time()
============================================

Synopsis
--------

.. code-block:: c

  void
  mongoc_client_session_advance_cluster_time (mongoc_client_session_t *session,
                                              const bson_t *cluster_time);

Advance the cluster time for a session. Has an effect only if the new cluster time is greater than the session's current cluster time.

Use :ref:`mongoc_client_session_advance_operation_time` and :ref:`mongoc_client_session_advance_cluster_time` to copy the operationTime and clusterTime from another session, ensuring subsequent operations in this session are causally consistent with the last operation in the other session

Parameters
----------

* ``session``: A :ref:`mongoc_client_session_t`.
* ``cluster_time``: The session's new cluster time, as a :ref:`bson_t` like `{"cluster time": <timestamp>}`.

.. include:: includes/seealso/session.txt
