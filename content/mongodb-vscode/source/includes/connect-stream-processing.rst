.. versionadded:: 1.50

You can use |vsce| to connect to :ref:`Atlas Stream Processing <atlas-sp-overview>`
by providing a Stream Processing Workspace (SPW) connection string.

For details on how to configure Atlas Stream Processing, see 
:ref:`manage-spi`. 

.. procedure::
   :style: normal
   
   .. step:: Open the connections pane

      a. Expand the :guilabel:`Connections` pane in the left navigation 
         if it is collapsed.

      #. Click the More Actions menu (...) and select
         :guilabel:`Add MongoDB Connection with Connection String...`

   .. step:: Paste in an SPW connection string

      To obtain an SPW connection string login to your 
      :atlas:`Atlas </>` account.
      Click :guilabel:`Stream Processing` from the left-hand navigation 
      and then select a Stream Processing Workspace. Click 
      :guilabel:`Connect` and choose :guilabel:`MongoDB for VSCode` from
      the :guilabel:`Choose a Connection Method` page of the connect 
      dialog.

      .. tip::

         For full details on using and configuring 
         Atlas Stream Processing, see :ref:`atlas-sp-overview`. 

      The following code block is an example of SPW connection string:

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


   .. step:: Create a Stream Processor
         You can create new Stream Processors from the |vsce| 
         :guilabel:`Connections` pane. 

         a. Right click over your Stream Processing connection.

         #. From the menu, select :guilabel:`Add streamProcessor`.
            A Stream Processor JavaScript file will open for you to fill in.

         #. Once you have filled in your streamProcessor JavaScript Playground file,
            click over the :guilabel:`Play` button at the top level of your |vsce|
            space. 

         .. figure:: /images/vsce-add-stream-processor.png
            :figwidth: 700px
            :alt: Image of the add stream processor menu option
         

   .. step:: Start, Stop or Drop a Stream Processor
         
      You can manage your Stream Processors from the |vsce| 
      :guilabel:`Connections` pane. Right-click over the Stream Processor of your
      connection and select the option that you want to apply to your Stream
      Processor. 

      .. figure:: /images/vsce-sp-options.png
         :figwidth: 700px
         :alt: Image of the stream processors options in VSCode



