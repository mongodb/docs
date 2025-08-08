Use Static Mappings
-------------------

.. include:: /includes/fts/synonyms/static-intro.rst

.. procedure::
   :style: normal

   .. step:: Set up your application.

      To learn how to install the driver and configure your Java application, see the
      :driver:`Get Started </java/sync/current/get-started/>`
      tutorial in the MongoDB Java Driver documentation.

   .. step:: Define the index.

      In your project's base package directory, create a 
      ``CreateStaticIndex.java`` file and copy and paste the following code 
      into this file.  

      .. literalinclude:: /includes/fts/synonyms/CreateStaticIndex.java
         :language: java
         :caption: CreateStaticIndex.java
         :linenos:
         :copyable: true

   .. step:: Compile and run the file to create the index.

      Compile and run your application in your IDE or your shell. 

      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            javac CreateStaticIndex.java
            java CreateStaticIndex

         .. output::
            :visible: false

            New index name: default