.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-stream-processing.rst

   .. step:: Go to the :guilabel:`Connection Registry`.

      a. Locate the overview panel of the {+spw+} that 
         contains the connection registry that you want to modify.
      
      #. Click :guilabel:`Manage` in the upper right.

      #. Select the :guilabel:`Connection Registry` tab.

   .. step:: Test the connection.
      
      a. For the connection you want to test in the table, click
         the link icon in the :guilabel:`Actions` column of that entry.

      #. For Atlas Database connections, enter the :guilabel:`Database Name`
         and :guilabel:`Collection Name` to test the connection to a specific 
         database and collection. 
         
         For Kafka connections, enter the :guilabel:`Topic Name` to test the
         connection to a specific topic.

         For other connection types, no additional information is required.

      #. Click :guilabel:`Test Connection`.
