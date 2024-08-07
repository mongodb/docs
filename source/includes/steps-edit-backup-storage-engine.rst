.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-continuous-backup.rst

   .. step:: Click the :guilabel:`Overview` tab.
      
   .. step:: Select the backup's ellipsis icon and select :guilabel:`Edit Storage Engine`.

      On the line listing the process, click the ellipsis icon and click
      :guilabel:`Edit Storage Engine`.
      
   .. step:: Select the storage engine.

      Select the storage engine. See: :ref:`considerations-backup-storage-engine`
      for more about choosing an appropriate storage engine for your 
      backup.
      
   .. step:: Select the sync source.
      
      Select the :guilabel:`Sync source` from which to create the new backup.
      In order to use the new storage engine, |mms| must resync the backup on
      the new storage engine.
      
   .. step:: Click :guilabel:`Submit`.
