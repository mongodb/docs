If you use a whitelist on your firewall for network ports, open ports
27015 to 27017 to |tcp| and |udp| traffic on |service| hosts. This
grants your applications access to databases stored on |service|.

To configure your application-side networks to accept |service|
traffic, we recommend using the |service| |api|
:ref:`Get All Clusters <clusters-get-all>` endpoint to retrieve
``mongoURI`` from the
:ref:`response elements<clusters-get-all-response>`. You can also use
the :ref:`Get All MongoDB Processes<processes-get-all>` endpoint to
retrieve cluster :ref:`hostnames<processes-get-all-response>`
(mongo-shard-00-00.mongodb.net, mongo-shard-00-01.mongodb.net etc).

You can parse these hostname values and feed the |ipaddr| addresses
programatically into your application-tier orchestration automation to
push firewall updates.
