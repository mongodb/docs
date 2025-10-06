.. versionadded:: 1.50

You can use |vsce| to connect to :ref:`Atlas Stream Processing <atlas-sp-overview>`
by providing a Stream Processing Interface (SPI) connection string.

For details on how to configure Atlas Stream Processing, see 
:ref:`manage-spi`. 

.. procedure::
   :style: normal
   
   .. step:: Open the connections pane

      a. Expand the :guilabel:`Connections` pane in the left navigation 
         if it is collapsed.

      #. Click the More Actions menu (...) and select
         :guilabel:`Add MongoDB Connection with Connection String...`

   .. step:: Paste in an SPI connection string

      To obtain an SPI connection string login to your 
      :atlas:`Atlas </>` account.
      Click :guilabel:`Stream Processing` from the left-hand navigation 
      and then select a Stream Processing Instance. Click 
      :guilabel:`Connect` and choose :guilabel:`MongoDB for VSCode` from
      the :guilabel:`Choose a Connection Method` page of the connect 
      dialog.

      .. tip::

         For full details on using and configuring 
         Atlas Stream Processing, see :ref:`atlas-sp-overview`. 

      The following code block is an example of SPI connection string:

      .. code-block::

         mongodb://user1:password1@atlas-stream-xxxxxxxxxxxxxxxxxxxxxxxx-yyyyy.virginia-usa.a.query.mongodb.net/?authSource=admin&readPreference=primary&ssl=true&directConnection=true

      Once you are connected, the stream connection displays under 
      the :guilabel:`Connections` pane:

      .. figure:: /images/vsce-stream-connection-example.png
         :figwidth: 700px
         :alt: Image of a stream connection

   .. step:: Open a new |vsce| playground

      After successfully connecting to your Atlas Stream, click 
      :guilabel:`Create New Playground` on the :guilabel:`Playgrounds` 
      pane. A stream processing playground template displays with 
      pre-populated code that allows you to list stream connections 
      and process stream data:

      .. figure:: /images/vsce-stream-connection-playground.png
         :figwidth: 700px
         :alt: Image of a stream processing template


