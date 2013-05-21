The following table provides a sample of the relationship between the
number of members in a replica set and the fault tolerance. The fault
tolerance is the maxium number of members that can fail and still leave
the majority necessary to elect a new primary.

.. list-table::
   :header-rows: 1
   :widths: 15 25 15

   * - Number of Members

     - Majority Required to Elect New Primary

     - Fault Tolerance

   * - 3

     - 2

     - 1

   * - 4

     - 3

     - 1

   * - 5

     - 3

     - 2

   * - 6

     - 4

     - 2
