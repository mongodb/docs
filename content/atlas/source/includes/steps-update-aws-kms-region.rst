.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-advanced.rst
      
   .. step:: For the :guilabel:`Encryption at Rest using your Key Management` section, click :guilabel:`Edit` :icon:`edit`.
      
   .. step:: Verify your |aws| |cmk| credentials.
      
      To ensure that |service| doesn't re-encrypt your data, verify that the 
      :guilabel:`AWS IAM role` and :guilabel:`Customer Master Key ID` reflect
      your existing credentials.
      
   .. step:: Update the :guilabel:`Customer Master Key Region`.
      
      Select another |aws| region for which you have configured 
      your multi-Region key.
      
   .. step:: Click :guilabel:`Save`.
