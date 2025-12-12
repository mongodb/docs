- {+az-pl+} must be active in all regions into which you 
  deploy a multi-region cluster. You will receive an error 
  if {+az-pl+} is active in some, but not all, targeted 
  regions. If you have a multi-cloud cluster in |aws| or 
  |azure|, you must provision an endpoint in each provider or 
  region and set up site-to-site VPN.

- You can do only one of the following:

  - Deploy nodes in more than one region, and have one
    private endpoint per region.

  - Have multiple private endpoints in one region, and no
    other private endpoints.

    .. important::

       This limitation applies across cloud providers. For
       example, if you create more than one private endpoint
       in a single region in |azure|, you can't create
       private endpoints in |aws| or any other |azure| region.

  See :ref:`atlas_regionalized-pl` for an exception for
  multi-region and global sharded clusters.

- To connect to |service| clusters using {+az-pl+} from 
  regions in which you haven't deployed a private endpoint 
  connection, you must peer VNets in those regions to VNets 
  in a region in which you have deployed a private endpoint 
  connection.

  To learn about Global VNet peering, see the
  :azure:`Azure documentation </virtual-network/virtual-networks-faq#can-i-create-a-peering-connection-to-a-vnet-in-a-different-region>`.

- You can use {+az-pl+} in |service| projects with up to 150
  addressable targets **per region**. If you need more than 
  150 addressable targets in a region:

  - Contact :ref:`MongoDB Support <request-support>`, or 
  - Use additional projects or regions to connect to 
    addressable targets beyond this limit.

  Addressable targets include:

  - Each |mongod| instance in a replica set deployment 
    (sharded clusters excluded).
  - Each |mongos| instance in a sharded cluster deployment.
  - Each |bic| instance across all dedicated clusters in the project.

- {+az-pl+} does not allow more than 64k |tcp| connections
  per target, which might be lower than the maximum number of
  connections that a {+cluster+} can sustain.