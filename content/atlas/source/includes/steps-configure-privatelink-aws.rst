.. procedure::
   :style: normal

   .. note::

      Cross-region private endpoint connectivity is available for
      |aws|. This feature allows you to connect to your {+service+}
      clusters from different |aws| regions through a single private
      endpoint service. To learn more about managing accepted endpoint
      regions, see :ref:`manage-accepted-endpoint-regions`.

   .. include:: /includes/nav/steps-network-access.rst

   .. step:: Navigate to the private endpoint for your dedicated cluster.

      a. In the sidebar, click :guilabel:`Private Endpoint`.
      #. Click the :guilabel:`Dedicated Cluster` tab.

   .. step:: Create an endpoint service.

      a. Click the :guilabel:`Create Endpoint Service` button.

         :gold:`IMPORTANT:` You must provide the billing information in the
         :guilabel:`Edit Payment Method` form if you don't have payment method already
         configured for your organization.

      #. Click the |aws| logo to select your cloud provider.

      #. From the :guilabel:`Atlas Region` list, select the primary
         region where your |service| cluster is deployed.

      #. Optional: In the :guilabel:`Accepted Endpoint Regions`
         section, select additional |aws| regions from which you want
         to allow endpoint connections. This enables cross-region
         private endpoint connectivity.

         .. note::

            The primary region is automatically included as an accepted
            region and cannot be removed. You can add or remove
            additional regions at any time. To learn more, see
            :ref:`manage-accepted-endpoint-regions`.

      #. Click :guilabel:`Create Endpoint Service`.

         The endpoint service creation process takes approximately 3-5
         minutes.

         :gold:`IMPORTANT:` If your organization has no payment information stored,
         |service| prompts you to add it before continuing.
      
   .. step:: Add an endpoint to your endpoint service.

      After the endpoint service is created, you can add endpoints to
      connect your |aws| |vpc| to the service.

      a. On the endpoint service card, click the :guilabel:`Add
         Endpoint` button.

      #. Choose how you want to add the endpoint:

         - **Create New Endpoint**: Create a new |aws| interface
           endpoint using the provided |aws| CLI command.
         - **Connect Existing Endpoint**: Connect an existing |aws|
           interface endpoint that you have already created.

   .. step:: Create a new endpoint or connect an existing endpoint.

      .. tabs::

         .. tab:: Create New Endpoint
            :tabid: create-new

            To create a new endpoint:

            a. Select :guilabel:`Create New Endpoint`.

            #. Enter the following details about your |aws| |vpc|:

               .. list-table::
                  :widths: 20 80

                  * - :guilabel:`Your VPC ID`
                    - Unique identifier of the peer |aws| |vpc|. Find
                      this value on the |vpc| dashboard in your |aws|
                      account.

                  * - :guilabel:`Your Subnet IDs`
                    - Unique identifiers of the subnets your |aws|
                      |vpc| uses.

                      Find these values on the :guilabel:`Subnet`
                      dashboard in your |aws| account.

                      You must specify at least one subnet. If you
                      don't, |aws| won't provision an :term:`interface
                      endpoint` in your |vpc|. An interface endpoint is
                      required for clients in your |vpc| to send
                      traffic to the private endpoint.

                  * - :guilabel:`Consumer Region`
                    - |aws| region where your consumer |vpc| is
                      located. This region must be one of the accepted
                      endpoint regions configured for the endpoint
                      service.

            #. Click :guilabel:`Create Endpoint`.

               |service| provides an |aws| CLI command pre-filled with
               your configuration.

            #. Copy the |aws| CLI command and run it in your terminal.

               :gold:`IMPORTANT:` You must have the necessary |aws| permissions
               to create interface endpoints. Ensure that the endpoint
               is in the ``Pending Acceptance`` state in your |aws|
               console before proceeding.

               See :aws:`Creating an Interface Endpoint
               </vpc/latest/userguide/vpce-interface.html#create-interface-endpoint>`
               for more information.

            #. After running the command, copy the resulting
               :guilabel:`VPC Endpoint ID` from the |aws| CLI output.
               This is a 22-character alphanumeric string (for example,
               ``vpce-0123456789abcdef0``).

            #. Paste the :guilabel:`VPC Endpoint ID` into the modal and
               click :guilabel:`Add Endpoint`.

               |service| accepts the endpoint connection. This process
               typically takes a few minutes. When the endpoint is
               ready, the endpoint status displays as
               :guilabel:`Available`.

         .. tab:: Connect Existing Endpoint
            :tabid: connect-existing

            To connect an existing endpoint that you have already
            created in |aws|:

            a. Select :guilabel:`Connect Existing Endpoint`.

            #. Enter your :guilabel:`VPC Endpoint ID`. This is a
               22-character alphanumeric string that identifies your
               |aws| interface endpoint (for example,
               ``vpce-0123456789abcdef0``).

               Find this value on the |aws| VPC Dashboard under
               :guilabel:`Endpoints` > :guilabel:`VPC ID`.

            #. Click :guilabel:`Submit Endpoint`.

               |service| validates and links the endpoint to your
               private endpoint service.
      
   .. step:: Configure your resources' security groups to send traffic to and receive traffic from the :term:`interface endpoint`.
      
      For each resource that needs to connect to your |service| clusters
      using {+aws-pl+}, the resource's security group must allow outbound 
      traffic to the :term:`interface endpoint's <interface endpoint>` 
      private IP addresses on all ports.
      
      See :aws:`Adding Rules to a Security Group </AWSEC2/latest/UserGuide/ec2-security-groups.html#adding-security-group-rule>`
      for more information.
      
   .. step:: Create a security group for your interface endpoint to allow resources to access it.
      
      This security group must allow inbound traffic on all ports from each 
      resource that needs to connect to your |service| clusters using 
      {+aws-pl+}:
      
      a. In the |aws| console, navigate to the :guilabel:`VPC Dashboard`. 
      
      #. Click :guilabel:`Security Groups`, then click 
         :guilabel:`Create security group`.
      
      #. Use the wizard to create a security group. Make sure you select 
         your VPC from the :guilabel:`VPC` list.
      
      #. Select the security group you just created, then click the 
         :guilabel:`Inbound Rules` tab.
      
      #. Click :guilabel:`Edit Rules`.
      
      #. Add rules to allow all inbound traffic from each resource in your
         VPC that you want to connect to your |service| cluster.
      
      #. Click :guilabel:`Save Rules`.
      
      #. Click :guilabel:`Endpoints`, then click the endpoint for your
         VPC.
      
      #. Click the :guilabel:`Security Groups` tab, then click 
         :guilabel:`Edit Security Groups`.
      
      #. Add the security group you just created, then click 
         :guilabel:`Save`.
      
      To learn more about :aws:`VPC security groups 
      </vpc/latest/userguide/VPC_SecurityGroups.html>`, see the |aws| 
      documentation.
      
   .. include:: /includes/nav/steps-network-access.rst
   
   .. step:: Verify that the private endpoint is available.
      
      You can connect to an |service| {+database-deployment+} using the 
      {+aws-pl+} private endpoint when all of the resources are configured
      and the private endpoint becomes available.
      
      To verify that the {+aws-pl+} private endpoint is available:

      On the :guilabel:`Private Endpoint` page, select a
      {+database-deployment+} type and verify the following
      statuses for the region that contains the {+database-deployment+}
      you want to connect to using {+aws-pl+}:
      
      .. list-table::
         :widths: 20 80
      
         * - :guilabel:`Atlas Endpoint Service Status`
           - Available
               
         * - :guilabel:`Endpoint Status`
           - Available
      
      To learn more about possible status values, see :ref:`pl-troubleshooting`.

      If you do not see these statuses, see :ref:`pl-troubleshooting` for
      additional information.

.. note::

   If you encounter issues with endpoint connections, including failed
   endpoints or missing regions, see :ref:`pl-troubleshooting` for
   troubleshooting steps and common resolutions.

   To learn more about cross-region private endpoint connectivity,
   accepted endpoint regions, and limitations, see
   :ref:`manage-accepted-endpoint-regions`.
