a. Install the MongoDB Node.js Driver.

   For installation instructions, see the 
   :driver:`MongoDB Node.js Driver documentation </node/current>`.

#. Create the index.

   .. tabs::

      .. tab:: autocomplete
         :tabid: autocomplete

         Create a file named ``create_auto_complete_index.js`` and paste the following code:

         .. literalinclude:: /includes/fts/partial-match/createAutoCompleteIndex.js
            :copyable: true
            :language: javascript

      .. tab:: string
         :tabid: string

         Create a file named ``create_string_index.js`` and paste the following code:

         .. literalinclude:: /includes/fts/partial-match/createStringIndex.js
            :copyable: true
            :language: javascript

#. Run the program.

   .. code-block:: shell

      node create_auto_complete_index.js
      # or
      node create_string_index.js