.. procedure::
   :style: normal
      

   .. include:: /includes/nav/steps-network-access.rst

   .. step:: Go to :guilabel:`IP Access List`.

      If it isn't already displayed, click
      :guilabel:`IP Access List` in the left navigation, under
      the :guilabel:`Network Access` heading.
      
   .. step:: Edit the target IP access list entry
      
      Click :guilabel:`Edit` for the entry you want to modify.
      
      You can modify the IP address or |cidr| block of the entry and the
      comment associated with the entry. If the entry is temporarily
      added, |service| displays the remaining time until it will
      remove the entry and a dropdown to modify the duration of the
      IP access list entry or convert it to a permanent entry.
      
      .. note::
      
         You can't change a permanent IP access list entry to be
         temporary.
      
   .. step:: Click :guilabel:`Confirm` to save the changes.
