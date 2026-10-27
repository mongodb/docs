.. list-table::
   :header-rows: 1
   :widths: 20 50

   * - Read Preference Mode
     - Description

   * - :readmode:`primary`
     - Default mode. Operations read from the current replica set
       :term:`primary`.

       .. include:: /includes/extracts/transactions-read-pref.rst

   * - :readmode:`primaryPreferred`
     - Operations read from the primary if it is available. If
       it isn't, they read from eligible secondary members.
       
       Read preference :readmode:`primaryPreferred` supports
       :ref:`hedged reads <mongos-hedged-reads>` on sharded clusters.

   * - :readmode:`secondary`
     - Operations read from eligible :term:`secondary` members of
       the replica set.
       
       Read preference :readmode:`secondary` supports
       :ref:`hedged reads <mongos-hedged-reads>` on sharded clusters.

   * - :readmode:`secondaryPreferred`
     - .. include:: /includes/secondaryPreferred-read-mode.rst

       Read preference :readmode:`secondaryPreferred` supports
       :ref:`hedged reads <mongos-hedged-reads>` on sharded clusters.

   * - :readmode:`nearest`
     - Operations read from an eligible member that has a network latency
       within the latency window, regardless of whether it is primary or
       secondary.

       Read preference :readmode:`nearest` supports
       :ref:`hedged reads <mongos-hedged-reads>` on sharded clusters
       and enables the hedged read option by default.

- For all modes, a member is *available* when it responds to the client's
  periodic monitoring checks, which confirm that the member is reachable over
  the network and able to respond to requests.

- For all modes except ``primary``, a member is *eligible* if it satisfies the
  read preference's :ref:`maxStalenessSeconds <replica-set-read-preference-max-staleness>`
  option and any specified :ref:`tag set lists <replica-set-read-preference-tag-sets>`.

- For all modes except ``primary``, the :urioption:`localThresholdMS`
  connection string option sets the local threshold that the client uses to
  calculate the :ref:`latency window <replica-set-read-preference-behavior-nearest>`
  when choosing among eligible members.

.. important::

   Read preference modes provide no guarantee that an operation succeeds.
   Availability and eligibility determine which members the client
   considers, but a selected member can still reject an operation, such as when
   it is under load.
