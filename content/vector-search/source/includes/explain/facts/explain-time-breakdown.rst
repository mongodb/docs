The timing breakdown describes execution statistics pertinent to an 
|area-of-query-ref| execution. The following fields 
show the timing breakdown:

.. list-table::
   :header-rows: 1 
   :widths: 15 15 70 

   * - Field
     - Type
     - Description

   * - ``millisElapsed``
     - Long
     - Approximate wall-clock time elapsed performing tasks in this 
       |area-ref| including the amount of time the 
       children of the query spent in this |area-ref|. 
       The value is approximate number of 
       milliseconds elapsed while performing tasks in this area.

   * - ``invocationCounts`` 
     - Document
     - Number of invocations of tasks included in this |area-ref|.
       The value is a map of task names to their 
       invocation count.
