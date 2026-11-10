.. _csfle-aws-insert:

Use your {+csfle-abbrev+}-enabled
``MongoClient`` instance to insert an encrypted document into the
``medicalRecords.patients`` namespace using the following code
snippet:

.. tabs-drivers::

   .. tab::
      :tabid: java-sync

      .. literalinclude:: /includes/generated/in-use-encryption/csfle/java/aws/reader/src/main/java/com/mongodb/csfle/InsertEncryptedDocument.java
         :start-after: start-insert
         :end-before: end-insert
         :language: java
         :caption: InsertEncryptedDocument.java
         :dedent:

   .. tab::
      :tabid: nodejs

      .. literalinclude:: /includes/generated/in-use-encryption/csfle/node/aws/reader/insert_encrypted_document.js
         :start-after: start-insert
         :end-before: end-insert
         :language: javascript
         :caption: insert_encrypted_document.js
         :dedent:

   .. tab::
      :tabid: python

      .. literalinclude:: /includes/generated/in-use-encryption/csfle/python/aws/reader/insert_encrypted_document.py
          :start-after: start-insert
          :end-before: end-insert
          :language: python
          :caption: insert_encrypted_document.py
          :dedent:

   .. tab::
      :tabid: csharp

      .. literalinclude:: /includes/generated/in-use-encryption/csfle/dotnet/aws/reader/CSFLE/InsertEncryptedDocument.cs
          :start-after: start-insert
          :end-before: end-insert
          :language: csharp
          :caption: InsertEncryptedDocument.cs

   .. tab::
      :tabid: go

      .. literalinclude:: /includes/generated/in-use-encryption/csfle/go/aws/reader/insert-encrypted-document.go
          :start-after: start-insert
          :end-before: end-insert
          :language: go
          :caption: insert-encrypted-document.go

      .. note::

         Rather than creating a raw BSON document, you can pass a struct with ``bson`` tags directly
         to the driver for encoding.

When you insert a document, your {+csfle-abbrev+}-enabled client
encrypts the fields of your document such that it resembles the following:

.. literalinclude:: /includes/quick-start/inserted-doc-enc.json
   :language: json
   :copyable: false
