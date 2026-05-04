Reports aggregate metrics for FTDC (Full-Time Diagnostic Data Capture)
collection runs since the MongoDB process started. Use these metrics to
detect whether FTDC collections are falling behind the configured
sampling period.

.. code-block:: javascript

   ftdcCollectionMetrics : {
      collections : Long("<num>"),
      durationMicros : Long("<num>"),
      delayed : Long("<num>")
   },

.. serverstatus:: ftdcCollectionMetrics

   A document that contains FTDC collection run metrics.

   .. versionadded:: 8.3 *(also available in 8.2.2)*

.. serverstatus:: ftdcCollectionMetrics.collections

   The total number of FTDC collection runs since the MongoDB process
   started.

   .. versionadded:: 8.3 *(also available in 8.2.2)*

.. serverstatus:: ftdcCollectionMetrics.durationMicros

   The cumulative time, in microseconds, spent collecting FTDC samples
   since the MongoDB process started.

   .. versionadded:: 8.3 *(also available in 8.2.2)*

.. serverstatus:: ftdcCollectionMetrics.delayed

   The number of FTDC collection runs that met or exceeded the configured
   sampling period (see :parameter:`diagnosticDataCollectionPeriodMillis`).
   An increasing ``delayed`` value may indicate that the server is under
   heavy load, which can delay FTDC data collection.

   .. versionadded:: 8.3 *(also available in 8.2.2)*
