``M0`` Tier Clusters
  You can modify the cloud provider and region only when
  you scale up your ``M0`` {+cluster+} to a larger {+cluster+}.

``M2``, {+Flex-cluster+}, or larger Tier Clusters
  You can modify the cloud provider and region when you
  modify your {+cluster+} or scale up to a larger {+cluster+}. 

Changing to a different provider could change the connection string to 
your new {+cluster+} if your old {+cluster+} was deployed on |gcp| or
|azure| before October 2020. Consider scheduling a time to :ref:`update your 
applications with the new connection string 
<atlas-faq-migrate-providers>` to resume connectivity to the {+cluster+}. 
|service| migrates data to the new {+cluster+}. 

You can't modify the cloud provider or cloud provider region if you
deployed Search Nodes on your |service| {+cluster+}.