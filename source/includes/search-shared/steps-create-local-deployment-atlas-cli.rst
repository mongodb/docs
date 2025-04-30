.. procedure::
   :style: normal 

   .. step:: Create a local {+deployment+} by using the {+atlas-cli+}.
      
      Run ``atlas deployments setup`` and follow the prompts to create a 
      local deployment.
            
      For detailed instructions, see :atlascli:`Create a Local Atlas Deployment 
      </atlas-cli-deploy-local/#create-a-local-atlas-deployment-1>`.

   .. step:: Load the sample data into your {+deployment+}.

      a. Run the following command in your terminal to download the sample data:

         .. code-block:: 

            curl  https://atlas-education.s3.amazonaws.com/sampledata.archive -o sampledata.archive

      #. Run the following command to load the data into your {+deployment+},
         replacing ``<port-number>`` with the port where you're hosting the 
         {+deployment+}:

         .. code-block:: 

            mongorestore --archive=sampledata.archive --port=<port-number>

         .. note::

            You must install `MongoDB Command Line Database Tools
            <https://fastdl.mongodb.org/tools/db/mongodb-database-tools-macos-arm64-100.10.0.zip>`__
            to access the ``mongorestore`` command.
            