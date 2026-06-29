.. list-table::
   :header-rows: 1
   :widths: 25 75

   * - Event

     - Log Message Description

   * - Initial sync begins (per index)

     - ``Beginning initial sync.``

   * - Initial sync queue activity

     - ``Queued initial syncs.``

   * - Steady-state replication

     - The absence of ``Beginning initial sync.`` events
       combined with ongoing replication activity indicates
       that the initial sync is complete and steady-state
       replication is running. Inactivity at this point is
       healthy.
