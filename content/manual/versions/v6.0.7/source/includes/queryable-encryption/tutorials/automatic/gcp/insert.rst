.. _qe-gcp-insert:

Use your {+qe+} enabled
``MongoClient`` instance to insert an encrypted document into the
``medicalRecords.patients`` namespace using the following code
snippet:

.. tabs-drivers::

   .. tab::
      :tabid: shell

      .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/mongosh/gcp/reader/insert_encrypted_document.js
         :start-after: start-insert
         :end-before: end-insert
         :language: javascript
         :dedent:
         :caption: insert_encrypted_document.js

   .. tab::
      :tabid: nodejs

      .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/node/gcp/reader/insert_encrypted_document.js
         :start-after: start-insert
         :end-before: end-insert
         :language: javascript
         :dedent:
         :caption: insert_encrypted_document.js

   .. tab::
      :tabid: python

      .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/python/gcp/reader/insert_encrypted_document.py
         :start-after: start-insert
         :end-before: end-insert
         :language: python
         :dedent:
         :caption: insert_encrypted_document.py

   .. tab::
      :tabid: java-sync

      .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/java/gcp/reader/src/main/java/com/mongodb/qe/InsertEncryptedDocument.java
         :start-after: start-insert
         :end-before: end-insert
         :language: java
         :dedent:
         :caption: InsertEncryptedDocument.java

   .. tab::
      :tabid: go

      .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/go/gcp/reader/insert-encrypted-document.go
         :start-after: start-insert
         :end-before: end-insert
         :language: go
         :dedent:
         :caption: insert-encrypted-document.go

   .. tab::
      :tabid: csharp

      .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/dotnet/gcp/reader/QueryableEncryption/InsertEncryptedDocument.cs
         :start-after: start-insert
         :end-before: end-insert
         :language: csharp
         :dedent:
         :caption: InsertEncryptedDocument.cs

When you insert a document, your {+qe+} enabled client
encrypts the fields of your document such that it resembles the following:

.. literalinclude:: /includes/queryable-encryption/quick-start/inserted-doc-enc.json
   :language: json
   :copyable:

.. include:: /includes/queryable-encryption/safe-content-warning.rst
