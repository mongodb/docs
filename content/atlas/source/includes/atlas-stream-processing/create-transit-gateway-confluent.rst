.. procedure::
   :style: normal

   .. step:: Provision a {+tgw+} network in Confluent Cloud.

      Follow the instructions described in the `Confluent Cloud
      documentation
      <https://docs.confluent.io/cloud/current/networking/ccloud-network/aws.html#create-a-ccn>`__
      for either the :guilabel:`/27 Peering & Transit Gateway` or the
      :guilabel:`/16 Peering & Transit Gateway` connectivity type.

      .. important::

	 Ensure that your Confluent Cloud |cidr| does not overlap with
	 your {+service+} |vpc| |cidr|. Retrieve your {+service+}
	 |vpc| |cidr| with the :oas-bump-atlas-op:`Get Account Details
	 <getgroupstreamaccountdetails>` endpoint.

   .. step:: Create an {+aws+} Resource Share.

      Follow the instructions described in the `AWS documentation
      <https://docs.aws.amazon.com/ram/latest/userguide/getting-started-sharing.html#getting-started-sharing-create>`__
      with the following specific parameters:

      - Set :guilabel:`Resources - optional` to :guilabel:`Transit Gateways`.

      - Set :guilabel:`Select principal type` to :guilabel:`AWS account`.

      - Set :guilabel:`Enter an AWS account ID` to your
	 :guilabel:`Confluent Cloud AWS account ID` from your
         Confluent Management Console.

   .. step:: Configure a connection between your Confluent Cloud and your {+tgw+}.

      a. In your Confluent Console, navigate to the :guilabel:`Ingress
         connections` pane.

      #. Click :guilabel:`+ Transit Gateway`.

      #. Populate the fields of the {+tgw+} configuration.

	 Ensure you set :guilabel:`AWS VPC CIDR` to the value of
	 your {+service+} |vpc| |cidr|.

      #. In your {+aws+} console, accept the incoming {+tgw+}
         attachment request from your Confluent Cloud |vpc|.

   .. step:: Configure a connection between your {+tgw+} and {+service+} 
	 
      a. Retrieve your {+service+} account details with the
         :oas-bump-atlas-op:`Get Account Details
         <getgroupstreamaccountdetails>` endpoint. Note your
         ``awsAccountId``, ``cidrBlock``, and ``vpcId`` for later.

      #. Create an {+aws+} Resource Share.	 

	 Follow the instructions described in the `AWS documentation
	 <https://docs.aws.amazon.com/ram/latest/userguide/getting-started-sharing.html#getting-started-sharing-create>`__
	 with the following specific parameters:

	 - Set :guilabel:`Resources - optional` to :guilabel:`Transit Gateways`.

	 - Set :guilabel:`Select principal type` to :guilabel:`AWS account`.

	 - Set :guilabel:`Enter an AWS account ID` to your
	    :guilabel:`AWS Atlas account ID` that you retrieved earlier.

      #. Accept the {+tgw+} resource share invitation using the
         ``Accept Transit Gateway Resource Share Invitation`` endpoint.

      #. Create a {+tgw+} attachment from your {+service+} |vpc|
         using the ``Create Transit Gateway Attachment`` endpoint.

	 Set ``atlasVpcId`` to the ``vpcId`` that you retrieved
	 earlier. Note the ``tgwAttachmentId`` for later.
	     
      #. Accept the {+tgw+} attachment.

	 Follow the instructions described in the `AWS documentation
	 <https://docs.aws.amazon.com/vpc/latest/tgw/acccept-tgw-attach.html>`__.

   .. step:: Create a Kafka {+tgw+} connection.
	     
      Call the :oas-bump-atlas-op:`Create One Connection
      <creategroupstreamconnection>` endpoint with the
      following parameters:

      - Set ``networking.access.tgwId`` to the {+aws+} ID of your
	{+tgw+}.
      - Set ``networking.access.vpcCIDR`` to the {+service+}
	|cidr| that you retrieved earlier.
      - Set ``networking.access.type`` to ``TRANSIT_GATEWAY``.
      - Set ``security.protocol`` to ``SASL_SSL`` or ``SSL``
      - Set ``type`` to ``Kafka``.
      
