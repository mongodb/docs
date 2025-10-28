.. _https-sp-connection-atlas-ui:

Add an HTTPS Connection through {+atlas-ui+}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To add an HTTPS connection to your {+spw+} through
{+atlas-ui++}, follow these steps:

.. procedure::
   :style: normal 

   .. step:: Navigate to your {+spw+}.

      Select the :guilabel:`Stream Processing` tab in the left sidebar 
      menu in the |service| UI. 

   .. step:: Configure your connection.

      #. Click the :guilabel:`Configure` button for the {+spw+} to which you 
         want to register a connection. 

      #. Select the :guilabel:`Connection Registry` tab. 

      #. Click the :guilabel:`Add Connection` button. 

      #. Select :guilabel:`HTTPS` from the :guilabel:`Connection Type` dropdown menu. 

      #. Name your new connection. 

      #. Populate the :guilabel:`URL` input field with the URL your stream 
         processor will make requests to.

      #. Add any required :guilabel:`headers` to be sent with the HTTPS request, such 
         as the data type or authentication credentials required by the external API. 

      #. Click the :guilabel:`Create Connection` button to create the connection.
