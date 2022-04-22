
.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :class: compatibility-large

   * - Rust Driver Version
     - MongoDB 5.3
     - MongoDB 5.2
     - MongoDB 5.1
     - MongoDB 5.0
     - MongoDB 4.4
     - MongoDB 4.2
     - MongoDB 4.0
     - MongoDB 3.6
   * - 2.2 [#2.2-limitation]_
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
   * - 2.1 [#2.1-limitation]_
     - 
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
     - 
     - ✓
     - ✓
     - ✓
     - ✓

The Rust driver is not compatible with MongoDB server versions older than 3.6.

.. [#2.2-limitation] The Rust driver does not support Decimal128, 
   :ref:`Client-Side Field Level Encryption <ecosystem-csfle>`, 
   :manual:`GridFS </core/gridfs/>`, and
   :manual:`OCSP </core/security-transport-encryption/>`.

.. [#2.1-limitation] The Rust driver does not support Decimal128, 
   :ref:`Client-Side Field Level Encryption <ecosystem-csfle>`, 
   :manual:`GridFS </core/gridfs/>`, 
   :manual:`OCSP </core/security-transport-encryption/>`, 
   and :ref:`change streams <changeStreams>`.

.. [#limitations] Not all features in MongoDB are available in these driver versions. Unsupported
   features include Decimal128, 
   :ref:`Client-Side Field Level Encryption <ecosystem-csfle>`, 
   :manual:`GridFS </core/gridfs/>`, 
   :manual:`OCSP </core/security-transport-encryption/>`, 
   :ref:`change streams <changeStreams>`,
   :manual:`Causal Consistency </core/causal-consistency-read-write-concerns>`, and
   :atlas:`Serverless Instances </reference/serverless-instance-limitations>`.
