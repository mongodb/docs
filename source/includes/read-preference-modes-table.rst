.. list-table::
   :header-rows: 1
   :widths: 20 50

   * - Read Preference Mode
     - Description
   * - :readmode:`primary`
     - Default mode. All operations read from the current replica set
       :term:`primary`.

       .. include:: /includes/extracts/transactions-read-pref.rst

   * - :readmode:`primaryPreferred`
     - In most situations, operations read from the :term:`primary` but
       if it is unavailable, operations read from :term:`secondary`
       members.
       
       Starting in version 4.4, :readmode:`primaryPreferred` supports
       :ref:`hedged reads <mongos-hedged-reads>` on sharded clusters.

   * - :readmode:`secondary`
     - All operations read from the :term:`secondary` members of the
       replica set.
       
       Starting in version 4.4, :readmode:`secondary` supports
       :ref:`hedged reads <mongos-hedged-reads>` on sharded clusters.

   * - :readmode:`secondaryPreferred`
     - In most situations, operations read from :term:`secondary`
       members but if no :term:`secondary` members are available,
       operations read from the :term:`primary` on sharded clusters.

       Starting in version 4.4, :readmode:`secondaryPreferred` supports
       :ref:`hedged reads <mongos-hedged-reads>` on sharded clusters.

   * - :readmode:`nearest`
     - Operations read from the member of the :term:`replica set` with
       the least network latency, irrespective of whether that member
       is a :term:`primary` or :term:`secondary`.

       Starting in version 4.4, :readmode:`nearest` supports
       :ref:`hedged reads <mongos-hedged-reads>` on sharded clusters
       and enables the hedged read option by default.
