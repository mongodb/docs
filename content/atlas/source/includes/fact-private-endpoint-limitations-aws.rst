- {+aws-pl+} must be active in all regions into which you 
  deploy a multi-region {+cluster+}. You will receive an 
  error if {+aws-pl+} is active in some, but not all, 
  targeted regions. If you have a multi-cloud {+cluster+} 
  in |aws| or |azure|, you must provision an endpoint in 
  each provider or region and set up site-to-site VPN.

- You can do only one of the following:

  - Deploy nodes in more than one region, and have one
    private endpoint per region.
  - Have multiple private endpoints in one region, and no
    other private endpoints. 

    .. important::

       This limitation applies across cloud providers. For
       example, if you create more than one private endpoint
       in a single region in |aws|, you can't create
       private endpoints in |azure| or any other |aws|
       region.

    See :ref:`atlas_regionalized-pl` for an exception for
    multi-region and global sharded clusters.


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