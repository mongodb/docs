- Create a |pem| file for each of the following components:

  .. list-table::
     :header-rows: 1
     :widths: 60 40

     * - PEM file purpose
       - Save File As...
     * - Your custom |certauth|
       - ``ca-pem``
     * - Each shard in your sharded cluster
       - ``<metadata.name>-<Y>-<X>-cert``
     * - Each member of your config server replica set
       - ``<metadata.name>-config-<X>-cert``
     * - Each |mongos|
       - ``<metadata.name>-mongos-<X>-cert``

  .. include:: /includes/prereqs/custom-ca-prereqs-naming-conventions.rst
