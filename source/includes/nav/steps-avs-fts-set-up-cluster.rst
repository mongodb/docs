.. step:: Set up your |service| {+cluster+}.

   a. `Create a free Atlas account or sign in to an existing account <https://account.mongodb.com/account/register?tck=docs_atlas>`__.

   #. `Create a free M0 cluster <https://cloud.mongodb.com/go?l=https%3A%2F%2Fcloud.mongodb.com%2Fv2%2F%3Cproject%3E%23clusters%2Fedit%3Ffrom%3DctaClusterHeader>`__
      or use an existing {+cluster+}.

      To learn more, see :ref:`Create a Cluster <create-new-cluster>`.

      .. note:: 

         If you use an existing {+cluster+}, you must have 
         :authrole:`Project Data Access Admin` access or higher to your 
         |service| project.

   #. In the left sidebar, click `Atlas Search <https://cloud.mongodb.com/go?l=https%3A%2F%2Fcloud.mongodb.com%2Fv2%2F%3Cproject%3E%23%2Fclusters%2FatlasSearch>`__. 
      Choose your {+cluster+} from the :guilabel:`Select data source` menu and click :guilabel:`Go to Atlas Search`.

   #. Click :guilabel:`Load a Sample Dataset` and confirm your selection.

      This can take a few minutes to complete.

      .. note:: 
         
         If you already loaded the sample dataset, confirm that the ``sample_mflix`` 
         database contains the |collection-name|. If it doesn't, 
         :ref:`drop <atlas-ui-drop-a-db>` the sample databases and 
         load the sample dataset again.
