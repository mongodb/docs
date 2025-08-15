a. Install the MongoDB C++ Driver.

   For installation instructions, see the 
   :driver:`MongoDB C++ Driver documentation </cxx/current>`.

#. Create the index.

   .. tabs::

      .. tab:: autocomplete
         :tabid: autocomplete

         Create a file named ``create_auto_complete_index.cpp`` and paste the following code:

         .. literalinclude:: /includes/fts/partial-match/createAutoCompleteIndex.cpp
            :language: cpp

      .. tab:: string
         :tabid: string

         Create a file named ``create_string_index.cpp`` and paste the following code:

         .. literalinclude:: /includes/fts/partial-match/createStringIndex.cpp
            :language: cpp

   .. include:: /includes/steps-connection-string-drivers-hidden.rst

#. Compile and run the program.

   .. code-block:: shell

      g++ --std=c++11 create_auto_complete_index.cpp $(pkg-config --cflags --libs libmongocxx) -o create_auto_complete_index
      ./create_auto_complete_index
      # or
      g++ --std=c++11 create_string_index.cpp $(pkg-config --cflags --libs libmongocxx) -o create_string_index
      ./create_string_index