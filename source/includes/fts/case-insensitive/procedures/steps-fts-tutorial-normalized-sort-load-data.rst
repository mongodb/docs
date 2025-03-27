.. procedure:: 
   :style: normal 

   .. include:: /includes/nav/steps-db-deployments-page.rst

   .. include:: /includes/nav/steps-data-explorer.rst

   .. step:: Load the collection to a database in your |service| {+cluster+}. 

      You can load the collection from your {+atlas-ui+} or {+mongosh+}:

      .. tabs:: 
         
         .. tab:: Atlas UI 
            :tabid: ui 

            a. Expand the ``sample_mflix`` database and select the
               ``movies`` collection. 
            #. For each of the sample document to add to the collection,
               do the following: 

               i. Click :guilabel:`Insert Document` and select the
                  |json| view (**{}**) to replace the default document. 
               #. One at a time, copy and paste the following sample documents 
                  and click :guilabel:`Insert` to add each document to
                  the collection. 

               .. code-block:: json
                  :copyable: true
                  :linenos:
               
                  {
                     "genres": [ "Action", "Drama", "Thriller" ],
                     "title": "atomic train",
                     "awards": { "wins": 1, "nominations": 1 }
                  }
                  
               .. code-block:: json
                  :copyable: true
                  :linenos:  

                  {
                     "genres": [ "Animation", "Adventure", "Family" ],
                     "title": "how to train your dragon",
                     "awards": { "wins": 32, "nominations": 51 }
                  }

         .. tab:: mongosh 
            :tabid: mongosh 

            a. Click :guilabel:`Connect` for the {+database-deployment+} to which you
               want to connect. 

            #. Select :guilabel:`Shell` and
               complete the steps to connect to your {+cluster+} through
               {+mongosh+}.

               To learn more, see :ref:`connect-mongo-shell`.

            #. Switch to the ``sample_mflix`` database in {+mongosh+}. 

               .. io-code-block::
                  :copyable: true
      
                  .. input::
                     :language: shell

                     use sample_mflix
      
                  .. output:: 
                     :language: shell
      
                     switched to db sample_mflix 

            #. Run the following command in {+mongosh+} to load the
               collection to the selected database:

               .. io-code-block::
                  :copyable: true
               
                  .. input:: /includes/fts/case-insensitive/sample-collection.sh
                     :language: json
                     :linenos: 
               
                  .. output:: 
                     :language: shell

                     { acknowledged: true, insertedIds: { '0': 1, '1': 2 } }
