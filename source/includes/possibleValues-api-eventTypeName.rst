- ``HOST`` alert type. Possible values:
   - ``HOST_DOWN``
   - ``HOST_RECOVERING``
   - ``VERSION_BEHIND``
   - ``HOST_EXPOSED``

- ``HOST_METRIC`` alert type. Possible value:
   - ``OUTSIDE_METRIC_THRESHOLD``

- ``AGENT`` alert type. Possible values:
   - ``MONITORING_AGENT_DOWN``
   - ``MONITORING_AGENT_VERSION_BEHIND``
   - ``BACKUP_AGENT_DOWN``
   - ``BACKUP_AGENT_VERSION_BEHIND``
   - ``BACKUP_AGENT_CONF_CALL_FAILURE``

- ``BACKUP`` alert type. Possible values:
   - ``OPLOG_BEHIND``
   - ``CLUSTER_MONGOS_IS_MISSING``
   - ``RESYNC_REQUIRED``
   - ``RS_BIND_ERROR``
   - ``BACKUP_TOO_MANY_RETRIES``
   - ``BACKUP_IN_UNEXPECTED_STATE``
   - ``LATE_SNAPSHOT``
   - ``BAD_CLUSTERSHOTS``
   - ``SYNC_SLICE_HAS_NOT_PROGRESSED``

- ``GROUP`` alert type. Possible values:
   - ``USERS_AWAITING_APPROVAL``
   - ``USERS_WITHOUT_MULTI_FACTOR_AUTH``

- ``REPLICA_SET`` alert type. Possible values:
   - ``CONFIGURATION_CHANGED``
   - ``PRIMARY_ELECTED``
   - ``TOO_FEW_HEALTHY_MEMBERS``
   - ``TOO_MANY_UNHEALTHY_MEMBERS``
   - ``NO_PRIMARY``

- ``USER`` alert type. Possible values:``
   - ``JOINED_GROUP``
   - ``REMOVED_FROM_GROUP``