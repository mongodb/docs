.. versionadded:: 5.3

Specifies the path and file name for a local audit key file for
:ref:`audit log encryption <security-encryption-at-rest-audit-log>`.

.. note::

   Only use |audit-local-keyfile-option| for testing because the key is
   not secured. To secure the key, use
   |audit-encryption-key-identifier-option| and an external Key
   Management Interoperability Protocol (KMIP) server.
   
You cannot use |audit-local-keyfile-option| and
|audit-encryption-key-identifier-option| together.

.. include:: /includes/note-audit-in-enterprise.rst
