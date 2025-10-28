.. _https-sp-connection-atlas-cli:

Add an HTTPS Connection through Atlas CLI
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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
