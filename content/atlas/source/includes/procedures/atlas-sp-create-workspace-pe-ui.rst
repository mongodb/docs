.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-network-access.rst

   .. step:: Navigate to the workspace private endpoints for your project.

      a. In the sidebar, click :guilabel:`Private Endpoint`.
      #. Click the :guilabel:`Atlas Stream Processing` tab.

   .. step:: Click :guilabel:`Add Workspace Endpoint`.

      The :guilabel:`Create a Workspace Private Endpoint` dialog
      displays.

   .. step:: Choose a cloud provider and region.

      a. For :guilabel:`Cloud Provider`, click :guilabel:`AWS`.

      #. From the :guilabel:`Region` list, select the region of the
         {+spw+} that you want to connect to.

      #. Click :guilabel:`Next`.

   .. step:: Configure your |vpc| details.

      a. In the :guilabel:`Your VPC ID` field, enter the ID of the
         |aws| |vpc| that contains the clients connecting to your
         workspace.

      #. In the :guilabel:`Your Subnet IDs` field, enter the IDs of the
         subnets that your |vpc| uses. Separate each ID with a comma.

      #. Click :guilabel:`Next`.

   .. step:: Create the |vpc| Interface Endpoint.

      a. Copy the |aws| CLI command that the dialog displays. The
         command includes your |vpc| ID, region, subnet IDs, and the
         {+atlas-sp+} endpoint service name.

      #. Run the command using the |aws| CLI. The command returns
         the ID of your new |vpc| endpoint and its DNS name.

      #. In the :guilabel:`Your VPC Endpoint ID` field, enter the ID of
         your |vpc| endpoint.

      #. In the :guilabel:`Your VPC Endpoint DNS Name` field, enter the
         DNS name associated with your |vpc| endpoint.

   .. step:: Click :guilabel:`Create endpoint`.

      {+atlas-sp+} registers the endpoint and begins provisioning
      private hostnames for the {+spw+}\s in your project.
