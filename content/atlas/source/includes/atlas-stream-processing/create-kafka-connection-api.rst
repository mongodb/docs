Add a Kafka Connection through the {+atlas-admin-api+}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The {+atlas-admin-api+} provides the :oas-bump-atlas-op:`Create
One Connection <creategroupstreamconnection>` endpoint for adding a
connection to a connection registry.

.. important::

   After adding an external connection such as an {+kafka+} cluster to
   your connection registry, you must add {+service+} IP addresses to 
   an access list for that external connection. To learn more, 
   see :ref:`atlas-add-inbound-ips`. 

.. include:: /includes/atlas-stream-processing/kafka-sp-params.rst

.. include:: /includes/atlas-stream-processing/kafka-stage-support.rst
