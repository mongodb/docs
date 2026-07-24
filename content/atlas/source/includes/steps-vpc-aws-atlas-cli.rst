.. procedure::
   :style: normal

   .. step:: In |aws|, enable :guilabel:`DNS hostnames` and :guilabel:`DNS resolution`.

      a. Log in to your |aws| account.

      #. Go to the `VPC dashboard <https://console.aws.amazon.com/vpc>`_.

      #. Open your list of |vpc| resources.

      #. Select the |vpc| you want to peer with.

      #. Enable :guilabel:`DNS hostnames` and :guilabel:`DNS resolution`.

         These settings ensure that when your application connects to the
         cluster within the :ref:`VPC <security-vpc>` it uses private IP
         addresses.

   .. step:: In |service|, configure your network peering connection.

      .. important::

         |service| does not support adding |aws| security groups of
         cross-region peered |vpc|\s to IP access lists. Instead,
         use the |cidr| block of the peer VPC. To learn more about
         this limitation, see the :aws:`AWS documentation
         </vpc/latest/peering/vpc-peering-security-groups.html>`.

         To learn more about |cidr| blocks, see
         :rfc:`RFC 4632 <4632>`.

      .. include:: /includes/extracts/atlas-networking-peering-create-and-watch-aws.rst

   .. step:: In |aws|, update your VPC's route table.

      a. In the :guilabel:`VPC Dashboard`, click
         :guilabel:`Route Tables`.

      #. Select the Route Table for your |vpc| or subnets.

      #. Click the :guilabel:`Routes` tab.

      #. Click :guilabel:`Edit Routes`.

      #. Click :guilabel:`Add route`.

      #. Add the |service| |vpc|\'s |cidr| block to the
         :guilabel:`Destination` column.

      #. Add the AWS Peering Connection ID to the
         :guilabel:`Target` column.

         This value uses a prefix of ``pcx-``.

      #. Click :guilabel:`Save`.

         .. include:: /includes/fact-vpc-peering-connections-max.rst

         Once set up, you can edit or terminate |vpc| peering
         connection from the :guilabel:`Peering` table.
