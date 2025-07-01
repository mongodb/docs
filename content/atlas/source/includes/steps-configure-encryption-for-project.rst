.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-advanced.rst
      
   .. step:: Toggle the button next to :guilabel:`Encryption at Rest using your Key Management` to :guilabel:`On`.
    
   .. step:: (Optional) Toggle the button next to :guilabel:`Search Node Data Encryption` to :guilabel:`On`.

      If you're using |aws| |kms|, you can optionally enable encryption 
      for all data on :ref:`Search Nodes <what-is-search-node>`. You can 
      also enable this feature later.
      
      To learn more, see :ref:`enable-search-node-encryption`.
      
   .. step:: Enter your key management provider account credentials and provide an encryption key.

   .. step:: Click :guilabel:`Save`.
      
   .. step:: (Optional) Allow access to or from the |service| control plane.
      
      To learn more, see :ref:`atlas-ear-allow-access-via-control-plane`. 
      