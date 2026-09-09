Add an {+aws+} Confluent Private Link Connection through the {+atlas-cli+}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. include:: /includes/atlas-stream-processing/aws-confluent-pl-limitation.rst

Create the Private Endpoint
```````````````````````````

.. tabs::

   .. tab:: Dedicated
      :tabid: dedicated

      To create a connection to an {+aws+} Confluent Dedicated cluster for
      use in your {+atlas-sp+} project, follow these steps:

      .. procedure::
	 :style: normal

	 .. step:: Get the {+aws+} account ID for your {+service+} project.

	    You must configure your Confluent cluster to accept incoming
	    connections from your {+service+} project.

	    :gold:`IMPORTANT:` Confluent accepts incoming connections only
	    from {+aws+}. To use a Confluent Private Link connection, you
	    must host your {+spw+}s on {+aws+}.

            Call the :ref:`atlas api streams getAccountDetails
	    <atlas-api-streams-getAccountDetails>` command. Save the
	    value of ``awsAccountId`` for further use in this
	    procedure.

	 .. step:: Go to your Confluent cluster networking details.

	    In your Confluent account:

	    a. Navigate to the cluster you want to connect to.
	    #. In your cluster networking interface, navigate to your
	       cluster networking details.

	 .. step:: Add Private Link Access to your Confluent cluster.

	    `Add Private Link Access
	    <https://docs.confluent.io/cloud/current/networking/private-links/aws-privatelink.html#aws-privatelink-register>`__
	    to your cluster. Provide a name of your choice. For the {+aws+}
	    account number, provide the value of the ``awsAccountId`` field
	    that you saved previously.

	    Save the value of the :guilabel:`VPC Endpoint service name` for
	    further use in this procedure.

	 .. step:: Create an {+service+} Private Endpoint.

            Call the :ref:`atlas api streams
	    createPrivateLinkConnection
	    <atlas-api-streams-createPrivateLinkConnection>` command.
		   
	    For an {+aws+} Confluent Dedicated cluster Private Link
	    connection, you must set the following key-value pairs:

	    .. list-table::
	       :widths: 35 65
	       :header-rows: 1

	       * - Key
		 - Value

	       * - ``serviceEndpointId``
		 - Your cluster's :guilabel:`VPC Endpoint service name`.

	       * - ``dnsDomain``
		 - Fully qualified domain name of the bootstrap server on
		   your Confluent cluster.

	       * - ``dnsSubDomain``
		 - - If your cluster doesn't use subdomains, you must set
		     this to the empty array ``[]``.
		   - If your cluster uses subdomains, you must set this to
		     an array containing one fully qualified subdomain name
		     for each of your cluster's subdomains.

	    You can find these values in your Confluent cluster's
	    networking details.

	    The following example command requests a connection to your
	    Confluent cluster and illustrates a typical response:

	    After you run the command, save the value of the ``_id`` field
	    in the response body for further use in this procedure.

   .. tab:: Enterprise
      :tabid: enterprise
	     
      To create a connection to an {+aws+} Confluent Enterprise cluster for
      use in your {+atlas-sp+} project, follow these steps:

      .. procedure::
	 :style: normal

	 .. step:: Go to your Confluent cluster networking details.

	    You must configure your Confluent cluster to accept incoming
	    connections from your {+service+} project.

	    :gold:`IMPORTANT:` Confluent accepts incoming connections only
	    from {+aws+}. To use a Confluent Private Link connection, you
	    must host your {+spw+}s on {+aws+}.

	    In your Confluent account:

	    a. Navigate to the cluster you want to connect to.
	    #. In your cluster networking interface, navigate to your
	       cluster networking details.

	 .. step:: Add a PrivateLink Gateway to your Confluent cluster.

	    `Add a PrivateLink Gateway configuration
	    <https://docs.confluent.io/cloud/current/networking/aws-platt.html>`__
	    in the same {+aws+} region as your cluster.

	    Save the value of the :guilabel:`PrivateLink Service ID` for
	    further use in this procedure.

	 .. step:: Create an {+service+} Private Endpoint.

            Call the :ref:`atlas api streams
	    createPrivateLinkConnection <atlas-api-streams-createPrivateLinkConnection>` command.

            For an {+aws+} Confluent Enterprise cluster Private Link
	    connection, you must set the following key-value pairs:

	    .. list-table::
	       :widths: 35 65
	       :header-rows: 1

	       * - Key
		 - Value

	       * - ``serviceEndpointId``
		 - Your gateway's :guilabel:`PrivateLink Service ID`.

	       * - ``dnsSubDomain``
		 - You must set this to the empty array ``[]``.

	    You can find these values in your Confluent cluster's
	    networking details.

	    After you send the request, save the value of the ``_id`` field
	    in the response body for further use in this procedure.

	 .. step:: Provide the interface endpoint ID to Confluent.

	    Call the :ref:`getPrivateLinkConnection
	    <atlas-api-streams-getPrivateLinkConnection>` command
	    using the ``_id`` value that you saved previously for the
	    ``--connectionId`` option and, on the Confluent
	    :guilabel:`Configure gateway` page, provide the value of
	    ``interfaceEndpointId`` as the VPC interface endpoint ID
	    to continue the configuration.

	    If you aren't on the :guilabel:`Configure gateway` page,
	    follow these steps in your Confluent account to provide
	    the ``interfaceEndpointId`` value as the VPC endpoint:

	    a. Navigate to the cluster you want to connect to.
	    #. In your cluster networking interface, navigate to your
	       cluster networking details.
	    #. Navigate to the access points interface.
	    #. Add a new access point.
	    #. When Confluent prompts you for an interface endpoint,
	       provide the value of ``interfaceEndpointId``.

	    After Confluent creates the access point, save the DNS domain
	    that the gateway generates for it for further use in this
	    procedure. This domain has the following format:

	    .. code-block:: none

	       <access-point-id>.<region>.aws.accesspoint.confluent.cloud

	 .. step:: Add the DNS domain to your Private Link connection.

	    Call the :ref:`atlas api streams updatePrivateLinkConnection
	    <atlas-api-streams-updatePrivateLinkConnection>` command
	    to set the ``dnsDomain`` field on the connection that you
	    created earlier.  Use the ``_id`` value that you saved
	    previously as the ``--connectionId`` option

	    :red:`WARNING:` {+service+} can't generate DNS records for your
	    connection until you complete this step. The connection remains
	    pending until you set ``dnsDomain``.

	    You can set ``dnsDomain`` only when the connection doesn't
	    already have a DNS domain, or when the connection is in the
	    ``IDLE`` state.

{+service+} generates a private endpoint ID and returns it as the
``_id`` field in the response body.

Create the {+service+}-Side Connection
````````````````````````````````

:ref:`Add a connection <atlas-sp-manage-connection-add>`. |aws|
Confluent PrivateLink connections support either the ``SASL_SSL`` or
the ``SSL`` security protocol. Select the tab for the protocol you
want to use and provide the following key-value pairs:

.. tabs::

   .. tab:: SASL_SSL
      :tabid: sasl-ssl

      .. include:: /includes/atlas-stream-processing/kafka-pl-connection-fields-api-sasl-ssl.rst

   .. tab:: SSL
      :tabid: ssl

      .. include:: /includes/atlas-stream-processing/kafka-pl-connection-fields-api-ssl.rst
