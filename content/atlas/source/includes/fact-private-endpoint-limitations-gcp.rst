- {+gcp-psc+} must be active in all regions into which you 
  deploy a multi-region cluster. You will receive an error 
  if {+gcp-psc+} is active in some, but not all, targeted 
  regions.

- You can do only one of the following:

  - Deploy nodes in more than one region, and have one
    private endpoint per region.
  - Have multiple private endpoints in one region, and no
    other private endpoints.

    .. important::

       This limitation applies across cloud providers. For
       example, if you create more than one private endpoint
       in a single region in |gcp|, you can't create
       private endpoints in |aws| or any other |gcp|
       region.

  See :ref:`atlas_regionalized-pl` for an exception for
  multi-region and global sharded clusters.

- |service| creates 50 service attachments, each with a
  subnet mask value of 27. You can change the number of
  service attachments and the subnet masks that |service|
  creates by setting the following limits with the
  :oas-bump-atlas-op:`Set One Project Limit <setgrouplimit>`
  {+atlas-admin-api+} endpoint:

  - Set the
    ``atlas.project.deployment.privateServiceConnectionsPerRegionGroup``
    limit to change the number of service attachments.
  - Set the
    ``atlas.project.deployment.privateServiceConnectionsSubnetMask``
    limit to change the subnet mask for each service
    attachment.

  To learn more, see :oas-bump-atlas-op:`Set One Project Limit
  <setgrouplimit>`.

- You can have up to 50 nodes when you create |service| projects
  that use {+gcp-psc+} in a **single region**. If you need
  to change the number of nodes, perform one of the following
  actions:

  - Remove existing private endpoints and then change the
    limit using the :oas-bump-atlas-op:`Set One Project Limit
    <setgrouplimit>` {+atlas-admin-api+} endpoint.
  - Contact :ref:`MongoDB Support <request-support>`.
  - Use additional projects or regions to connect to nodes
    beyond this limit.

- Each private endpoint in |gcp| reserves an IP address
  within your |gcp| |vpc| and forwards traffic from the
  endpoints' IP addresses to the
  :gcp:`service attachments </vpc/docs/private-service-connect#service-attachments>`.
  You must create an equal number of private endpoints to the
  number of service attachments. The number of service
  attachments defaults to 50.

  Addressable targets include:

  - Each |mongod| instance in a replica set deployment
    (sharded clusters excluded).
  - Each |mongos| instance in a sharded cluster deployment.
  - Each |bic| instance across all dedicated clusters in the
    project.

- If you configure dedicated :ref:`Search Nodes <configure-search-nodes>`
  for ``M10+`` {+clusters+} in any |gcp| region, |service|
  doesn't count these nodes in the total count of addressable targets.

- To request a one-time increase to use {+gcp-psc+} with up to
  100 nodes per |service| project, contact
  :ref:`MongoDB Support <request-support>`.

- You can have up to 40 nodes when you create |service| projects
  that use {+gcp-psc+} across **multiple regions**. This total
  excludes the following instances:

  - |gcp| regions communicating with each other
  - {+Free-clusters+} or {+Flex-clusters+}

- |gcp| {+google-psc+} supports up to 1024 outgoing
  connections per virtual machine. As a result, you can't
  have more than 1024 connections from a single |gcp|
  virtual machine to an |service| cluster.

  To learn more, see the |gcp|
  :gcp:`cloud NAT documentation </nat/docs/ports-and-addresses>`.

- |gcp| {+google-psc+} is region-specific. However, you
  can configure :gcp:`global access
  </vpc/docs/about-accessing-vpc-hosted-services-endpoints#global-access>`
  to access private endpoints from a different region.

  To learn more, see :ref:`Multi-Region Support <private-endpoint-ha>`.

  .. note::

     You can't use |vpc| peering to access private endpoints
     from a different region.

- When you use {+google-psc+} to connect to multi-region
  {+clusters+}, you can connect only to {+cluster+} nodes
  that are in the same region as the private endpoint. If
  the endpoint and the primary node are in different
  regions, you must:

  1. Set your application's
     :manual:`read preference </core/read-preference/>`
     to allow connections from a secondary node.

     For example, you can set your application's read
     preference to :manual:`secondaryPreferred </core/read-preference/#mongodb-readmode-secondaryPreferred>`.

  2. Ensure at least one secondary node is in the same
     region as the endpoint.