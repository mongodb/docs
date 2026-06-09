To complete the tutorials, you must have: 

- An Atlas cluster with MongoDB version 6.0 or later or a MongoDB
  self-managed cluster with MongoDB version 8.2 or later.

- The :ref:`sample data <load-sample-data>` loaded into your
  cluster.

- .. include:: /includes/shared/facts/atlas-roles-create-search-index.rst
   
- Search Tester, {+mongosh+}, {+Compass+}, or a supported
  :driver:`MongoDB Driver </>` to run queries on your cluster.
 
.. note:: 

   You can run |query-type| queries by using any driver
   through the |search-stage| aggregation stage.
   These tutorials include examples for a selection 
   of clients. Refer to the specific tutorial page for details.


   You can also complete these tutorials with local deployments that you create
   with the {+atlas-cli+} or with an on-prem deployment. To learn more, see
   :atlascli:`Create a Local Atlas Deployment </atlas-cli-deploy-local>` and
   :ref:`self-managed-deployments`.