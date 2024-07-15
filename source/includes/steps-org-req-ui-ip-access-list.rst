.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-org-settings.rst
      
   .. step:: Configure IP access list for the {+atlas-ui+}.
      
      a. Navigate to :guilabel:`Define IP Access List for the Atlas User Interface`.
      
      #. Click :guilabel:`Configure`. The :guilabel:`IP Access List for the Atlas UI`
         page opens where you can configure, enable, and make changes to the
         IP access list for the {+atlas-ui+} for your organization.
      
   .. step:: Add IP addresses or CIDR blocks to the IP list for the {+atlas-ui+}.
      
      a. Enter an IP address or a CIDR range block in the table.
      
         You can:
      
         - Add IPv4 or IPv6 addresses, such as ``1.1.1.2``, for IPv4, and
           ``3ffe:1900:fe21:4545:0000:0000:0000:0000``, for IPv6, or CIDR block
           ranges, such as ``2.1.1.1/16``, and their descriptions to the list.
         - Click :icon-fa5:`trash-alt` to delete an entered address or range
           and enter a new one instead.
      
         |service| validates IP addresses and CIDR blocks that you enter and flags
         the invalid entries.
      
         You can't:
      
         - Delete all addresses or your own IP address from the list. If you
           attempt to delete these addresses, |service| prevents you from saving
           changes.
         - Add invalid IP addresses, such as malformed or out of range addresses
           for the entered CIDR ranges.
         - Add duplicate addresses. You can, however, add a CIDR range that has
           a particular IP address and also enter that IP address itself.
         - Edit addresses or CIDR blocks in the table. To edit an entry, delete
           it and add a new entry.
      
      #. Add an optional description.
      
      #. Click :guilabel:`Add Entry` to add an IP address or a CIDR range for
         users in your organization, or click :guilabel:`Add my Current IP Address`.
      
         The IP access list table identifies your current IP address or a
         CIDR range containing it as yours and adds their descriptions, even
         if you didn't provide descriptions for these entries.
      
   .. step:: Enable IP access list for the {+atlas-ui+}.
      
      To activate the :guilabel:`Enable` button that enables IP access list
      restrictions, you, as an :authrole:`Organization Owner` must add your current
      IP address or a CIDR range with your current IP address to the list.
      
      If the list is empty, or if |service| detects that the list doesn't have
      your IP address, |service| deactivates the :guilabel:`Enable` button to
      prevent locking you out of the organization.
      
      a. Click :guilabel:`Enable`.
      
         |service| asks you for a confirmation.
      
      #. Click :guilabel:`Enable` to confirm, or :guilabel:`Cancel` to cancel.
      
         Once you enable IP access list for the {+atlas-ui+}, only the defined
         IP addresses and ranges can access this organization's {+atlas-ui+}.
         If a user's IP address isn't on the list, |service| disables (grays out)
         all organizations with restricted access for this user in its organizations
         list. If this user attempts to access an {+atlas-ui+} page for any
         restricted organization, |service| displays the following warning:
      
         .. code-block:: none
      
            You don't have permission to view the <url-with-organizationID> in the
            {+atlas-ui+}. To gain access, ask the organization owner to add your
            IP address to the IP access list.
      
         API keys that inherit from this IP access list use the list for
         IP access restrictions. 
