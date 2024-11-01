.. procedure:: 
   :style: normal 

   .. step:: Install the MongoDB Scala Driver.

      For installation instructions based on your environment and the version 
      of Scala you are using, refer to the 
      :ref:`MongoDB Scala Driver documentation <scala-install>`.

   .. step:: Construct your vector search query.

      .. include:: /includes/fact-avs-quick-start-intro.rst
    
      a. Create a new Scala project with the tools you normally use. For this 
         quick start, we create a project named ``quick-start``, by using 
         `sbt <https://www.scala-sbt.org>`__.

         .. code-block:: sh

            sbt new scala/hello-world.g8
        
         When prompted, name the application ``quick-start``.

      b. Open the ``Main.scala`` file and replace the contents with the following 
         vector search query:

         .. literalinclude:: /includes/avs-examples/pipeline-stage-examples/basic-query.scala

      .. include:: /includes/fact-avs-quick-start-intro-II.rst

      To learn more about this pipeline stage, see :ref:`return-vector-search-results`.

   .. step:: Specify the ``<connection-string>``.

      .. include:: /includes/steps-connection-string-drivers-hidden.rst

   .. step:: Run your query.

      There are many tools and environments in which Scala runs. In this example, 
      we run the new Scala project by starting the sbt server with the ``sbt`` 
      command, then typing ``~run``.
  
      .. io-code-block::
         :copyable: false

         .. input::
            :language: bash

            sbt:quick-start> ~run
        
         .. output:: /includes/avs-examples/pipeline-stage-examples/basic-query-nodejs-output.js 
            :language: js
            :linenos: 
