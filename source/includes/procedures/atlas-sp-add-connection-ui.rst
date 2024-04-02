.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-stream-processing.rst

   .. step:: Go to the :guilabel:`Connection Registry`.

      a. Locate the overview panel of the {+spi+} you want to 
         modify and click :guilabel:`Configure`. 

      #. Select the :guilabel:`Connection Registry` tab.

   .. step:: Click :guilabel:`+ Add connection`.

   .. step:: Add a new connection.

      .. tabs:: 
            
         .. tab:: Apache Kafka
            :tabid: stream-connect-kafka

            To create a new connection to an {+kafka+} system:

            a. Select a :guilabel:`Kafka` 
               connection.

            #. Provide a :guilabel:`Connection Name`. Each
               connection name must be unique within a {+spi+}.
               This is the name used to reference the connection in 
               {+atlas-sp+} :ref:`aggregations <stream-aggregation>`.

            #. Specify an IP address for one or more 
               `bootstrap servers <https://kafka.apache.org/documentation/#streamsconfigs_bootstrap.servers>`__
               for your {+kafka+} system.

            #. From the dropdown menu, select a 
               :guilabel:`Security Protocol Method`. 
                  
               {+atlas-sp+} supports ``SASL_PLAINTEXT`` or 
               ``SASL_SSL``.

               .. tabs:: 

                  .. tab:: ``SASL_PLAINTEXT``
                     :tabid: stream-connect-kafka-plain-auth

                     a. From the dropdown menu, select a
                        :guilabel:`SASL Mechanism`. 

                        {+atlas-sp+} supports:
                              
                        - ``PLAIN``

                        - ``SCRAM-SHA-256``

                        - ``SCRAM-SHA-512``

                     #. Provide a :guilabel:`Username` for 
                        authentication.

                     #. Provide a password for authentication.

                     #. Click :guilabel:`Add connection`.

                  .. tab:: ``SASL_SSL``
                     :tabid: stream-connect-kafka-ssl-auth

                     a. From the dropdown menu, select a
                        :guilabel:`SASL Mechanism`. 

                        {+atlas-sp+} supports: 
                              
                        - ``PLAIN`` 

                        - ``SCRAM-SHA-256``

                        - ``SCRAM-SHA-512``

                     #. Click :guilabel:`Upload` to upload your 
                        :guilabel:`Certificate Authority PEM file`

                     #. Provide a :guilabel:`Username` for  
                        authentication.

                     #. Provide a password for authentication.

                     #. Click :guilabel:`Add connection`.

         .. tab:: {+service+} Database
            :tabid: stream-connect-atlas

            To create a new connection to an {+service+}
            :manual:`change stream <changeStreams>`:

            a. Select an :guilabel:`{+service+} Database` 
               connection.

            #. Provide a :guilabel:`Connection Name`. Each
               connection name must be unique within an {+spi+}. 
               This is the name used to reference the connection in 
               {+atlas-sp+} :ref:`aggregations <stream-aggregation>`.

            #. From the dropdown menu, select an 
               :guilabel:`{+service+} {+Cluster+}`. {+atlas-sp+}
               is only available on dedicated-tier {+clusters+}.

            #. Click :guilabel:`Add connection`. 

         .. tab:: Sample Connection
            :tabid: stream-connect-sample

            You can use a sample connection built into {+atlas-sp+} to
            develop and test new stream processors. The sample connection
            acts as a source of streaming data, but cannot be used as a 
            sink.

            To create a new connection to the sample stream:

            a. Select a :guilabel:`Sample Stream` connection.

            #. From the dropdown menu, select ``sample_stream_solar``.

            #. Click :guilabel:`Add connection`.
            