.. _private-endpoint-access-lists:

IP Access Lists and Network Peering Connections with Private Endpoints
----------------------------------------------------------------------

When you enable private endpoints, you can still enable access to 
your |service| {+database-deployments+} using other methods, such 
as adding public IPs to :doc:`IP access lists 
</security/ip-access-list>` and :doc:`network peering 
</security-vpc-peering>`.

Clients connecting to |service| {+database-deployments+} using 
other methods use standard connection strings. Your clients might 
have to identify when to use private endpoint-aware connection 
strings and standard connection strings.

.. _atlas_regionalized-pl:

(Optional) Regionalized Private Endpoints for Multi-Region Sharded Clusters
---------------------------------------------------------------------------

For multi-region and global sharded clusters,
you can deploy multiple private endpoints to a region if you need 
to connect to |service| using a private endpoint from networks 
that can't be peered with one another.

You can deploy any number of private endpoints to regions that you
deployed your {+database-deployment+} to. Each regional private
endpoint connects to the |mongos| instances in that region.

.. include:: /includes/admonitions/warnings/regionalized-pls-change-connection-strings.rst

.. include:: /includes/enable-regionalized-privatelink.rst

To use this feature, you must enable the regionalized private 
endpoint setting:

.. include:: /includes/steps/enable-regionalized-private-endpoints.rst
