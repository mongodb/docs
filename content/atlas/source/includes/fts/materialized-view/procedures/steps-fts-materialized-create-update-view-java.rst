.. procedure::
   :style: normal

   .. step:: Define the materialized view and its updater.

      Create a ``CreateUpdateView.java`` file in your ``search-materialized-view`` project directory, 
      and copy and paste the following code into this file. This file performs the following
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

      .. literalinclude:: /includes/fts/materialized-view/CreateUpdateView.java
         :language: java
         :caption: CreateUpdateView.java
         :linenos:
         :copyable: true

      .. include:: /includes/search-shared/find-connection-string.rst

   .. step:: Compile and run the file to create and update the view.

      Compile and run your application in your IDE or your shell. 

      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            javac CreateUpdateView.java
            java CreateUpdateView

         .. output::

            Initial update completed. Materialized view is ready.
