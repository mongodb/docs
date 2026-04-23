.. procedure:: 
   :style: normal

   .. step:: Run the {+atlas-cli+} command to create a local |service| deployment with sample data loaded into the deployment. 

      .. io-code-block:: 
         :copyable: true 

         .. input:: 
            :language: javascript

            MONGODB_ATLAS_LOCAL_PREVIEW=true atlas local setup --loadSampleData true --force

         .. output:: 
            :language: javascript

            "Installing first class plugin atlas-local-plugin"
            "Plugin mongodb/atlas-local-cli successfully installed"
            [1/4] [✅]   Pulling the latest version of the MongoDB image...
            [2/4] [✅]   Creating the deployment...
            [3/4] [✅]   Starting the deployment...
            [4/4] [✅]   Waiting for the deployment to be healthy...
            {"outcome":"setup","deployment_name":"local7816","mongodb_version":"8.2.5","port":53211,"load_sample_data":true,"connect_result":{"connect_outcome":"skipped"}}

   .. step:: Connect to your local |service| deployment.

      To connect, run the following command after replacing ``<deployment_name>`` 
      with the name of your local |service| deployment.

      .. code-block:: shell 

         atlas local connect --connectWith mongosh <deployment_name>
