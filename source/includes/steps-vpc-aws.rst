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
      
   .. step:: Add a new network peering connection for your project.
      
      .. note::
      
         You can skip this step if you are using the {+atlas-cli+} to add a network peering connection.
      
      a. .. include:: /includes/nav/list-network-access.rst
      
      #. In the :guilabel:`Peering` tab, click :icon-fa5:`plus`
         :guilabel:`Add Peering Connection`.
      
   .. step:: In |service|, configure your network peering connection.
      
      .. tabs::
      
         .. tab:: {+atlas-cli+}
            :tabid: atlascli
      
            .. include:: /includes/extracts/atlas-networking-peering-create-and-watch-aws.rst
      
         .. tab:: {+atlas-ui+}
            :tabid: ui
      
            a. In the :guilabel:`Peering Connection` modal, select
               :guilabel:`AWS` and click :guilabel:`Next`. |service| displays
               the :guilabel:`Peering Connection` modal.
      
               .. important::
      
                  |service| does not support adding |aws| security groups of
                  cross-region peered |vpc|\s to IP access lists. Instead, 
                  use the |cidr| block of the peer VPC. To learn more about 
                  this limitation, see the :aws:`AWS documentation
                  </vpc/latest/peering/vpc-peering-security-groups.html>`.
      
                  To learn more about |cidr| blocks, see
                  :rfc:`RFC 4632 <4632>`.
      
            #. Fill out the fields in the :guilabel:`Your Application VPC`
               section.
      
               .. include:: /includes/list-table-network-peering-aws-application-vpc.rst
      
      #. Fill out the fields in the :guilabel:`Your Atlas VPC` section.
      
         .. list-table::
            :header-rows: 1
            :widths: 35 65
      
            * - Field
              - Description
      
            * - :guilabel:`Atlas VPC Region`
      
              - |aws| region where the |service| |vpc| resides. |service|
                creates a |vpc| for the |service| project in your chosen
                region if that region has no ``M10`` or greater clusters or
                |vpc| peering connections.
      
                Clear :guilabel:`Same as application VPC region` to select
                a region different from where your application's |vpc|
                resides.
      
            * - :guilabel:`VPC CIDR`
      
              - .. include:: /includes/fact-vpc-cidr-block.rst
      
      #. Click :guilabel:`Initiate Peering`.
      
      #. Wait for approval of peering connection request.
      
         The owner of the peer |vpc| must approve the |vpc| peering
         connection request. Ensure that the owner approves the request.
      
         |service| provides instructions for approving the connection
         request.
      
         .. important:: Requests expire after 7 days.
      
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
      
