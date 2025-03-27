To complete the following tutorials, you must have: 

- An |service| {+cluster+} with MongoDB version 4.2 or higher.

- The :ref:`sample data <sample-data>` loaded into your |service| 
  {+cluster+}.

- .. include:: /includes/atlas-roles/create-search-index.rst
   
- :ref:`Search Tester <atlas-search-queries>`, {+mongosh+}, {+Compass+}, or a supported
  :driver:`MongoDB Driver </>` to run queries on your {+cluster+}.
 
.. note:: 

   You can run |query-type| queries by using any driver
   through the |search-stage| aggregation stage.
   These tutorials include examples for a selection 
   of clients. Refer to the specific tutorial page for details.

   You can also complete these tutorials with local |service|
   deployments that you create with the {+atlas-cli+}. To learn more,
   see :atlascli:`Create a Local Atlas Deployment
   </atlas-cli-deploy-local>`. 