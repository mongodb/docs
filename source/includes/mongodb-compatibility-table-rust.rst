.. note::

   The Rust driver is currently missing some features, which are noted below.
   We plan to make this driver consistent with our other drivers in the future.

.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :class: compatibility-large

   * - Rust Driver Version
     - MongoDB 5.0
     - MongoDB 4.4
     - MongoDB 4.2
     - MongoDB 4.0
     - MongoDB 3.6

   * - 2.0
     - |checkmark| (*)
     - |checkmark| (*)
     - |checkmark| (*)
     - |checkmark| (*)
     - |checkmark| (*)

   * - 1.1
     -
     - |checkmark| (*)
     - |checkmark| (*)
     - |checkmark| (*)
     - |checkmark| (*)

   * - 1.0
     -
     - |checkmark| (*)
     - |checkmark| (*)
     - |checkmark| (*)
     - |checkmark| (*)

The Rust driver is not compatible with MongoDB server versions older than 3.6.

(*) Not all features in MongoDB are available in this version of the
driver. Unsupported features include :ref:`Change Streams <changeStreams>`,
:manual:`Causal Consistency </core/causal-consistency-read-write-concerns>`, and
:atlas:`Serverless Instance </reference/serverless-instance-limitations>` support.
