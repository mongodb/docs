Add an External Function Connection through {+atlas-ui+}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To add an external function connection to your Stream Processing Workspace through
{+atlas-ui+}, follow these steps:

.. procedure::
   :style: normal 

   .. step:: Navigate to your {+spw+}.

      Select the :guilabel:`Stream Processing` tab in the left sidebar 
      menu in the |service| UI. 

   .. step:: Configure your connection.

      #. Click the :guilabel:`Configure` button for your +{spi+} to which
         you want to register a connection. 

      #. Select the :guilabel:`Connection Registry` tab. 

      #. Click the :guilabel:`Add Connection` button. 

      #. Select :guilabel:`AWS Lambda` from the :guilabel:`Connection Type` dropdown menu. 

      #. Name your new connection. 

      #. Select an :guilabel:`AWS IAM Role ARN` from the dropdown menu. 
         To learn more about creating an :guilabel:`AWS IAM Role ARN`, 
         see :ref:`Set Up Unified AWS Access <set-up-unified-aws-access>`.

      #. Click the :guilabel:`Create Connection` button to create the connection.
