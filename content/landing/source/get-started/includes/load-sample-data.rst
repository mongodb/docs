You can run the following commands to load sample data into your deployment:

.. tabs::

   .. tab:: Local Deployment
      :tabid: local

      Run the following commands from your terminal to install the
      MongoDB Database Tools:
      
      .. code-block:: bash

         brew tap mongodb/brew
         brew install mongodb-database-tools

      Then, run the following commands to load the sample data:
      
      .. code-block:: bash

         curl https://atlas-education.s3.amazonaws.com/sampledata.archive -o sampledata.archive
         mongorestore --archive=sampledata.archive --port <port number>

      .. note::

         Replace the ``<port number>`` placeholder with the port number
         of your deployment. Your port number can be found in Docker
         Desktop.

   .. tab:: Cloud Deployment
      :tabid: cloud

      .. code-block:: bash

         atlas clusters sampleData load myDeployment