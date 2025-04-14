.. _csfle-kmip-insert:

Use your {+csfle-abbrev+}-enabled
``MongoClient`` instance to insert an encrypted document into the
``medicalRecords.patients`` namespace using the following code
snippet:

.. tabs-drivers::

   .. tab::
      :tabid: java-sync

      .. literalinclude:: /includes/generated/in-use-encryption/csfle/java/kmip/reader/src/main/java/com/mongodb/csfle/InsertEncryptedDocument.java
         :start-after: start-insert
         :end-before: end-insert
         :language: java
         :dedent:
         :caption: InsertEncryptedDocument.java

   .. tab::
      :tabid: nodejs

      .. literalinclude:: /includes/generated/in-use-encryption/csfle/node/kmip/reader/insert_encrypted_document.js
         :start-after: start-insert
         :end-before: end-insert
         :language: javascript
         :dedent:
         :caption: insert_encrypted_document.js

   .. tab::
      :tabid: python

      .. literalinclude:: /includes/generated/in-use-encryption/csfle/python/kmip/reader/insert_encrypted_document.py
          :start-after: start-insert
          :end-before: end-insert
          :language: python
          :dedent:
          :caption: insert_encrypted_document.py

   .. tab::
      :tabid: csharp

      .. literalinclude:: /includes/generated/in-use-encryption/csfle/dotnet/kmip/reader/CSFLE/InsertEncryptedDocument.cs
          :start-after: start-insert
          :end-before: end-insert
          :language: csharp
          :dedent:
          :caption: InsertEncryptedDocument.cs

   .. tab::
      :tabid: go

      .. literalinclude:: /includes/generated/in-use-encryption/csfle/go/kmip/reader/insert-encrypted-document.go
          :start-after: start-insert
          :end-before: end-insert
          :language: go
          :dedent:
          :caption: insert-encrypted-document.go

      .. note::

         Rather than creating a raw BSON document, you can pass a struct with ``bson`` tags directly
         to the driver for encoding.

When you insert a document, your {+csfle-abbrev+}-enabled client
encrypts the fields of your document such that it resembles the following:

.. literalinclude:: /includes/quick-start/inserted-doc-enc.json
   :language: json
   :copyable:
   