.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-processes.rst

   .. step:: Click the replica set where the collection resides.

      If the replica set is part of a sharded cluster, first click the
      sharded cluster containing the replica set.

   .. step:: Click :guilabel:`Performance Advisor`.
         
   .. step:: View recommendations.

      In the :guilabel:`Performance Advisor` tab, click 
      :guilabel:`Explore Recommendations` on the 
      :guilabel:`Drop Indexes` card.

   .. step:: (Optional) Change which host results to view.

      By default, the results correspond to one of the primary hosts. 
      However, you can select another host from the drop-down.
      
   .. step:: On the index you want to drop or hide, click :guilabel:`Drop Index`.
      
      The Performance Advisor displays a dialog with a link to 
      :ref:`Data Explorer <data-explorer-indexes>` and a copyable 
      :mdb-shell:`MongoDB Shell </>` command to drop that index.
      
      The dialog also provides a copyable MongoDB Shell command to hide 
      that index.
      
   .. step:: Drop or hide the index through Data Explorer or MongoDB Shell.
      
      To drop an index with Data Explorer, click the 
      :guilabel:`Indexes` tab, then click :guilabel:`Drop` next to the 
      index you want to drop. You will be asked for confirmation.
      
      To drop or hide an index with MongoDB Shell, paste and run the 
      command provided by the Performance Advisor.
