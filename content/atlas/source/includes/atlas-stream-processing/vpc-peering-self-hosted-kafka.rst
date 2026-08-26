Generate an Incoming VPC Peering Connection Request from Self-Hosted Kafka
--------------------------------------------------------------------------

You can connect {+atlas-sp+} to a self-hosted {+kafka+} cluster over a
|vpc| peering connection. To establish the connection, you must create
and accept the peering request and configure routing and firewall
rules. You must also select a DNS resolution strategy and align your
broker listener and certificate configuration.

.. note::

   {+atlas-sp+} supports |vpc| peering to self-hosted {+kafka+}
   clusters on |aws| only.

Create the VPC Peering Connection
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. procedure::
   :style: normal

   .. step:: Retrieve your |service| network parameters.

      In the {+atlas-ui+}, click :guilabel:`Network Access` and then
      click the :guilabel:`Peering` tab. Click
      :guilabel:`Add inbound peering connection` and note the
      following values:

      - |service| |aws| account ID
      - |service| |vpc| region
      - |service| |vpc| ID
      - |service| |vpc| |cidr| block

      You use the |cidr| block in the route table and security group
      rules that you configure in later steps.

      To retrieve the same values with the {+atlas-admin-api+}, see
      :ref:`atlas-sp-get-aws-account-id-and-vpc-id`.

   .. step:: Create the peering connection in |aws|.

      In the |aws| console, go to the :guilabel:`VPC Dashboard`, click
      :guilabel:`Peering Connections`, and then click
      :guilabel:`Create Peering Connection`. Enter the |service| |aws|
      account ID and |vpc| ID from the previous step, and submit the
      request.

      |aws| sets the connection state to ``Pending Acceptance``.

   .. step:: Accept the peering request in |service|.

      Return to the :guilabel:`Peering` tab in the {+atlas-ui+},
      locate the pending request that matches your |aws| account ID
      and |vpc| ID, and click :guilabel:`Accept`.

      Both |aws| and |service| report the connection as active after
      the request is accepted.

   .. step:: Add a route to the |service| |vpc|.

      In the |aws| console, go to :guilabel:`Route Tables` and select
      the route table associated with the subnets that contain your
      {+kafka+} brokers. Click :guilabel:`Edit routes` and add a route
      with the following values:

      - :guilabel:`Destination`: the |service| |vpc| |cidr| block,
        such as ``192.168.0.0/21``
      - :guilabel:`Target`: :guilabel:`Peering Connection`, then the
        peering connection ID that begins with ``pcx-``

      Click :guilabel:`Save changes`.

      Without this route, your brokers can't reply to connection
      requests from {+atlas-sp+}, even when the peering connection is
      active.

   .. step:: Allow inbound traffic from the |service| |vpc|.

      In the |aws| console, go to :guilabel:`EC2` and then
      :guilabel:`Security Groups`. Select the security group
      associated with your {+kafka+} broker instances, click
      :guilabel:`Edit inbound rules`, and add a rule with the
      following values:

      - :guilabel:`Type`: :guilabel:`Custom TCP`
      - :guilabel:`Port Range`: the port your brokers listen on, such
        as ``9092`` for plaintext or ``9093`` for ``SASL_SSL``
      - :guilabel:`Source`: the |service| |vpc| |cidr| block, such as
        ``192.168.0.0/21``

      Click :guilabel:`Save rules`.

      Traffic can't traverse the peering connection if your security
      group blocks the broker port.

Configure DNS Resolution
~~~~~~~~~~~~~~~~~~~~~~~~

{+kafka+} clients connect to the broker hostnames returned during the
bootstrap and metadata exchange rather than to raw IP addresses.
{+atlas-sp+} must be able to resolve those hostnames. Select one of
the following mutually exclusive strategies.

