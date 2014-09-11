The |backup| Agent polls the primary MongoDB instance of
every backup-enabled replica set and transmits the operations to
the |mms| service.

The Backup Agent relies on the MMS Monitoring Agent to populate the
list of sharded clusters and replica sets eligible for backup. If
the appropriate hosts are not added, or the Monitoring Agent is not
being correctly run, the lists may be incomplete or out-of-date.
If you have not already installed and configured |monitoring|,
please refer to the :doc:`/tutorial/nav/install-monitoring-agent`
documentation.
