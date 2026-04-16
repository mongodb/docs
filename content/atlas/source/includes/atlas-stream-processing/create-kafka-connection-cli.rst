Add a Kafka Connection through the {+atlas-cli+}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To add a Kafka connection to your {+spw+} through the
{+atlas-cli+}, follow these steps:

.. include:: /includes/extracts/atlas-streams-connections-create.rst

.. important::

   After adding an external connection such as an {+kafka+} cluster to
   your connection registry, you must add {+service+} IP addresses to 
   an access list for that external connection. To learn more, 
   see :ref:`atlas-add-inbound-ips`. 

.. include:: /includes/atlas-stream-processing/kafka-sp-params.rst

.. include:: /includes/atlas-stream-processing/kafka-stage-support.rst
