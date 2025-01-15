- To minimize network latency and data transfer costs, and 
  to increase overall stability and security, use the 
  same cloud provider and region to host
  your application and {+cluster+} when possible.

- .. include:: /includes/facts/cross-region-limits.rst

- M30 and higher clusters are recommended for production environments.
  {+Clusters+} with sustained loads on M10 and M20 tiers may experience
  degraded performance over time.

- .. include:: /includes/fact-database-deployment-project-limit.rst

- If your |service| project contains a
  :ref:`custom role <mongodb-roles>` that uses actions introduced
  in a specific MongoDB version, you must delete that role before
  creating clusters with an earlier MongoDB version.

- |service| clusters created after July 2020 use |tls| version 1.2 by
  default.

  .. include:: /includes/tls-deprecation.rst

-  When you create a cluster, |service| creates a 
   :oas-atlas-op:`network container 
   </createOneNewNetworkPeeringContainer>` in the project for the cloud 
   provider to which you deploy the cluster if one does not already 
   exist.
   
- If you have a :ref:`{+bcp+} enabled <backup-compliance-policy>`, all 
  new and existing {+clusters+} have {+Cloud-Backup+} automatically 
  enabled and use the project-level {+bcp+}. |service| augments any 
  preexisting {+cluster+}-level policies to meet the minimum 
  requirements of the {+bcp+}. All new {+clusters+} use the {+bcp+} 
  unless the mininum requirements of the 
  :ref:`{+cluster+}-level backup policy <configure-backup-policy>` 
  expand beyond the mininum requirements of the {+bcp+}.
  
