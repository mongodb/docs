.. list-table:: 
   :header-rows: 1
   :width: 40 15 45

   * - Property Name
     - Default 
     - Description 

   * - ``spring.profiles.active``
     - local
     - Relational Migrator can be run in the following profile: 

       - ``kafka``: Remote server using embedded server deployment.
       - ``confluent``: Remote server using Confluent Cloud for managed Kafka

       Set the profile value to ``kafka``. 

   * - ``server.port``
     - 8278
     - The port the Relation Migrator application runs on.

   * - ``migrator.kafka.bootstrap.servers``
     - No default
     - This is a list of ``host:port`` pairs of your pre-existing kafka cluster. 

       For more information, see `Worker Configuration Properties 
       <https://docs.confluent.io/platform/current/connect/userguide.html#worker-configuration-properties-file>`__. 

   * - ``migrator.kafka.connect.url``
     - No default 
     - The Kafka Connect host url using the ``{host}:{port}`` format. 

   * - ``migrator.kafka.connect.metrics.jmx.service.url``
     - No default
     - The Kafka Connect Java Management Extensions (JMX) url. 

       For example: ``service:jmx:rmi:///jndi/rmi://localhost:9876/jmxrmi``