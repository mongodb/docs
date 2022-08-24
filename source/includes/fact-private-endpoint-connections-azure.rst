Connections to |service| {+database-deployments+} using private
endpoints offer the following advantages over other network access
management options:

- Connections using private endpoints are one-way. |service|
  VNets can't initiate connections back to your VNets. This
  ensures your perceived network trust boundary is not extended.

- Connections to private endpoints within your VNet can be 
  made transitively from:

  - Another VNet peered to the private endpoint-connected VNet.
  - An on-premises data center connected with
    `ExpressRoute <https://azure.microsoft.com/en-us/services/expressroute/>`__
    to the private endpoint-connected VNet. This enables 
    you to connect to |service| directly from your 
    on-premises data center without adding public IP 
    addresses to the |service| :doc:`IP access list 
    </security/ip-access-list>`.