.. procedure::
   :style: normal

   .. step:: Define the materialized view and its updater.

      Create a ``create_update_view.cpp`` file in your ``search-materialized-view`` project directory, 
      and copy and paste the following code into the file. This file performs the following
      actions:

      1. Connects to your MongoDB deployment using the connection string
      #. Immediately updates the ``monthlyPhoneTransactions`` materialized view by:

         - Filtering transactions with purchase method of ``"Phone"``
         - Unwinding the items array to process each item
         - Grouping transactions by month and year
         - Calculating total sales quantity and price for each month
        
      #. Sets up a scheduler that runs on the first day of each month at midnight
      #. Continues running in the background, automatically refreshing the view on schedule

      The materialized view stores aggregated data about phone transactions by month,
      which can significantly improve query performance for search operations.

      .. literalinclude:: /includes/fts/materialized-view/create-update-view.cpp
         :caption: create_update_view.cpp
         :language: cpp
         :linenos:
         :copyable:

      .. include:: /includes/search-shared/find-connection-string.rst

   .. step:: Run the application.

      In your terminal, run the following commands to build and run this 
      application: 
      
      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            c++ --std=c++17 create_update_view.cpp $(pkg-config --cflags --libs libmongocxx) -o ./view_updater.out
            ./view_updater.out

         .. output::

            Initial update completed. Materialized view is ready.
      
      .. tip:: MacOS Error
         
         MacOS users might see the following error after running the preceding 
         commands:

         .. code-block:: sh
         
            dyld[54430]: Library not loaded: @rpath/libmongocxx._noabi.dylib

         To resolve this error, use the ``-Wl,-rpath`` linker option to set 
         the ``@rpath``, as shown in the following code:

         .. code-block:: sh
         
            c++ --std=c++17 create_update_view.cpp -Wl,-rpath,/usr/local/lib/ $(pkg-config --cflags --libs libmongocxx) -o ./view_updater.out
            ./view_updater.out
