.. procedure::
   :style: normal
   
   .. step:: Download the sample data. 

      Run the following command in your terminal to download the sample data:

      .. code-block::
         
         curl  https://atlas-education.s3.amazonaws.com/sampledata.archive -o sampledata.archive

   .. step:: Load the data into your deployment.

      Run the following command to load the data into your deployment,
      replacing ``<port-number>`` with the port where you're hosting the 
      deployment:

      .. code-block:: 

         mongorestore --archive=sampledata.archive --port=<port-number>