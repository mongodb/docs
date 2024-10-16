.. procedure:: 
   :style: normal 

   .. include:: /includes/nav/steps-db-deployments-page.rst

   .. include:: /includes/nav/steps-atlas-search.rst

   .. step:: Define the {+avs+} index.

      a. Click :guilabel:`Create Search Index`.
      #. Under :guilabel:`{+avs+}`, select :guilabel:`JSON Editor`  and
         then click :guilabel:`Next`.
      #. In the :guilabel:`Database and Collection` section, find the 
         ``sample_airbnb`` database, and select the ``listingsAndReviews``
         collection.
      #. In the :guilabel:`Index Name` field, enter
         ``vector_index``. 
      #. Replace the default definition with the following index
         definition and then click :guilabel:`Next`.

         This index definition specifies indexing the ``embeddings`` field
         in an index of the :ref:`vectorSearch <avs-types-vector-search>` type
         for the ``sample_airbnb.listingsAndReviews`` collection.
         This field contains the embeddings created using the
         embedding model. The index
         definition specifies ``1024`` vector dimensions and
         measures similarity using ``cosine``.
           
         .. code-block::
            :copyable: true 

            {
               "fields":[
                  {
                     "type": "vector",
                     "path": "embeddings",
                     "numDimensions": 1024,
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
