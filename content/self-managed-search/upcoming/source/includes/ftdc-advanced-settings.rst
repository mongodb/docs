.. list-table::
   :header-rows: 1
   :widths: 35 15 50

   * - Option
     - Default
     - Description

   * - ``enabled``
     - ``true``
     - Enables FTDC. When ``false``, ``mongot`` does not capture FTDC
       data.

   * - ``directorySizeMb``
     - ``100``
     - Maximum total size, in megabytes, of the FTDC archive directory.
       Must be at least ``10`` and greater than ``fileSizeMb``.

   * - ``fileSizeMb``
     - ``10``
     - Maximum size, in megabytes, of an individual FTDC archive file.
       Must be at least ``1`` and less than ``directorySizeMb``.

   * - ``collectionPeriodMillis``
     - ``1000``
     - Interval, in milliseconds, at which ``mongot`` collects metrics
       into FTDC. Must be at least ``100``.
