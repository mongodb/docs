.. cond:: cloud

   .. list-table::
     :widths: 40 60
     :header-rows: 1

     * - Third-Party Service

       - Configuration Details

     * - :guilabel:`New Relic Settings`

       - .. include:: /includes/fact-new-relic-deprecated.rst
        
         Configures |mms| to send metric data about your deployment
         to `New Relic <http://newrelic.com/>`_ for viewing through the
         New Relic MongoDB plugin. You can also use Insights for New
         Relic to run analytics on the collected data. |mms| sends
         New Relic the same metric data as displayed in |mms|
         :ref:`cluster metrics <monitor-cluster-metrics>`.

         To learn more, see :ref:`new-relic-integration`.

     * - :guilabel:`PagerDuty Settings`

       - Configures |mms| to send metric data about your deployment
         to your |pagerduty| account.
         To learn more, see :ref:`pagerduty-integration-mms`.

         .. include:: /includes/fact-pagerduty-api-key-decommission.rst

     * - :guilabel:`Prometheus Settings`

       - Configures |mms| to send metric data about your deployment
         to your |prometheus| instance. To learn more, see
         :ref:`prometheus-integration-mms`.

.. cond:: onprem

   .. list-table::
     :widths: 40 60
     :header-rows: 1

     * - Third-Party Service

       - Configuration Details

     * - :guilabel:`New Relic Settings`

       - .. include:: /includes/fact-new-relic-deprecated.rst
        
         Configures |mms| to send metric data about your deployment
         to `New Relic <http://newrelic.com/>`_ for viewing through the
         New Relic MongoDB plugin. You can also use Insights for New
         Relic to run analytics on the collected data. |mms| sends
         New Relic the same metric data as displayed in |mms|
         :ref:`cluster metrics <monitor-cluster-metrics>`.

         To learn more, see :ref:`new-relic-integration`.

     * - :guilabel:`PagerDuty Settings`

       - Configures |mms| to send metric data about your deployment
         to your |pagerduty| account.

         .. include:: /includes/fact-pagerduty-api-key-decommission.rst
