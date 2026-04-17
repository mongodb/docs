- {+aws-pl+} must be active in all regions into which you
  deploy a multi-region {+cluster+}. You will receive an
  error if {+aws-pl+} is active in some, but not all,
  targeted regions. If you have a multi-cloud {+cluster+}
  in |aws| or |azure|, you must provision an endpoint in
  each provider or region and set up site-to-site VPN.

- Cross-region private endpoint connectivity is supported in all
  |aws| regions where |aws| supports cross-region PrivateLink and the
  region is available on |service|. To learn more about |aws|
  PrivateLink cross-region support, see the :aws:`AWS PrivateLink
  documentation
  <privatelink/latest/userguide/privatelink-share-your-services.html>`.

- If you deploy nodes in more than one region and enable an endpoint
  service for each region, each endpoint service can accept a maximum
  of one endpoint from any given supported remote region.

  **Example Scenarios:**

  **Scenario 1: One Endpoint Service per Region Supporting One Endpoint
  Each**

  This configuration applies to multi-region clusters where you deploy
  nodes in more than one region, and you enable a separate endpoint
  service for each region.

  .. list-table::
     :header-rows: 1
     :widths: 40 60

     * - Endpoint Service (EPS)
       - Limitation

     * - Endpoint service for ``us-east-1``
       - Can accept a maximum of one private endpoint from any
         supported region (for example, one from ``us-east-1``,
         one from ``us-west-2``, or one from ``ap-southeast-2``).
         This includes endpoints from the endpoint service's own
         region.

     * - Endpoint service for ``eu-west-1``
       - Can accept a maximum of one private endpoint from any
         supported region (for example, one from ``eu-west-1``,
         one from ``us-west-1``, or one from ``us-west-2``).
         This includes endpoints from the endpoint service's own
         region.

  **Example:** If your cluster has nodes in ``us-east-1`` and
  ``eu-west-1``, you will have two endpoint services. The
  ``us-east-1`` endpoint service can accept a single connection from a
  remote region like ``us-west-2``. If you need a second connection
  from ``us-west-2``, you must use the ``eu-west-1`` endpoint service.

  **Scenario 2: One Endpoint Service Supporting Multiple Endpoints**

  This configuration allows a single endpoint service to accept
  multiple private endpoints, but only if the Atlas cluster nodes are
  deployed in only one region and that region is the sole point of
  access.

  .. list-table::
     :header-rows: 1
     :widths: 40 30 30

     * - Atlas Cluster Configuration
       - Endpoint Service (EPS)
       - Connectivity

     * - Single Region Cluster (for example, nodes only in
         ``us-east-1``)
       - Endpoint service for ``us-east-1``
       - Can connect multiple private endpoints from any supported
         region to this endpoint service (for example, three separate
         endpoints from ``us-west-2`` and two endpoints from
         ``us-east-1`` itself can connect to the ``us-east-1``
         endpoint service).

  **Example:** If your cluster nodes are only in ``us-east-1``, the
  single ``us-east-1`` endpoint service can support multiple endpoints
  (for example, five endpoints) originating from any supported region,
  including the endpoint service's own region (for example,
  ``us-west-2``, ``us-east-1``, ``eu-west-1``).

  .. important::

     This limitation applies across cloud providers. For example, if
     you create more than one private endpoint in a single region in
     |aws|, you can't create private endpoints in |azure| or any other
     |aws| region.

  See :ref:`atlas_regionalized-pl` for an exception for multi-region
  and global sharded clusters.


.. include:: /includes/fact-private-endpoint-limits-aws.rst


- You can use {+aws-pl+} in |service| projects with up to 50
  addressable targets **per region**. If you need more than 
  50 addressable targets in a region:

  - Contact :ref:`MongoDB Support <request-support>`, or 
  - Use additional projects or regions to connect to 
    addressable targets beyond this limit.
            
  Addressable targets include:

  - Each |mongod| instance in a replica set deployment 
    (sharded clusters excluded).
  - Each sharded cluster deployment that use 
    :ref:`optimized connection strings
    <optimized-connection-strings>`.
  - Each |mongos| instance for sharded cluster deployments
    that use non-:ref:`optimized connection strings
    <optimized-connection-strings>`.
  - Each |bic| instance across all dedicated clusters in the
    project.

  .. note::

     To request a one-time increase to use {+aws-pl+} with 
     up to 90 addressable targets per |service| project, 
     contact :ref:`MongoDB Support <request-support>`.