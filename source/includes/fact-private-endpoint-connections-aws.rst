Connections to |service| {+database-deployments+} using private
endpoints offer the following advantages over other network
access management options:

- Connections using private endpoints are one-way. |service|
  |vpc|\s can't initiate connections back to your |vpc|\s. This
  ensures your perceived network trust boundary is not extended.

- Connections to private endpoints within your |vpc| can be made
  transitively from:

  - Another |vpc| peered to the private endpoint-connected |vpc|.
  - An on-premises data center connected with `DirectConnect 
    <https://docs.aws.amazon.com/whitepapers/latest/aws-vpc-connectivity-options/aws-direct-connect.html>`__
    to the private endpoint-connected |vpc|. This enables you to
    connect to |service| directly from your on-premises data 
    center without adding public IP addresses to the |service| 
    :doc:`IP access list </security/ip-access-list>`.
