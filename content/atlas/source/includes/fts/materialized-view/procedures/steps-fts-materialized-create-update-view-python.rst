.. procedure::
   :style: normal

   .. step:: Install the required package.

      Before running the application, install the ``schedule`` package. This
      package allows you to schedule the materialized view updates to run at a
      specific time each month.

      Run the following command in your ``search-materialized-view`` project directory:

      .. code-block:: shell
         :copyable: true

         pip install schedule

   .. step:: Define the materialized view and its updater.

      Create a ``create_update_view.py`` file in your ``search-materialized-view`` project directory, 
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
      
      .. literalinclude:: /includes/fts/materialized-view/create-update-view.py
         :caption: create_update_view.py
         :language: python
         :copyable:
         :linenos:

      .. include:: /includes/search-shared/find-connection-string.rst

   .. step:: Create and update the view.

      .. io-code-block::
         :copyable: true 

         .. input::
            :language: shell

            python create_update_view.py

         .. output::

            Initial update completed. Materialized view is ready.
            Scheduler is running. Press Ctrl+C to exit.
