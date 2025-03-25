a. Connect to the |service| {+cluster+} using {+mongosh+}.

   In a terminal window, run ``atlas deployments connect`` and follow the prompts
   to connect to your local |service| deployment via {+mongosh+}. 
   For detailed instructions on connecting, see
   :atlascli:`Manage a Local Atlas Deployment </atlas-cli-deploy-local/#manage-a-local-atlas-deployment>`.

#. Switch to the database that contains the collection for which you want to create the index. 

   .. example:: 

      .. io-code-block:: 
         :copyable: true 

         .. input:: 
            :language: shell
              
            use sample_mflix 

         .. output:: 
            :language: shell 

            switched to db sample_mflix

#. Run the :method:`db.collection.createSearchIndex()` method.

   .. literalinclude:: /includes/avs/index-management/create-index/basic-example-mongosh.sh  
      :language: shell
      :copyable: true 
      :linenos:

   .. include:: /includes/avs/tutorial/avs-quick-start-basic-index-description.rst
