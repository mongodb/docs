To configure an {+service+} integration with New Relic via OTel:

.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-project-integrations.rst
      
   .. step:: Configure your New Relic provider.

      a. Click :guilabel:`Configure` for the OpenTelemtry Metrics
         integration card.
      
      #. From the :guilabel:`Provider` dropdown menu, select
         :guilabel:`New Relic`.
      
      #. Provide your New Relic :guilabel:`API Key`.

      #. From the :guilabel:`Aggregation Temporality` dropdown menu,
	 select the appropriate `temporality
	 <https://opentelemetry.io/docs/specs/otel/metrics/data-model/#temporality>`__.
	       
      #. (Optional) To enable {+atlas-sp+} metrics tracking, 
         check the :guilabel:`Atlas Stream Processing` box under the
	 :guilabel:`Select Metrics to Send` heading.
      
      #. Click :guilabel:`Save`.
