.. procedure::
   :style: normal

   .. step:: Install the MongoDB Scala Driver.

      For installation instructions based on your environment and the version 
      of Scala you are using, refer to the `MongoDB Scala Driver documentation
      <https://www.mongodb.com/docs/languages/scala/scala-driver/v5.1/installation/>`__.

   .. step:: Create a new Scala project.
   
      This exammple uses a project named ``quick-start`` with
      `sbt <https://www.scala-sbt.org>`__. 

      .. code-block:: sh

         sbt new scala/hello-world.g8
         
      The application name for this example is ``quick-start``.

   .. step:: Define your index in a new file.

      Navigate to your ``quick-start`` project and create a new file.  

      This example uses a file named ``VectorIndex.scala`` with the following
      index definition:

      .. literalinclude:: /includes/search-in-community/basic-example.scala
         :language: scala
         :copyable: true
         :caption: VectorIndex.scala
         :emphasize-lines: 8
         :linenos:

      .. include:: /includes/search-in-community/vs-quick-start-basic-index-description.rst

         This code also includes a polling mechanism to check if the index is ready to use.

   .. step:: Specify your ``<connection-string>``.

      .. include:: /includes/search-in-community/steps-connection-string-drivers-hidden.rst

   .. step:: Create a class instance and call the function.

      In the project's ``Main.scala`` file, the following code calls your index
      creation function:

      .. code-block:: scala

         object Main extends App {
            private val indexInstance = new VectorIndex
            indexInstance.createIndex()
         }

   .. step:: Run the index creation file.

      Run the file in your IDE, or execute a command from the command line to
      run the code.

      There are many tools and environments in which Scala runs. In this example, 
      we run the new Scala project by starting the sbt server with the ``sbt`` 
      command, then typing ``~run``.

      .. io-code-block::
         :copyable: true 

         .. input:: 
            :language: shell 

            sbt:quick-start> ~run

         .. output:: /includes/search-in-community/create-index-output.sh
            :language: console

   .. step:: Define your query in a new file.

      This example uses a file named ``VectorQuery.scala`` with the following
      sample query:

      .. literalinclude:: /includes/search-in-community/basic-query.scala
         :language: scala
         :copyable: true
         :caption: VectorQuery.scala
         :emphasize-lines: 9
         :linenos:

      .. include:: /includes/search-in-community/fact-vs-quick-start-intro-II.rst

      To learn more about this pipeline stage, see :ref:`return-vector-search-results`.

   .. step:: Specify your ``<connection-string>``.

      .. include:: /includes/search-in-community/steps-connection-string-drivers-hidden.rst

   .. step:: Update your ``Main.scala`` file.

      Create a class instance and call the function in your project's
      ``Main.scala`` file.

      .. code-block:: scala

         object Main extends App {
            private val queryInstance = new VectorQuery
            queryInstance.performVectorQuery()
         }

   .. step:: Run your query.

      .. io-code-block::
         :copyable: false

         .. input::
            :language: bash

            sbt:quick-start> ~run

         .. output:: /includes/search-in-community/basic-query-nodejs-output.js
            :language: js
            :linenos: 