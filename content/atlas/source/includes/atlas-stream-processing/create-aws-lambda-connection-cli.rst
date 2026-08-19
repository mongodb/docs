Add an AWS Lambda Connection through the {+atlas-cli+}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To add an {+aws+} Lambda connection to your {+spw+} through the
{+atlas-cli+}, follow these steps:

.. procedure:: 
   :style: normal

   .. step:: Create a ``config.json`` file.

      .. code-block:: javascript

         {
            "name": "ExampleAWSLambdaConnection",
            "type": "AWSLambda",
            "aws": {
               "roleArn": "<your-aws-role-arn>"
            }
         }

   .. step:: Create the {+aws+} Lambda connection.

      Run the following {+atlas-cli+} command to create the connection:

      .. code-block:: sh

         atlas streams connections create -i <instance-name> -f </path/to/config.json>

.. include:: /includes/atlas-stream-processing/aws-lambda-stage-support.rst
