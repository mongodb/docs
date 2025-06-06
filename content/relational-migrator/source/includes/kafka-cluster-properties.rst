.. list-table:: 
   :header-rows: 1
   :width: 40 60

   * - Property Name
     - Value

   * - ``spring.profiles.active``
     - ``kafka``

   * - ``server.port``
     - The port the Relation Migrator application runs on.

   * - ``migrator.kafka.bootstrap.servers``
     - The list of ``host:port`` pairs of your pre-existing kafka cluster. 

       For more information, see `Worker Configuration Properties 
       <https://docs.confluent.io/platform/current/connect/userguide.html#worker-configuration-properties-file>`__. 

   * - ``migrator.kafka.connect.url``
     - The Kafka Connect host url using the ``{host}:{port}`` format. 

   * - ``migrator.kafka.connect.metrics.jmx.service.url``
     - The Kafka Connect Java Management Extensions (JMX) url. 

       For example: ``service:jmx:rmi:///jndi/rmi://localhost:9876/jmxrmi``