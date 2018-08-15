.. list-table::
   :header-rows: 1
   :widths: 10 20 70

   * - Name
     - Type
     - Description

   * - ``slowQueries``
     - array of documents
     - A list of documents with information about slow queries as
       detected by the Performance Advisor.

   * - ``slowQueries[n].line``
     - string
     - The raw log line pertaining to the slow query.

   * - ``slowQueries[n].namespace``
     - string
     - The namespace in which the slow query ran.