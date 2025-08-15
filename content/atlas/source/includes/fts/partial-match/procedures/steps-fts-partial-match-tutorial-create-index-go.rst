a. Initialize your Go project and install the MongoDB Go Driver.

   .. code-block:: shell
    
      # Create a new directory and initialize the project
      mkdir atlas-search-partial-match && cd atlas-search-partial-match
      go mod init atlas-search-partial-match

   .. code-block:: shell

      # Add the MongoDB Go Driver to your project
      go get go.mongodb.org/mongo-driver/mongo

   For detailed installation instructions, see the
   :driver:`MongoDB Go Driver documentation </go/current>`.

#. Create the index.

   .. tabs::

      .. tab:: autocomplete
         :tabid: autocomplete

         Create a file named ``create_auto_complete_index.go`` and paste the following code:

         .. literalinclude:: /includes/fts/partial-match/createAutoCompleteIndex.go
            :language: go

      .. tab:: string
         :tabid: string

         Create a file named ``create_string_index.go`` and paste the following code:

         .. literalinclude:: /includes/fts/partial-match/createStringIndex.go
            :language: go

   .. include:: /includes/steps-connection-string-drivers-hidden.rst

#. Run the program.

   .. code-block:: shell

      go run create_auto_complete_index.go
      # or
      go run create_string_index.go