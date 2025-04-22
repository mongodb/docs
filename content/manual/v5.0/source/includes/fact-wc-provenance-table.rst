.. list-table::
   :header-rows: 1
   :widths: 20 40

   * - Provenance
     - Description

   * - ``clientSupplied``
     - The write concern was specified in the application.

   * - ``customDefault``
     - The write concern originated from a custom defined
       default value. See :dbcommand:`setDefaultRWConcern`.

   * - ``getLastErrorDefaults``
     - The write concern originated from the replica set's
       :rsconf:`settings.getLastErrorDefaults` field.

   * - ``implicitDefault``
     - The write concern originated from the server in absence
       of all other write concern specifications.
