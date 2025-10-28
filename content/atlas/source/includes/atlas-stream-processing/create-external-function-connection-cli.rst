Add an External Function Connection through {+atlas-cli+}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To add an external connection to your Stream Processing Workspace through
Atlas CLI, follow these steps:

.. procedure:: 
   :style: normal

   .. step:: Create a ``config.json`` file.

      .. code-block:: javascript

         {
            "name": "ExampleExternalFunctionConnection",
            "type": "AWSLambda",
            "aws": {
               "roleArn": "<your-aws-role-arn>"
            }
         }

   .. step:: Create the External Function connection.

      Run the following {+atlas-cli+} command to create the connection:

      .. code-block:: sh

         atlas streams connections create -i <instance-name> -f </path/to/config.json>
