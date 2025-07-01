.. This file is shared by
   /reference/api/alerts.txt
   /reference/api/global-alerts.txt
   /reference/api/measurements.txt
.. These rows are part of the table found in
   /includes/possibleValues-api-measurements-host.rst
   But because they make the first column so wide, they are kept
   in a separate table here.
.. list-table::
   :widths: 40 60

   * - - ``QUERY_EXECUTOR_SCANNED``

     - Average rate per second to scan index items during
       queries and query-plan evaluations found in the value of
       ``totalKeysExamined`` from the 
       :manual:`explain </reference/command/explain>` command.

   * - - ``QUERY_EXECUTOR_SCANNED_OBJECTS``

     - Average rate of documents scanned per second during queries
       and query-plan evaluations found in the value of
       ``totalDocsExamined`` from the
       :manual:`explain </reference/command/explain>` command.

   * - - ``QUERY_TARGETING_SCANNED_PER_RETURNED``

     - Ratio of the number of index items scanned to the number of
       documents returned.

   * - - ``QUERY_TARGETING_SCANNED_OBJECTS_PER_RETURNED``

     - Ratio of the number of documents scanned to the number of
       documents returned.
