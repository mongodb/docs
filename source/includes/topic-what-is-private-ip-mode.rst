.. topic:: What is Private IP Mode?

   Private IP mode applies to |gcp| dedicated clusters only and is
   required to use |gcp| |vpc| Peering.

   When enabled, connections from public IPs outside of the peered |vpc| will not be able to reach MongoDB Atlas dedicated clusters. This setting disables the ability to:

   1. Deploy non-|gcp| dedicated clusters in this Atlas project, and
   2. Use MongoDB Stitch with dedicated clusters in this Atlas project. 

   This setting cannot be enabled or disabled while you have dedicated
   |gcp| clusters or peering connections in this Project.
