.. versionadded:: 5.3

Specifies the compression mode for :ref:`audit log encryption
<security-encryption-at-rest-audit-log>`. You must also enable audit log
encryption using either |audit-encryption-key-identifier-option| or
|audit-local-keyfile-option|.

|audit-compression-mode-option| can be set to one of these values:
   
.. list-table::
   :header-rows: 1
   :widths: 15 50
   
   * - Value
     - Description
   
   * - ``zstd``
     - Use the :term:`zstd` algorithm to compress the audit log.
      
   * - ``none`` *(default)*
     - Do not compress the audit log.

.. include:: /includes/note-audit-in-enterprise.rst
