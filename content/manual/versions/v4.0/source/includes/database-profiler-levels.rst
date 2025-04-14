.. list-table::
   :header-rows: 1
   :widths: 25 75
   
   * - Level
     - Description

   * - ``0``
     - The profiler is off and does not collect any data.
       This is the default profiler level.

   * - ``1``
     - The profiler collects data for operations that take longer
       than the value of ``slowms``.

   * - ``2``
     - The profiler collects data for all operations.