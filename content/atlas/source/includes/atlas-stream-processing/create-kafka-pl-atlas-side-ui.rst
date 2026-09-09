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

      {+kafka+} PrivateLink connections support either the
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
