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

   * - :readmode:`secondary`
     - All operations read from the :term:`secondary` members of the
       replica set.

   * - :readmode:`secondaryPreferred`
     - .. include:: /includes/secondaryPreferred-read-mode.rst

   * - :readmode:`nearest`
     - Operations read from a random eligible :term:`replica set`
       member, irrespective of whether that member is a :term:`primary`
       or :term:`secondary`, based on a specified latency threshold.
       The operation considers the following when calculating latency:
       
       - The :urioption:`localThresholdMS` connection string option
       - The :ref:`maxStalenessSeconds
         <replica-set-read-preference-max-staleness>` read preference
         option
       - Any specified :doc:`tag set lists
         </tutorial/configure-replica-set-tag-sets>`
