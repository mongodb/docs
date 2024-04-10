.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-network-access.rst

   .. step:: Click the :guilabel:`IP Access List` tab.

      .. list-table::
         :widths: 20 80
         :stub-columns: 1

         * - IP Address
           - IP address or |cidr| block. If this 
             {+database-deployment+} is hosted on |aws|,
             you can provide an |aws| Security Group ID as well.

         * - Comment
           - Description or other information about the access list 
             entry.

         * - Status
           - Status of the IP access list entry:

             .. include:: /includes/list-tables/ip-access-list-statuses.rst

         * - Actions
           - Options to :ref:`Edit <modify-ip-access-list-entry-ui>` or
             :ref:`Delete <delete-ip-access-list-entry-ui>`.
             