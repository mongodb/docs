Define the Index for the |fts-field-type| Type  
----------------------------------------------

.. procedure::
   :style: normal

   .. step:: Set up and initialize the Go module.

      In your terminal, navigate to where you want to create your application, 
      then run the following command to create a directory called 
      ``atlas-search-project`` and initialize your project in that directory: 
      
      .. literalinclude:: /includes/fts/field-types/initialize-project-go.sh
         :language: shell
         :copyable: true

      For more detailed installation instructions, see the
      :ref:`MongoDB Go Driver documentation <go-get-started>`.

   .. step:: Define the index.
      
      Create a ``create_index.go`` file in your project directory, 
      and copy and paste the following code into the file.  

      .. literalinclude:: /includes/fts/field-types/geo/create_index.go
         :caption: create_index.go
         :language: go
         :linenos:
         :copyable:

      .. include:: /includes/steps-connection-string-drivers-hidden.rst

   .. step:: Create the index.
      
      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            go run create_index.go

         .. output::
            :visible: false

            New index name: default
