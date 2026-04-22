To configure an {+service+} integration with a custom OTLP endpoint:

.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-project-integrations.rst
      
   .. step:: Configure your custom OTel provider.

      a. Click :guilabel:`Configure` for the OpenTelemtry Metrics
         integration card.
      
      #. From the :guilabel:`Provider` dropdown menu, select
         :guilabel:`Custom`.
      
      #. Provide your :guilabel:`OTLP Endpoint`.

      #. Provide your :guilabel:`OTLP Headers` as a series of
	 key-value pairs. For each additional header after the first,
	 click :guilabel:`+ Add Header` to display new input fields.
      
      #. From the :guilabel:`Aggregation Temporality` dropdown menu,
	 select the appropriate `temporality
	 <https://opentelemetry.io/docs/specs/otel/metrics/data-model/#temporality>`__
	 for your OTLP endpoint.
      
      #. (Optional) To enable {+atlas-sp+} metrics tracking, 
         check the :guilabel:`Atlas Stream Processing` box under the
	 :guilabel:`Select Metrics to Send` heading.
      
      #. Click :guilabel:`Save`. 
