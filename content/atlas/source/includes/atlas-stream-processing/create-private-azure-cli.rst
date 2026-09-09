Add an |azure| EventHub Private Link Connection through the {+atlas-cli+}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To add an |azure| EventHub Private Link connection to your {+spw+}
through the {+atlas-cli+}, follow these steps:

.. TODO: First-pass draft. Steps require technical verification before
   publication.

.. procedure::
   :style: normal

   .. step:: Create an {+service+} Private Endpoint.

      Call the :ref:`atlas api streams createPrivateLinkConnection
      <atlas-api-streams-createPrivateLinkConnection>` command.

      For an |azure| EventHub Private Link connection, you must set
      the following key-value pairs:

      .. list-table::
         :widths: 35 65
         :header-rows: 1

         * - Key
           - Value

         * - ``provider``
           - ``"AZURE"``

         * - ``region``
           - Region of your |azure| Event Hub namespace.

         * - ``serviceEndpointId``
           - Your EventHub namespace `endpoint.
             <https://learn.microsoft.com/en-us/rest/api/eventhub/namespaces/get?view=rest-eventhub-2024-01-01&tabs=HTTP>`__
             Note that this value must be the Azure Resource Manager
             (ARM) ID of the Event Hub namespace, not the ARM ID of an
             individual Event Hub.

         * - ``dnsDomain``
           - Fully qualified domain name, with port number, of the
             bootstrap server in your |azure| Event Hub namespace. This
             domain name conforms to the format described :azure:`here
             </event-hubs/event-hubs-quickstart-kafka-enabled-event-hubs?tabs=passwordless>`.

      After you run the command, save the value of the ``_id`` field
      in the response body for further use in this procedure.

   .. step:: Accept the requested connection within your cloud
      provider account.

      For Private Link connections to |azure|, navigate to your Event
      Hub networking page and select the :guilabel:`Private endpoint
      connections` tab. In the table of connections, identify your
      newly requested connection and approve it.

   .. step:: Create the {+service+}-side connection.

      .. include:: /includes/atlas-stream-processing/create-kafka-pl-atlas-side-cli.rst
