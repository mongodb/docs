.. step:: Set up your |service| {+cluster+}.

   a. `Create a free Atlas account or sign in to an existing account <https://account.mongodb.com/account/register>`__.

   #. If you don't yet have an |service| cluster, `create a free M0 cluster <https://cloud.mongodb.com/go?l=https%3A%2F%2Fcloud.mongodb.com%2Fv2%2F%3Cproject%3E%23clusters%2Fedit%3Ffrom%3DctaClusterHeader>`__.
      To learn more about creating an |service| cluster, see :ref:`Create a Cluster <create-new-cluster>`.
      
      :gold:`IMPORTANT:` If you are working with an existing cluster, you must 
      have :authrole:`Project Data Access Admin` or higher :ref:`access <who-can-access-project>` to your 
      |service| project.

      If you create a new cluster, you have the necessary permissions by default.

      You can create only one ``M0`` {+Free-cluster+} per :ref:`project. <atlas-ui-auth-projects>`

   #. If you haven't yet loaded the :ref:`sample dataset <vector-search-quickstart-sample-data>` for this quick start onto your {+cluster+}, 
      :ref:`load <load-sample-data>` the ``sample_mflix`` sample database onto your cluster.

      If you already loaded the ``sample_mflix`` dataset, :ref:`check <atlas-ui-collections>` that the ``sample_mflix`` database contains the ``embedded_movies`` 
      collection. If it doesn't, :ref:`drop <atlas-ui-drop-a-db>` the ``sample_mflix`` database and :ref:`reload <load-sample-data>` the ``sample_mflix`` dataset.

      Loading the sample dataset can take several minutes to complete. 

   #. In the left sidebar, click `Atlas Search <https://cloud.mongodb.com/go?l=https%3A%2F%2Fcloud.mongodb.com%2Fv2%2F%3Cproject%3E%23%2Fclusters%2FatlasSearch>`__. 
      Choose your cluster from the :guilabel:`Select data source` menu and click :guilabel:`Go to Atlas Search`.
