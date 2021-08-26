- Create a |pem| file for each of the following components:

  .. list-table::
     :header-rows: 1
     :widths: 60 40

     * - PEM file purpose
       - Save File As...
     * - Your custom |certauth|
       - ``ca-pem``
     * - Each shard in your sharded cluster
       - ``<metadata.name>-<Y>-<X>-pem``
     * - Each member of your config server replica set
       - ``<metadata.name>-config-<X>-pem``
     * - Each |mongos|
       - ``<metadata.name>-mongos-<X>-pem``
     * - Your project's Automation or MongoDB Agent
       - ``mms-automation-agent-pem``
     * - Your project's Backup Agent (if needed)
       - ``mms-backup-agent-pem``
     * - Your project's Monitoring Agent (if needed)
       - ``mms-monitoring-agent-pem``

  For the Agent PEM files, ensure that:

  - the Common Name in each |tls| certificate is not empty, and
  - the combined Organization and Organizational Unit in each |tls|
    certificate differs from the combined Organization and
    Organizational Unit in the |tls| certificates for your
    sharded cluster members, config server members, and each |mongos|.

  .. include:: /includes/prereqs/pem-file-description.rst

  .. include:: /includes/prereqs/custom-ca-prereqs-naming-conventions.rst

  .. note:: About the Domain Names in certificates
  
     .. include:: /includes/prereqs/pem-file-domain-name.rst
