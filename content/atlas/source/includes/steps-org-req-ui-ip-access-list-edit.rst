.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-org-settings.rst  
    
   .. step:: Configure IP access list for the {+atlas-ui+}.
      
      a. Go to 
         :guilabel:`Define IP Access List for the Atlas User Interface`.
      
      #. Click :guilabel:`Configure`.
         The :guilabel:`IP Access List for the Atlas UI` page opens where you
         can make changes to the IP access list for the {+atlas-ui+} for your organization.
      
   .. step:: Edit IP addresses or CIDR blocks to the IP access list for the {+atlas-ui+}.
      
      a. Click :guilabel:`Edit`.
         The IP list table opens that allows you to add additional IP addresses
         or CIDR block ranges.
      
         You can:
      
         - Add IPv4 or IPv6 addresses, such as ``1.1.1.2``, for IPv4, and
           ``3ffe:1900:fe21:4545:0000:0000:0000:0000``, for IPv6, or CIDR block
           ranges, such as ``2.1.1.1/16``, and their descriptions to the list.
      
         - Click :icon-fa5:`trash-alt` to delete an entered address or range
           and enter a new one instead.
      
         |service| validates IP addresses and CIDR blocks that you enter and flags
         invalid entries.
      
         You can't:
      
         - Delete all addresses or your own IP address from the list. If you
           attempt to delete these addresses, |service| prevents you from saving changes.
         - Add invalid IP addresses, such as malformed or out of range addresses
           for the entered CIDR ranges.
         - Add duplicate addresses. You can, however, add a CIDR range that contains
           a particular IP address and also enter that IP address itself.
         - Edit addresses or CIDR blocks in the table. To edit an entry,
           delete it and add a new entry.
      
      #. Add an optional description.
      
      #. Click :guilabel:`Add Entry` to add an IP address or a CIDR range, or
         click :guilabel:`Add my Current IP Address`.
      
   .. step:: Save the edited IP access list.
      
      |service| disables the :guilabel:`Save` button in the upper-right corner
      if you delete your own IP address or a CIDR block with your IP address
      from the list.
      
      To activate the :guilabel:`Save` button, add a CIDR block with your
      current IP address (or your IP address) to the list, in addition to any
      other addresses or CIDR ranges that you or other organization owners
      have already added.
      
      Click :guilabel:`Save.`
      
      |service| shows a confirmation message that it successfully saved changes.
      
      API keys that inherit from this IP access list use the list for IP access
      restrictions.