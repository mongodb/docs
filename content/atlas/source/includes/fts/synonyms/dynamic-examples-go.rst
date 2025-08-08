Use Dynamic Mappings
--------------------

.. include:: /includes/fts/synonyms/dynamic-intro.rst

.. procedure::
   :style: normal

   .. step:: Set up your application.

      To learn how to install the driver and configure your Go application, see the
      :driver:`Get Started </go/current/get-started>`
      tutorial in the MongoDB Go Driver documentation.

   .. step:: Define the index.

      Create a ``create-dynamic-index.go`` file in your project directory,
      and copy and paste the following code into the file.

      .. literalinclude:: /includes/fts/synonyms/create-dynamic-index.go
         :caption: create_dynamic_index.go
         :language: go
         :linenos:
         :copyable:

   .. step:: Create the index.
      
      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            go run create_dynamic_index.go

         .. output::
            :visible: false

            New index name: default