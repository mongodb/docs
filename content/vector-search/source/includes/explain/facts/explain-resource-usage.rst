The ``resourceUsage`` document shows the resource used for running the query. It
contains the following fields:

.. list-table:: 
   :header-rows: 1
   :widths: 15 15 10 60

   * - Field 
     - Type 
     - Necessity 
     - Purpose

   * - ``majorFaults``
     - Long
     - Required
     - Number of major page faults, which occur when the system
       can't find the required data in memory resulting in reading from
       the backing store such as disk, during query execution.

   * - ``minorFaults``
     - Long
     - Required
     - Number of minor page faults, which occur when the data
       is in the page cache, but hasn't yet been mapped to the process'
       page table. 

   * - ``userTimeMs``
     - Long
     - Required
     - Amount of CPU time, in milliseconds, spent in user
       space. 

   * - ``systemTimeMs``
     - Long
     - Required
     - Amount of CPU time, in milliseconds, spent in system
       space. 

   * - ``maxReportingThreads``
     - Integer
     - Required
     - Maximum number of threads that ``mongot`` used during
       query execution across all batches. For non-concurrent explain
       queries, the value is ``1``.

   * - ``numBatches``
     - Integer
     - Required
     - Total number of batches that ``mongot`` was requested
       when processing the query.
