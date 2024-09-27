
.. procedure:: 
   :style: normal 

   .. step:: Set up your |service| {+cluster+}.

      a. `Create a free Atlas account or sign in to an existing account <https://account.mongodb.com/account/register?tck=docs_atlas>`__.

      #. If you don't yet have an |service| cluster, `create a free M0 cluster <https://cloud.mongodb.com/go?l=https%3A%2F%2Fcloud.mongodb.com%2Fv2%2F%3Cproject%3E%23clusters%2Fedit%3Ffrom%3DctaClusterHeader>`__.
         To learn more about creating an |service| cluster, see :ref:`Create a Cluster <create-new-cluster>`.
         
         .. note:: 

            If you are working with an existing cluster, you must have 
            :authrole:`Project Data Access Admin` or higher :ref:`access <who-can-access-project>` to your 
            |service| project.

            If you create a new cluster, you have the necessary permissions by default.

         You can create only one ``M0`` {+free-cluster+} per :ref:`project. <atlas-ui-auth-projects>`

      #. In the left sidebar, click `Atlas Search <https://cloud.mongodb.com/go?l=https%3A%2F%2Fcloud.mongodb.com%2Fv2%2F%3Cproject%3E%23%2Fclusters%2FatlasSearch>`__. 
         Choose your cluster from the :guilabel:`Select data source` menu and click :guilabel:`Go to Atlas Search`.

      #. If you haven't yet loaded the sample dataset onto your {+cluster+},
         click :guilabel:`Load a Sample Dataset`. In the Load Sample Dataset 
         dialog box, click :guilabel:`Load Sample Dataset` to confirm. 

         If you already loaded the sample dataset, :ref:`check <atlas-ui-collections>` 
         that the ``sample_mflix`` database contains the ``embedded_movies`` 
         collection. If it doesn't, :ref:`drop <atlas-ui-drop-a-db>` the sample databases and 
         :ref:`reload <sample-data>` the sample dataset.

         Loading the :ref:`sample dataset <vector-search-quickstart-sample-data>` 
         can take several minutes to complete. 

   .. step:: Create a Vector Search index.

      a. When the sample data finishes loading, click :guilabel:`Create Search Index`.

      #. Under the :guilabel:`Atlas Vector Search` section, select the 
         :guilabel:`JSON Editor` and click :guilabel:`Next`.

      #. In the :guilabel:`Database and Collection` section, expand the 
         ``sample_mflix`` database and select the ``embedded_movies`` collection.
         
         Each :term:`document` in this :term:`collection` contains information about a movie, 
         including a summary of the movie's plot as a string, which has also 
         been converted to and stored as a vector embedding in the document's ``plot_embedding`` field. 

      #. In the :guilabel:`Index Name` field, specify ``vector_index``.

      #. Copy and paste the following :ref:`vector search index definition <vector-search-quickstart-vector-index-definition>` 
         into the JSON Editor. 

         .. code-block::
            :copyable: true 
            :linenos: 

            {
              "fields": [{
                "type": "vector",
                "path": "plot_embedding",
                "numDimensions": 1536,
                "similarity": "dotProduct"
              }]
            }

         This index definition:

         - Indexes the ``plot_embedding`` field as the ``vector`` :ref:`type <avs-types-vector>`. 
           This field contains :term:`vector embeddings` that represent the summary of a 
           movie's plot.
         - Specifies ``1536`` :term:`vector dimensions <vector>`.
         - Measures :ref:`similarity <fields-similarity>` using ``dotProduct`` similarity.

      #. Click :guilabel:`Next`.

      #. Click :guilabel:`Create Search Index`. 

         The index should take about one minute to build. When your vector index is 
         finished building, the :guilabel:`Status` column reads :guilabel:`Active`.