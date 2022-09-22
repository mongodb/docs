- .. include:: /includes/facts/cross-region-limits.rst

- .. include:: /includes/fact-database-deployment-project-limit.rst

- If your |service| project contains a
  :ref:`custom role <mongodb-roles>` that uses actions introduced
  in a specific MongoDB version, you must delete that role before
  creating clusters with an earlier MongoDB version.

- |service| clusters created after July 2020 use |tls| version 1.2 by
  default.

-  When you create a cluster, |service| creates a 
   :oas-atlas-op:`network container 
   </createOneNewNetworkPeeringContainer>` in the project for the cloud 
   provider to which you deploy the cluster if one does not already 
   exist.
   