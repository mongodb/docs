.. topic:: What is :guilabel:`Connect via Peering Only` Mode?

   :guilabel:`Connect via Peering Only` mode prevents clusters in an |service| project from
   connecting to any network destination other than aan |service| Network Peer.
   :guilabel:`Connect via Peering Only` mode applies only to |gcp| and |azure|-backed dedicated clusters.
   This setting disables the ability to:

   1. Deploy non-|gcp| or |azure|-backed dedicated clusters in an |service| project, and
   2. Use MongoDB Stitch with dedicated clusters in an |service| project.
