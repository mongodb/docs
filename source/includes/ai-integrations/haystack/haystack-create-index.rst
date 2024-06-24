.. procedure:: 
   :style: normal 

   .. include:: /includes/nav/steps-db-deployments-page.rst

   .. step:: Create the ``haystack_db.test`` collection.

      a. From the |service| :guilabel:`{+Database-Deployments+}` view, click the
         :guilabel:`Browse Collections` button for your {+cluster+}.
      #. Click the :guilabel:`+ Create Database` button. 
      #. For the :guilabel:`Database name` enter ``haystack_db``.
      #. For the :guilabel:`Collection name`,  enter ``test``.
      #. Click :guilabel:`Create` to create the database and its 
         first collection.

   .. step:: Define the {+avs+} index.

      a. Click :guilabel:`Create Search Index`.
      #. Under :guilabel:`{+avs+}`, select :guilabel:`JSON Editor`  and
         then click :guilabel:`Next`.
      #. In the :guilabel:`Database and Collection` section, find the 
         ``haystack_db`` database, and select the ``test``
         collection.
      #. In the :guilabel:`Index Name` field, enter
         ``vector_index``. 
      #. Replace the default definition with the following index
         definition and then click :guilabel:`Next`.

         This index definition specifies indexing the ``embedding`` field
         in an index of the :ref:`vectorSearch
         <avs-types-vector-search>` type. The ``embedding`` field
         contains the embeddings that you'll create using OpenAI's
         ``text-embedding-ada-002`` embedding model. The index
         definition specifies ``1536`` vector dimensions and
         measures similarity using ``cosine``.

         .. code-block:: json 
            :copyable: true 
            :linenos: 

            {
               "fields": [
                  {
                     "type": "vector",
                     "path": "embedding",
                     "numDimensions": 1536,
                     "similarity": "cosine"
                  }
               ]
            }

   .. step:: Review the index definition and then click :guilabel:`Create Search Index`.

      A modal window displays to let you know that your index is building.

   .. step::  Click :guilabel:`Close` to close the :guilabel:`You're All Set!` modal window and wait for the index to finish building. 

      The index should take about one minute to build. While it
      builds, the :guilabel:`Status` column reads :guilabel:`Initial
      Sync`. When it finishes building, the :guilabel:`Status` column
      reads :guilabel:`Active`. 
