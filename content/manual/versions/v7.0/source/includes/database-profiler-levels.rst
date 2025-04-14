
``0``
   The profiler is off and does not collect any data.
   This is the default profiler level.

``1``
   The profiler collects data for operations that take longer
   than the value of ``slowms`` or that match a :ref:`filter
   <set-profiling-level-options-filter>`. 

   When a filter is set:

   - The ``slowms`` and ``sampleRate`` options are not used for
     profiling.
   - The profiler only captures operations that match the
     :ref:`filter <set-profiling-level-options-filter>`.

``2``
   The profiler collects data for all operations.

