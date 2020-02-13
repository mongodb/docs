- Create a |pem| file for each of the following components:

  .. list-table::
     :header-rows: 1
     :widths: 60 40

     * - PEM file purpose
       - Save File As...
     * - Your custom |certauth|
       - ``ca-pem``
     * - Each member of your replica set
       - ``<metadata.name>-<X>-pem``
     * - Your project's Automation or MongoDB Agent
       - ``mms-automation-agent-pem``
     * - Your project's Backup Agent (if needed)
       - ``mms-backup-agent-pem``
     * - Your project's Monitoring Agent (if needed)
       - ``mms-monitoring-agent-pem``
     * - Each shard in your sharded cluster
       - ``<metadata.name>-<Y>-<X>-pem``
     * - Each member of your config server replica set
       - ``<metadata.name>-config-<X>-pem``
     * - Each |mongos|
       - ``<metadata.name>-mongos-<X>-pem``

  .. include:: /includes/prereqs/custom-ca-prereqs-naming-conventions.rst
