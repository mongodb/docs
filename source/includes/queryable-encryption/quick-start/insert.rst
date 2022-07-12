.. _qe-quick-start-insert:

Use your {+qe+} enabled
``MongoClient`` instance to insert an encrypted document into the
``medicalRecords.patients`` namespace using the following code
snippet:

.. tabs-drivers::

   .. tab::
      :tabid: nodejs

      .. literalinclude::  /includes/sample_apps/csfle/build/node-fle-2/local/reader/insert_encrypted_document.js
         :start-after: start-insert
         :end-before: end-insert
         :language: javascript
         :dedent:
         :caption: insert_encrypted_document.js

   .. tab::
      :tabid: python

      .. literalinclude::  /includes/sample_apps/csfle/build/python-fle-2/local/reader/insert_encrypted_document.py
         :start-after: start-insert
         :end-before: end-insert
         :language: python
         :dedent:
         :caption: insert_encrypted_document.py

   .. tab::
      :tabid: java-sync

      .. literalinclude:: /includes/sample_apps/csfle/build/java-fle-2/local/reader/src/main/java/com/mongodb/csfle/insertEncryptedDocument.java
         :start-after: start-insert
         :end-before: end-insert
         :language: java
         :dedent:
         :caption: insertEncryptedDocument.java

   .. tab::
      :tabid: go

      .. literalinclude:: /includes/sample_apps/csfle/build/go-fle-2/local/reader/insert-encrypted-document.go
         :start-after: start-insert
         :end-before: end-insert
         :language: go
         :dedent:
         :caption: insert-encrypted-document.go

   .. tab::
      :tabid: csharp

      .. literalinclude:: /includes/sample_apps/csfle/build/dotnet-fle-2/local/reader/QueryableEncryption/InsertEncryptedDocument.cs
         :start-after: start-insert
         :end-before: end-insert
         :language: csharp
         :dedent:
         :caption: InsertEncryptedDocument.cs

When you insert a document, your {+qe+} enabled client
encrypts the fields of your document such that it resembles the following:

.. literalinclude:: /includes/queryable-encryption/quick-start/inserted-doc-enc.json
   :language: json

.. include:: /includes/queryable-encryption/safe-content-warning.rst
