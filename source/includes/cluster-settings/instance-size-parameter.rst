Hardware specification for the instance sizes in this region. Each
instance size has a default storage and memory capacity. The instance
size you select applies to all the data-bearing hosts in your instance
size.

**See Also:** :ref:`server-number-costs`.

If you deploy a :doc:`Global Cluster </global-clusters>`, you must
choose a instance size of **M30** or greater.

.. tabs-cloud-providers::

  .. tab::
     :tabid: aws

     .. include:: /includes/list-tables/instance-types/aws.rst
     .. include:: /includes/cluster-settings/instance-size-names.rst

  .. tab::
     :tabid: gcp

     .. include:: /includes/list-tables/instance-types/gcp.rst

  .. tab::
     :tabid: azure

     .. include:: /includes/list-tables/instance-types/azure.rst
     .. include:: /includes/cluster-settings/multi-tenant.rst
