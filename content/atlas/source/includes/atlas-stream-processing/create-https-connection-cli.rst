Add an HTTPS Connection through the {+atlas-cli+}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To add an HTTPS connection to your {+spw+} through
{+atlas-cli+}, follow these steps:

.. procedure:: 
   :style: normal

   .. step:: Create a config.json file.

      .. code-block:: javascript

         {
            "name": "ExampleHTTPSConnection",
            "type": "Https",
         }

   .. step:: Create the HTTPS connection.

      Run the following {+atlas-cli+} command to create the connection:

      .. code-block:: sh

         atlas streams connections create -i <instance-name> -f </path/to/config.json>

.. include:: /includes/atlas-stream-processing/https-stage-support.rst
