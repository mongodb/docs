.. list-table::
   :widths: 20 14 11 45 10
   :stub-columns: 1


   * - since
     - number
     - Optional
     - |Epoch-time| from which to retrieve suggested indexes.

       - If you don't specify **duration**, the endpoint returns
         results between **since** and the current time.
       - If you specify neither **duration** nor **since**, the
         endpoint returns data for the previous 24 hours.
     -

   * - duration
     - number
     - Optional
     - Length of time in milliseconds during which to find
       suggested indexes among the managed namespaces in the cluster.

       - If you don't specify **since**, the endpoint returns results
         for the **duration** before the current time.

       - If you specify neither **duration** nor **since**, the
         endpoint returns data for the previous 24 hours.
     -
