Add an {+aws+} Confluent Private Link Connection through the {+atlas-ui+}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To add an {+aws+} Confluent Private Link connection to your {+spw+}
through the {+atlas-ui+}, first create the private endpoint, then
create the {+service+}-side connection.

Create the Private Endpoint
```````````````````````````

.. tabs::

   .. tab:: Dedicated
      :tabid: dedicated

      .. procedure::
         :style: normal

         .. step:: Go to your Confluent cluster networking details.

            In your Confluent account:

            a. Navigate to the cluster you want to connect to.
            #. In your cluster networking interface, navigate to
               your cluster networking details.

         .. step:: Add Private Link Access to your Confluent cluster.

            `Add Private Link Access
            <https://docs.confluent.io/cloud/current/networking/private-links/aws-privatelink.html#aws-privatelink-register>`__
            to your cluster. Provide a name of your choice. For the
            {+aws+} account number, provide the value of the
            ``awsAccountId`` field that you saved previously.

            Save the value of the :guilabel:`VPC Endpoint service
            name` for further use in this procedure.

         .. include:: /includes/nav/steps-network-access.rst

         .. step:: Go to the {+atlas-sp+} private endpoint interface.

            a. In the sidebar, click :guilabel:`Private Endpoint`.

            #. Click the :guilabel:`{+atlas-sp+}` tab.

            #. Click :guilabel:`Create endpoint`.

         .. step:: Select your cloud provider and vendor.

            a. Set :guilabel:`Cloud Provider` to :guilabel:`AWS`.

            #. Set :guilabel:`Vendor` to :guilabel:`Confluent Cloud`.

            #. Click :guilabel:`Next, enter service details`.

         .. step:: Provide your service details.

            a. Select the :guilabel:`Dedicated` :guilabel:`Cluster
               Type`.

            #. Set :guilabel:`Service Endpoint ID` to the
               :guilabel:`VPC Endpoint service name` you noted
               earlier.

            #. Set the :guilabel:`Endpoint region` to a region in
               which you have an {+service+} cluster.

            #. Set the :guilabel:`DNS Domain` to the fully qualified
               domain name of the bootstrap server on your Confluent
               cluster.

            #. Select the :guilabel:`DNS Subdomain(s)` option
               suitable to your use case and apply any subdomain
               entries as necessary.

               - If your cluster doesn't use subdomains, select a
                 :guilabel:`Single availability zone`.
               - If your cluster uses subdomains, select
                 :guilabel:`Multi-availability zones` and provide
                 the fully-qualified subdomain name of each
                 subdomain.

         .. step:: Click :guilabel:`Next, generate endpoint ID`.

   .. tab:: Enterprise
      :tabid: enterprise

      .. procedure::
         :style: normal

         .. step:: Go to your Confluent cluster networking details.

            In your Confluent account:

            a. Navigate to the cluster you want to connect to.
            #. In your cluster networking interface, navigate to
               your cluster networking details.

         .. step:: Add a PrivateLink Gateway to your Confluent cluster.

            `Add a PrivateLink Gateway configuration
            <https://docs.confluent.io/cloud/current/networking/aws-platt.html>`__
            in the same {+aws+} region as your cluster.

            Save the value of the :guilabel:`PrivateLink Service ID`
            for further use in this procedure.

         .. step:: Provide the interface endpoint ID to Confluent.

            Call the :oas-bump-atlas-op:`Return One Private Link
            <getgroupstreamprivatelinkconnection>` endpoint with the
            ``_id`` value that you saved previously and, on the
            Confluent :guilabel:`Configure gateway` page, provide
            the value of ``interfaceEndpointId`` as the VPC
            interface endpoint ID to continue the configuration.

            If you aren't on the :guilabel:`Configure gateway` page,
            follow these steps in your Confluent account to provide
            the ``interfaceEndpointId`` value as the VPC endpoint:

            a. Navigate to the cluster you want to connect to.
            #. In your cluster networking interface, navigate to
               your cluster networking details.
            #. Navigate to the access points interface.
            #. Add a new access point.
            #. When Confluent prompts you for an interface endpoint,
               provide the value of ``interfaceEndpointId``.

            After Confluent creates the access point, save the DNS
            domain that the gateway generates for it for further use
            in this procedure.

         .. include:: /includes/nav/steps-network-access.rst

         .. step:: Go to the {+atlas-sp+} private endpoint interface.

            a. In the sidebar, click :guilabel:`Private Endpoint`.

            #. Click the :guilabel:`{+atlas-sp+}` tab.

            #. Click :guilabel:`Create endpoint`.

         .. step:: Select your cloud provider and vendor.

            a. Set :guilabel:`Cloud Provider` to :guilabel:`AWS`.

            #. Set :guilabel:`Vendor` to :guilabel:`Confluent Cloud`.

            #. Click :guilabel:`Next, enter service details`.

         .. step:: Provide your service details.

            a. Select the :guilabel:`Enterprise` :guilabel:`Cluster
               Type`.

            #. Set :guilabel:`Service Endpoint ID` to the
               :guilabel:`VPC Endpoint service name` you noted
               earlier.

            #. Set the :guilabel:`Endpoint region` to a region in
               which you have an {+service+} cluster.

            #. Set the :guilabel:`DNS Domain` to the fully qualified
               domain name of the bootstrap server on your Confluent
               cluster.

            #. Select the :guilabel:`DNS Subdomain(s)` option
               suitable to your use case and apply any subdomain
               entries as necessary.

               - If your cluster doesn't use subdomains, select a
                 :guilabel:`Single availability zone`.

               - If your cluster uses subdomains, select
                 :guilabel:`Multi-availability zones` and provide
                 the fully-qualified subdomain name of each
                 subdomain.

         .. step:: Click :guilabel:`Next, generate endpoint ID`.

{+service+} generates a private endpoint ID. You may now view your
|aws| Confluent private endpoint's details in the :guilabel:`Network
Access` interface under the :guilabel:`{+atlas-sp+}` tab by clicking
the :guilabel:`View` button in the corresponding row.

Create the {+service+}-Side Connection
````````````````````````````````

.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-stream-processing.rst

   .. step:: Add a new connection.

      a. Locate the overview panel of the {+spw+} you want to
         modify and click :guilabel:`Manage`.

      #. Select the :guilabel:`Connection Registry` tab.

      #. Click :guilabel:`+ Add Connection`.

      #. Select a :guilabel:`Kafka` connection.

   .. step:: Provide your connection details.

      |aws| Confluent PrivateLink connections support either the
      ``SASL_SSL`` or the ``SSL`` :guilabel:`Security Protocol
      Method`. Select the tab for the method you want to use and
      provide the following values:

      .. tabs::

         .. tab:: SASL_SSL
            :tabid: sasl-ssl

            .. include:: /includes/atlas-stream-processing/kafka-pl-connection-fields-ui-sasl-ssl.rst

         .. tab:: SSL
            :tabid: ssl

            .. include:: /includes/atlas-stream-processing/kafka-pl-connection-fields-ui-ssl.rst

   .. step:: Click :guilabel:`Add connection`.
