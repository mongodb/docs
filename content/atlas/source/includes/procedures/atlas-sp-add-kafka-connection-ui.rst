.. procedure::  
   :style: normal  
  
   .. include:: /includes/nav/steps-stream-processing.rst  
     
   .. step:: Go to the :guilabel:`Connection Registry`.  
  
      a. Locate the overview panel of the {+spi+} you want to  
         modify and click :guilabel:`Configure`.  
           
      #. Select the :guilabel:`Connection Registry` tab.  
  
   .. step:: Click :guilabel:`+ Add connection`.  
  
   .. step:: Add a new connection.  
  
      a. Select a :guilabel:`Kafka` connection.  
  
      #. Provide a :guilabel:`Connection Name`. Each connection name must be unique within a {+spi+}.  
         This is the name used to reference the connection in {+atlas-sp+} :ref:`aggregations <stream-aggregation>`.  
  
      #. Select a :guilabel:`Network Access` type. {+atlas-sp+}  
         supports :guilabel:`Public IP` or :guilabel:`VPC Peering`  
         connections.  
  
      .. tabs::  
  
         .. tab:: Public IP  
            :tabid: stream-connect-kafka-public-ip  
  
            Click the :guilabel:`Public IP` button. No further  
            configuration is needed for this network access type.  
  
         .. tab:: VPC Peering  
            :tabid: stream-connect-kafka-vpc-peering  
  
            1. Click the :guilabel:`VPC Peering` button.  
  
            #. Toggle :guilabel:`Enable VPC Peering` on.  
               {+atlas-sp+} automatically selects the appropriate  
               VPC peering connection from your configured  
               connections.  
  
            If you do not have a VPC peering connection,  
            :ref:`Configure an {+service+} Network Peering  
            Connection <create-network-peer-connection>`.  
  
      #. Specify an IP address for one or more `bootstrap servers <https://kafka.apache.org/documentation/#streamsconfigs_bootstrap.servers>`__  
         for your {+kafka+} system.  
  
      #. From the dropdown menu, select a :guilabel:`Security Protocol Method`.  
  
         {+atlas-sp+} supports ``SASL_PLAINTEXT``, ``SASL_SSL``, and ``SSL``.  
  
         .. tabs::  
  
            .. tab:: ``SASL_PLAINTEXT``  
               :tabid: stream-connect-kafka-plain-auth  
  
               ``SASL_PLAINTEXT`` is incompatible with  
               VPC peering. To use VPC peering, you must  
               select the ``SASL_SSL`` or the ``SSL`` method.  
  
               a. From the dropdown menu, select a :guilabel:`SASL Mechanism`.  
  
                  {+atlas-sp+} supports:  
  
                  - ``PLAIN``  
  
                  - ``SCRAM-SHA-256``  
  
                  - ``SCRAM-SHA-512``  
  
               #. Provide a :guilabel:`Username` for authentication.  
  
               #. Provide a password for authentication.  
  
               #. Click :guilabel:`Add connection`.  
  
            .. tab:: ``SASL_SSL``  
               :tabid: stream-connect-kafka-ssl-auth  
  
               1. From the dropdown menu, select a :guilabel:`SASL Mechanism`.  
  
                  {+atlas-sp+} supports:  
  
                  - ``PLAIN``  
  
                  - ``SCRAM-SHA-256``  
  
                  - ``SCRAM-SHA-512``  
  
               #. Click :guilabel:`Upload` to upload your :guilabel:`Certificate Authority PEM file`.  
  
               #. Provide a :guilabel:`Username` for authentication.  
  
               #. Provide a password for authentication.  
  
               #. Click :guilabel:`Add connection`.  
  
            .. tab:: ``SSL``  
               :tabid: stream-connect-kafka-mtls-auth  
  
               1. **(Optional)** If you are using a Certificate Authority other than the default {+kafka+} CA, 
                  click :guilabel:`Upload` to upload your :guilabel:`Certificate Authority PEM file`.  
  
               #. Click :guilabel:`Upload` to upload your :guilabel:`Client SSL Certificate`.  
  
               #. Click :guilabel:`Upload` to upload your :guilabel:`Client SSL Keyfile`.  
  
               #. **(Optional)** If your Client SSL Keyfile is password-protected,  
                  type your password into the :guilabel:`Client key password` field.  
  
               #. Click :guilabel:`Add connection`.
