.. procedure::
   :style: normal

   .. step:: Define the materialized view and its updater.

      Create a ``create_update_view.c`` file in your ``search-materialized-view`` project directory, 
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

      .. literalinclude:: /includes/fts/materialized-view/create-update-view.c
         :caption: create_update_view.c
         :language: c
         :linenos:
         :copyable:

      .. include:: /includes/search-shared/find-connection-string.rst

   .. step:: Modify your ``CMakeLists.txt`` file

      Edit the ``CMakeLists.txt`` file to add a new target for the view updater:

      .. code-block:: c
         :caption: CMakeLists.txt

         cmake_minimum_required(VERSION 3.11)
         project(search-materialized-view LANGUAGES C)
         add_executable (view_updater.out create_update_view.c)
         find_package(mongoc <version> REQUIRED)
         target_link_libraries(view_updater.out mongoc::mongoc)

   .. step:: Run the application.

      In your terminal, run the following commands to build and run this 
      application: 
      
      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            cmake -S. -Bcmake-build
            cmake --build cmake-build --target view_updater.out
            ./cmake-build/view_updater.out

         .. output::

            Initial update completed. Materialized view is ready.


