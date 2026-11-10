.. list-table::
   :header-rows: 1
   :widths: 20 40

   * - Provenance
     - Description

   * - ``clientSupplied``
     - The read concern was specified in the application.

   * - ``customDefault``
     - The read concern originated from a custom defined
       default value. See :dbcommand:`setDefaultRWConcern`.

   * - ``implicitDefault``
     - The read concern originated from the server in absence
       of all other read concern specifications.
