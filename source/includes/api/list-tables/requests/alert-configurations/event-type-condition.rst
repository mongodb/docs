.. list-table::
   :widths: 20 14 11 55
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Necessity
     - Description

   * - ``enabled``
     - boolean
     - Optional
     - Flag that indicates if this alert configuration is enabled or
       disabled.

   * - ``eventTypeName``
     - string
     - Required
     - Type of event that triggers an alert.

       .. include:: /includes/api/list-tables/alert-eventTypeNames.rst

