.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-db-deployments-page.rst
      
   .. step:: Review the cluster details.
      
      The |service| console displays the following for clusters in the
      selected project:
      
      - Metadata:
      
        .. include:: /includes/list-tables/per-project-cluster-list.rst
      
      - High-level :ref:`metrics <monitor-cluster-metrics>`:
      
        - Read / write operations per second.
      
        - Number of open connections to the cluster.
      
        - Logical size of the cluster data.
      
        - Cluster disk |iops| (*Available on M10+ {+clusters+}*).
      
      .. note::
      
         |service| pauses monitoring for these metrics on ``M0``
         {+clusters+} without connection activity for seven days. |service|
         indicates which {+clusters+} fell into this state in the
         :guilabel:`Cluster Detail` view. |service| limits details
         displayed for these clusters.
      
         To resume monitoring, make a successful connection to the cluster using:
      
         - The {+atlas-admin-api+},
         - A :ref:`Driver <connect-via-driver>`,
         - {+mongosh+}, or
         - The :ref:`{+atlas-ui+} <atlas-ui>`.
      
