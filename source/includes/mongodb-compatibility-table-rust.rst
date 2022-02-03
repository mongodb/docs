
.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :class: compatibility-large

   * - Rust Driver Version
     - MongoDB 5.2
     - MongoDB 5.1
     - MongoDB 5.0
     - MongoDB 4.4
     - MongoDB 4.2
     - MongoDB 4.0
     - MongoDB 3.6
   * - 2.1 [#2.1-limitation]_
     - 
     - 
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
   * - 2.0 [#limitations]_
     - 
     - 
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
   * - 1.1 [#limitations]_
     - 
     - 
     - 
     - ✓
     - ✓
     - ✓
     - ✓

The Rust driver is not compatible with MongoDB server versions older than 3.6.

.. [#2.1-limitation] The Rust driver does not support :ref:`change streams <changeStreams>`.

.. [#limitations] Not all features in MongoDB are available in these driver versions. Unsupported
   features include :ref:`Change Streams <changeStreams>`,
   :manual:`Causal Consistency </core/causal-consistency-read-write-concerns>`, and
   :atlas:`Serverless Instance </reference/serverless-instance-limitations>` support.
