.. procedure::
   :style: normal 

   .. step:: Connect from the {+atlas-cli+}.

      In your terminal, run ``atlas auth login`` to authenticate with your 
      |service| login credentials. To learn more, see 
      :atlascli:`Connect from the {+atlas-cli+} </connect-atlas-cli/>`.

      .. note::

         If you don't have an existing |service| account, run ``atlas setup`` 
         or `create a new account <https://account.mongodb.com/account/register?tck=docs_atlas>`__.

   .. step:: Create a local {+deployment+} by using the {+atlas-cli+}.
      
      Run ``atlas deployments setup`` and follow the prompts to create a 
      local deployment.
            
      For detailed instructions, see :atlascli:`Create a Local Atlas Deployment 
      </atlas-cli-deploy-local/#create-a-local-atlas-deployment-1>`.

   .. step:: Load the sample data into your {+deployment+}.

      a. Run the following command in your terminal to download the sample data:

         .. code-block:: sh

            curl  https://atlas-education.s3.amazonaws.com/sampledata.archive -o sampledata.archive

      #. Run the following command to load the data into your {+deployment+},
         replacing ``<port-number>`` with the port where you're hosting the 
         {+deployment+}:

         .. code-block:: sh

            mongorestore --archive=sampledata.archive --port=<port-number>
            