.. include:: /includes/fts/facts/fact-fts-wildcard-limit-project-stages.rst

Copy and paste the following query into the
:guilabel:`Query Editor`, and then click the :guilabel:`Search`
button in the :guilabel:`Query Editor`.

.. code-block:: javascript

   [
     {
       $search: {
         wildcard: {
           path: "title",
           query: "Wom?n *"
         }
       }
     },
     { $limit: 5 },
     {
       $project: {
         _id: 0,
         title: 1
       }
     }
   ]
