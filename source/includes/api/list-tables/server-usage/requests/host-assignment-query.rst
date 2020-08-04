.. list-table::
   :widths: 15 10 10 55 10
   :header-rows: 1
   :stub-columns: 1

   * - Query Parameter
     - Type
     - Necessity
     - Description
     - Default

   * - startDate
     - string
     - Required
     - |iso8601-date| when the list of host assignments starts.
     -

   * - endDate
     - string
     - Required
     - |iso8601-date| when the list of host assignments ends.
     -

   * - pageNum
     - integer
     - Required
     - Starting group of host assignments to return. Group size gets
       defined in **itemsPerPage**. This value starts with 1.
     -

   * - itemsPerPage
     - integer
     - Required
     - Number of host assignments to return in one group.
     - ``100``
