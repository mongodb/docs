``M0``, ``M2``, or ``M5`` Tier Clusters
  You can modify the cloud provider when you upgrade to an ``M10`` or larger cluster.

``M10`` or larger Tier Clusters
  You can select a different provider to change the cloud provider for your dedicated clusters.

Changing to a different provider could change the connection string to 
your new cluster if your old cluster was deployed on GCP or Azure 
before October 2020. Consider scheduling a time to :ref:`update your 
applications with the new connection string 
<atlas-faq-migrate-providers>` to resume connectivity to the cluster. 
|service| migrates data to the new cluster.
