.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-advanced.rst

   .. step:: Enable Encryption at Rest with Customer Key Management or edit your configuration.

      If you haven't already configured Customer Key Management, follow the steps in :ref:`atlas-configure-kms`.

      Otherwise, click the :guilabel:`Edit` button next to :guilabel:`Encryption at Rest using your Key Management`.

   .. step:: Toggle the button next to :guilabel:`Search Node Data Encryption` to :guilabel:`On`.
            
   .. step:: Click :guilabel:`Save`.

      After you enable Search Node Data Encryption at the project level, 
      |service| enables it at the {+cluster+} level when you 
      :ref:`configure {+cluster+} encryption <atlas-enable-cluster-encryption-at-rest>` 
      for any new or existing {+clusters+} with Search Nodes.
      |service| encrypts the Search Nodes using the customer-managed 
      key and rebuilds any search indexes. The length of this 
      process depends on the size and number of your indexes.