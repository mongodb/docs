.. This file is shared by
   /reference/api/alerts.txt
   /reference/api/global-alerts.txt
   /reference/api/measurements.txt

.. These rows are part of the table found in
   /includes/possibleValues-api-measurements-host.rst
   But because they make the first column so wide, they are kept
   in a separate table here.

.. list-table::

   * - - ``QUERY_EXECUTOR_SCANNED``

     - The average rate per second to scan index items during
       queries and query-plan evaluations. This rate is driven by
       the same value as ``totalKeysExamined`` in the output of
       :manual:`explain </reference/command/explain>`. This
       measurement is found on the host's ``Query Executor``
       chart, accessed when :ref:`viewing metrics
       <access-host-statistics>`.

   * - - ``QUERY_EXECUTOR_SCANNED_OBJECTS``

     - The average rate per second to scan documents during queries
       and query-plan evaluations. |mms| derives the rate using the
       :manual:`explain </reference/command/explain>` output's
       ``totalDocsExamined`` value. This measurement is found on the
       host's ``Query Executor`` chart, accessed when :ref:`viewing
       metrics <access-host-statistics>`.

   * - - ``QUERY_TARGETING_SCANNED_PER_RETURNED``

     - The ratio of the number of index items scanned to the number of
       documents returned. This measurement is found on the host's
       ``Query Targeting`` chart, accessed when :ref:`viewing metrics
       <access-host-statistics>`.

   * - - ``QUERY_TARGETING_SCANNED_OBJECTS_PER_RETURNED``

     - The ratio of the number of documents scanned to the number of
       documents returned. This measurement is found on the host's
       ``Query Targeting`` chart, accessed when :ref:`viewing metrics
       <access-host-statistics>`.
