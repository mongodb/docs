.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-db-deployments-page.rst

   .. step:: Click the replica set where the collection resides.

      If the replica set is part of a sharded cluster, first click the
      sharded cluster containing the replica set.
      
   .. step:: Click :guilabel:`Performance Advisor`.

   .. step:: View recommendations.

      In the :guilabel:`Performance Advisor` tab, click 
      :guilabel:`Explore Recommendations` on the :guilabel:`Drop Indexes` card.

   .. step:: (Optional) Change which host results to view.

      By default, the results correspond to one of the primary hosts. 
      However, you can select another host from the drop-down.
      
   .. step:: On the index that you want to drop or hide, click :guilabel:`Drop Index`.

      The Performance Advisor displays a dialog box with a link to 
      the :ref:`{+atlas-ui+} <atlas-ui-indexes>` and a copyable 
      :mdb-shell:`MongoDB Shell </>` command to drop that index.
      
      The dialog box also provides a copyable MongoDB Shell command to 
      hide that index.
      
   .. step:: Drop or hide the index by using the {+atlas-ui+} or MongoDB Shell.

      To drop or hide an index by using the {+atlas-ui+}, click the 
      :guilabel:`Indexes` tab, then click the :guilabel:`Drop Index` or
      :guilabel:`Hide Index` icon next to the index. |service| displays a 
      dialog box to confirm your selection. For more information, 
      see :ref:`atlas-ui-indexes`.
      
      To drop or hide an index by using the MongoDB Shell, paste and run the 
      command provided by the Performance Advisor.
      