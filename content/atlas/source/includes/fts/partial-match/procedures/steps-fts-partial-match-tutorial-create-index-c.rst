a. Install the MongoDB C Driver.

   For installation instructions, see the 
   :driver:`MongoDB C Driver documentation </c/current>`.

#. Create the index.

   .. tabs::

      .. tab:: autocomplete
         :tabid: autocomplete

         Create a file named ``create_auto_complete_index.c`` and paste the following code:

         .. literalinclude:: /includes/fts/partial-match/createAutoCompleteIndex.c
            :language: c
            :copyable: true


      .. tab:: string
         :tabid: string

         Create a file named ``create_string_index.c`` and paste the following code:

         .. literalinclude:: /includes/fts/partial-match/createStringIndex.c
            :language: c
            :copyable: true

#. Compile and run the program.

   .. code-block:: shell

      gcc -o create_index create_index.c $(pkg-config --cflags --libs libmongoc-1.0)
      ./create_index