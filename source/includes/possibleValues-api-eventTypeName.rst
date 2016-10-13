.. These are the eventTypeName values for the
   alerts,
   alertConfigs,
   globalAlerts, and
   globalAlertConfigs endpoints.

- Host alerts support these values:
   - ``HOST_DOWN``
   - ``HOST_RECOVERING``
   - ``VERSION_BEHIND``
   - ``HOST_EXPOSED``
   - ``OUTSIDE_METRIC_THRESHOLD``

- Agent alerts support these values:
   - ``MONITORING_AGENT_DOWN``
   - ``MONITORING_AGENT_VERSION_BEHIND``
   - ``BACKUP_AGENT_DOWN``
   - ``BACKUP_AGENT_VERSION_BEHIND``
   - ``BACKUP_AGENT_CONF_CALL_FAILURE``

- Backup alerts support these values:
   - ``OPLOG_BEHIND``
   - ``CLUSTER_MONGOS_IS_MISSING``
   - ``RESYNC_REQUIRED``
   - ``BAD_CLUSTERSHOTS``

  .. QUESTION: Are these available ONLY for global alerts (the docs currently
     list them for both):
     - ``RS_BIND_ERROR``
     - ``BACKUP_TOO_MANY_RETRIES``
     - ``BACKUP_IN_UNEXPECTED_STATE``
     - ``LATE_SNAPSHOT``
     - ``SYNC_SLICE_HAS_NOT_PROGRESSED``

  .. QUESTION: We don't currently document these, but it looks like they're
     available for global alerts. Is that correct?
     - ``BACKUP_JOB_TOO_BUSY``
     - ``GROUP_TAGS_CHANGED``

- Group alerts support these values:
   - ``USERS_AWAITING_APPROVAL``
   - ``USERS_WITHOUT_MULTI_FACTOR_AUTH``

- Replica set alerts support these values:
   - ``CONFIGURATION_CHANGED``
   - ``PRIMARY_ELECTED``
   - ``TOO_FEW_HEALTHY_MEMBERS``
   - ``TOO_MANY_UNHEALTHY_MEMBERS``
   - ``NO_PRIMARY``

- Sharded cluster alerts support this value:
   - ``CLUSTER_MONGOS_IS_MISSING``

- User alerts support these values:
   - ``JOINED_GROUP``
   - ``REMOVED_FROM_GROUP``
