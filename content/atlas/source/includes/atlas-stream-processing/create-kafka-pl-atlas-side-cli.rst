:ref:`Add a connection <atlas-sp-manage-connection-add>`. {+kafka+}
PrivateLink connections support either the ``SASL_SSL`` or the ``SSL``
security protocol. Select the tab for the protocol you want to use and
provide the following key-value pairs:

.. tabs::

   .. tab:: SASL_SSL
      :tabid: sasl-ssl

      .. include:: /includes/atlas-stream-processing/kafka-pl-connection-fields-api-sasl-ssl.rst

   .. tab:: SSL
      :tabid: ssl

      .. include:: /includes/atlas-stream-processing/kafka-pl-connection-fields-api-ssl.rst
