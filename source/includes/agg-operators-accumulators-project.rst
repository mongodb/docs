The following operators are accumulators, but they are also available
as expressions which accept an array of values as input.

.. list-table::
   :header-rows: 1
   :widths: 20 80

   * - Name
     - Description

   * - :group:`$avg`
     - Returns an average of the specified expression or list of
       expressions for each document. Ignores non-numeric values.

   * - :group:`$concatArrays`
     - .. include:: /includes/concatArrays-accum-desc.rst

       .. versionadded:: 8.1

   * - :group:`$first`
     - Returns the result of an :ref:`expression
       <aggregation-expressions>` for the first document in a group.

   * - :group:`$last`
     - Returns the result of an :ref:`expression
       <aggregation-expressions>` for the last document in a group.

   * - :group:`$max`
     - Returns the maximum of the specified expression or list of
       expressions for each document
 
   * - :group:`$median`
     - .. include:: /includes/aggregation/fact-return-median.rst
       
       .. versionadded:: 7.0
 
   * - :group:`$min`
     - Returns the minimum of the specified expression or list of
       expressions for each document
 
   * - :group:`$percentile`
     - .. include:: /includes/aggregation/fact-return-percentile.rst
 
       .. versionadded:: 7.0
 
   * - :group:`$setUnion`
     - Takes two or more arrays and returns an array containing the 
       elements that appear in any input array.

       .. versionadded:: 8.1

   * - :group:`$stdDevPop`
     - Returns the population standard deviation of the input values.
 
   * - :group:`$stdDevSamp`
     - Returns the sample standard deviation of the input values.
 
   * - :group:`$sum`
     - Returns a sum of numerical values. Ignores non-numeric values.