Resolve DNS Across the Peering Connection
`````````````````````````````````````````

Use this strategy when both your {+kafka+} cluster and your
{+spw+} run on |aws|. When you enable |aws| DNS resolution on the
peering connection, |aws| resolves broker DNS hostnames, such as
``ip-172-31-19-166.ec2.internal``, to private IP addresses across the
peering boundary.

To enable |aws| DNS resolution:

.. procedure::
   :style: normal

   .. step:: Open the peering connection in |aws|.

      In the |aws| console, go to the :guilabel:`VPC Dashboard`, click
      :guilabel:`Peering Connections`, and select the active peering
      connection.

   .. step:: Edit the DNS settings.

      Click :guilabel:`Actions` and then
      :guilabel:`Edit DNS Settings`.

   .. step:: Allow cross-|vpc| DNS resolution.

      Select
      :guilabel:`Allow accepter VPC to resolve DNS of hosts in requester VPC to private IP addresses`.
      If your configuration also requires resolution in the opposite
      direction, select the corresponding option for the requester
      |vpc|.

   .. step:: Click :guilabel:`Save`.

Map Public DNS Records to Private IP Addresses
``````````````````````````````````````````````

Use this strategy when cross-|vpc| DNS resolution is restricted or
unavailable. Instead of resolving internal hostnames across |vpc|\s,
create public DNS ``A`` records in a service such as |aws| Route 53.
Point each record to the private IP address of a broker.

{+atlas-sp+} resolves the public domain name over the internet.
Because the ``A`` record returns a private IP address, {+atlas-sp+}
routes the traffic over the active peering connection instead of over
the public internet.

The following table shows an example mapping:

.. list-table::
   :widths: 20 45 35
   :header-rows: 1

   * - Broker
     - Public DNS ``A`` record
     - Private IP address

   * - Broker 1
     - ``kafka-1.example.com``
     - ``10.0.1.12``

   * - Broker 2
     - ``kafka-2.example.com``
     - ``10.0.2.15``

   * - Broker 3
     - ``kafka-3.example.com``
     - ``10.0.3.18``

Align Broker Listeners and Certificates
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Network peering and DNS resolution alone don't complete the
connection. Your broker listener properties and TLS certificates must
also match your DNS strategy.

In your ``server.properties`` file, set ``listeners`` to the internal
network interface and port that the broker binds to, and set
``advertised.listeners`` to the hostname that {+atlas-sp+} resolves:

.. code-block:: ini

   listeners=SASL_SSL://172.31.19.166:9093,CONTROLLER://172.31.19.166:9094
   advertised.listeners=SASL_SSL://kafka-1.example.com:9093

To prevent metadata routing and TLS handshake failures, the following
three values must match exactly:

- ``advertised.listeners``: the hostname that {+atlas-sp+} resolves,
  such as ``kafka-1.example.com``.
- The broker certificate: the TLS certificate that the broker
  presents must list the advertised hostname as a Subject Alternative
  Name, such as ``DNS:kafka-1.example.com``. If the certificate lists
  only the internal |aws| hostname, such as
  ``ip-172-31-19-166.ec2.internal``, certificate verification fails.
- The bootstrap server address: the address that you configure in
  your {+atlas-sp+} {+kafka+} connection must use the same hostname,
  such as ``kafka-1.example.com:9093``.

Troubleshoot Connection Failures
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If {+atlas-sp+} can't connect to your bootstrap server, check the
following configuration:

- **Security group rules.** Confirm that the security group for your
  brokers allows inbound TCP traffic on the broker listener port,
  such as ``9093``, from the |service| |vpc| |cidr| block.

- **Advertised listeners.** Confirm that ``advertised.listeners``
  uses hostnames that match your DNS strategy. Don't advertise
  ``localhost`` or an internal |aws| hostname unless you enabled DNS
  resolution across the peering connection.

- **Certificate name mismatch.** A handshake error such as
  ``SSLHandshakeException: No subject alternative DNS name matching
  <domain> found`` indicates that the hostname in
  ``advertised.listeners`` isn't listed as a Subject Alternative Name
  on the broker certificate. Regenerate the broker certificate to
  include that hostname.
