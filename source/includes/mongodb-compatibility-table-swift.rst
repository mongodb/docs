.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :class: compatibility-large

   * - Swift Driver Version
     - MongoDB 6.0
     - MongoDB 5.0
     - MongoDB 4.4
     - MongoDB 4.2
     - MongoDB 4.0
     - MongoDB 3.6

   * - 1.3.0 [#1.2-1.3-limitations]_
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|

   * - 1.2.0 [#1.2-1.3-limitations]_
     -
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|

   * - 1.1.0 [#1.0-1.1-limitations]_
     -
     -
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|

   * - 1.0.0 [#1.0-1.1-limitations]_
     -
     -
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|

The Swift driver is not compatible with MongoDB server versions older than 3.6.

.. [#1.2-1.3-limitations] Versions 1.2 and 1.3 do not include support for
   :ref:`Client-Side Field Level Encryption <manual-csfle-feature>`,
   :manual:`GridFS </core/gridfs/>`, and authentication using AWS IAM roles.

.. [#1.0-1.1-limitations] Versions 1.0 and 1.1 do not include support for
   :manual:`OCSP </core/security-transport-encryption/>`,
   :ref:`Client-Side Field Level Encryption <manual-csfle-feature>`,
   :manual:`GridFS </core/gridfs/>`, and authentication using AWS IAM roles.
