.. list-table:: 
   :header-rows: 1
   :widths: 20 50
   
   * - Read Preference Mode
     - Description
   * - :readmode:`primary`
     - Default mode. All operations read from the current replica set
       :term:`primary`.
   * - :readmode:`primaryPreferred`
     - In most situations, operations read from the :term:`primary` but
       if it is unavailable, operations read from :term:`secondary`
       members.
   * - :readmode:`secondary`
     - All operations read from the :term:`secondary` members of the
       replica set.
   * - :readmode:`secondaryPreferred`
     - In most situations, operations read from :term:`secondary`
       members but if no :term:`secondary` members are available,
       operations read from the :term:`primary`.
   * - :readmode:`nearest`
     - Operations read from member of the :term:`replica
       set` with the least network latency, irrespective of the member's type.
