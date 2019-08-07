MongoDB databases that run with an
:manual:`FCV </reference/command/setFeatureCompatibilityVersion>` of
``4.2`` do not support:

- Sharded Clusters :doc:`backups </tutorial/nav/backup-deployments/>`
  or :doc:`restores </tutorial/restore-sharded-cluster>`
- :doc:`Point-in-Time restores </tutorial/restore-pit-snapshot-http>`
- :doc:`Queryable restores </tutorial/query-backup>`
- Differing :manual:`FCV values </reference/command/setFeatureCompatibilityVersion>` on nodes in a replica set
- :ref:`Namespace filters <namespaces-filter>`
  (Whitelists and Blacklists)
- :term:`Sync stores <sync store>`
- :term:`File System Stores <File System Store>`
