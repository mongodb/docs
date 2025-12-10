.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-network-access.rst

   .. step:: Go to :guilabel:`IP Access List` view.
      
      a. If it isn't already displayed, click the
         :guilabel:`IP Access List` tab.
      
      #. Click :icon-fa5:`plus` :guilabel:`Add IP Address`.
      
   .. step:: Enter an IP address, |cidr| block, or Security Group ID.
      
      .. important::
         
         Ensure that you add the IP address you will use to
         access MongoDB as the ``admin`` user.
      
      Enter the desired IP address or |cidr|\-notated range of addresses:
      
      .. list-table::
         :header-rows: 1
         :widths: 40 60
      
         * - Entry
      
           - Grants
      
         * - An IP address
      
           - Access from that address.
      
         * - A |cidr|\-notated range of IP addresses
      
           - Access from the designated range of addresses.
      
             For peer |vpc| connections, you can specify the |cidr| block
             (or a subset) or the associated Security Group.
      
             The Internet provides online tools for converting a range of
             IP addresses to |cidr|, such as
             `<http://www.ipaddressguide.com/cidr>`_.
      
             :gold:`IMPORTANT:` Adding the |cidr| ``0.0.0.0/0`` allows access from anywhere.
             Ensure that strong credentials (username and password) are
             used for all database users when allowing access from
             anywhere.

             .. include:: /includes/fact-nested-wildcard-ip.rst
      
         * - Security Group ID (AWS Only)
      
           - Access via Security Group membership from a peered VPC.
      
             :gold:`IMPORTANT:` |service| does not support adding |aws| security groups to
             IP access lists in projects with |vpc| peering connections
             in multiple regions.
      
   .. step:: (Optional) Set the IP access list as temporary.
      
      Check the :guilabel:`Save as temporary access list` option to specify
      a length of time that the IP address will be added. After this time,
      |service| removes the address from the IP access list. You can select
      one of the following time periods for the address to be added:
      
      - 6 hours
      
      - 1 day
      
      - 1 week
      
      In the :guilabel:`IP Access List` view, temporary access list entries
      display the time remaining until the address will expire. Once the IP
      address expires and is deleted, any client or application attempting
      to connect to the cluster from the address can't access the cluster.
      
      .. note::
      
         You cannot set |aws| security groups as temporary access list
         entries.
      
   .. step:: Click :guilabel:`Save and Close`.
