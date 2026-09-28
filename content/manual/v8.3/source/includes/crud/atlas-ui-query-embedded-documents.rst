.. _query-embedded-documents-atlas-ui:

Query Embedded Documents with {+atlas+}
---------------------------------------------------

This example uses the :atlas:`sample movies dataset 
</sample-data/sample-mflix/>`. To load the sample dataset into your
{+atlas+} deployment, see :atlas:`Load Sample Data 
</sample-data/#std-label-load-sample-data>`.

To query an embedded document in {+atlas+}, follow these steps:

.. procedure:: 
   :style: normal

   .. include:: /includes/atlas-nav/steps-db-deployments-page.rst

   .. step:: Navigate to the collection

      .. include:: /includes/steps-nav-atlas-sample-movies.rst

   .. step:: Specify the query filter document

      .. include:: /includes/steps-specify-query-filter.rst

      .. code-block:: javascript

         { "awards.wins": 1 }

   .. step:: Click :guilabel:`Apply`

      This query filter returns all documents in the 
      ``sample_mflix.movies`` collection where the embedded  document
      for the ``awards`` field contains ``{ wins: 1 }``.
