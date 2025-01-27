a. Install the MongoDB Scala Driver.

   For installation instructions based on your environment and the version 
   of Scala you are using, refer to the 
   :ref:`MongoDB Scala Driver documentation <scala-quick-start-download-and-install>`.

#. Create a new Scala project with the tools you normally use. For this 
   quick start, we create a project named ``quick-start``, by using 
   `sbt <https://www.scala-sbt.org>`__.

   .. code-block:: sh

      sbt new scala/hello-world.g8
        
   When prompted, name the application ``quick-start``.

#. Navigate to your ``quick-start`` project and create a file named ``VectorIndex.scala``. Copy and paste the following
   code into the file.

   .. literalinclude:: /includes/avs-examples/index-management/create-index/basic-example.scala
      :language: scala
      :copyable: true
      :caption: VectorIndex.scala
      :emphasize-lines: 8
      :linenos:

   .. include:: /includes/avs-quick-start-basic-index-description.rst

   This code also includes a polling mechanism to check if the index is ready to use.

#. Specify the ``<connection-string>``.

   .. include:: /includes/steps-connection-string-drivers-hidden.rst

#. Create a class instance and call the function in your project's
   ``Main.scala`` file.

   .. code-block:: scala

      object Main extends App {
         private val indexInstance = new VectorIndex
         indexInstance.createIndex()
      }

#. Run the file in your IDE, or execute a command from the command line to
   run the code.

   There are many tools and environments in which Scala runs. In this example, 
   we run the new Scala project by starting the sbt server with the ``sbt`` 
   command, then typing ``~run``.

   .. io-code-block::
      :copyable: true 

      .. input:: 
         :language: shell 

         sbt:quick-start> ~run

      .. output:: /includes/avs-examples/index-management/create-index/create-index-output.sh
         :language: console
