When |service| deploys a dedicated cluster, |service| checks if a |vpc|
or |vpc| connection exists for that provider and region. If not,
|service| creates them as part of the deployment. |service| assigns the
|vpc| a |cidr| block.

To limit a new |vpc| peering connection to one |cidr| block and region,
:oas-atlas-op:`create the connection </createOneNewNetworkPeeringConnection>`
first. Deploy the cluster after the connection starts.

|gcp| Clusters
  |gcp| |service| clusters use a default |cidr| block of **/18**. If
  your application requires a smaller block, create a
  :oas-atlas-op:`network peering container 
  </createOneNewNetworkPeeringConnection>` first. |service| limits the 
  clusters you create to the regions in this new container you created.

Multi-Region Clusters
  Multi-region clusters require one |vpc| peering connection for each
  region. MongoDB nodes can use only the peering connection that
  resides in the same region as the nodes to communicate with the
  peered |vpc|.

To learn more, see :doc:`/security-vpc-peering`.
