- :guilabel:`Rejected` displays the number of operations that
  MongoDB rejects over time because the query matches the
  user-defined rejection filter.

- :guilabel:`Killed` displays the number of read operations
  that MongoDB terminates over time after the operation exceeds the
  default {+cluster+} timeout.

- :guilabel:`Rejected (IWM)` displays the number of operations
  that :ref:`Intelligent Workload Management (IWM) <intelligent-workload-management>`
  policies reject over time when CPU pressure and operation latency
  increase to prevent cluster overload.

  To learn more, see :ref:`Adaptive Operation Rate Limiting <cluster-operation-rate-limiting>`.

- :guilabel:`Terminated (killOp)` displays the number of operations
  terminated over time using the :dbcommand:`killOp` command. This
  includes both user-terminated operations and IWM policy-terminated operations.
  IWM policies terminates expensive operations with high execution times when
  CPU pressure and operation latency are high to maintain cluster health.

  To learn more, see :ref:`Query Sentinel <query-sentinel>`.
