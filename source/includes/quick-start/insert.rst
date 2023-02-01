.. _csfle-quick-start-insert:

Use your {+csfle-abbrev+}-enabled
``MongoClient`` instance to insert a {+in-use-doc+} into the
``medicalRecords.patients`` namespace using the following code
snippet:

.. tabs-drivers::

   .. tab::
      :tabid: java-sync

      .. literalinclude:: /includes/generated/in-use-encryption/csfle/java/local/reader/src/main/java/com/mongodb/csfle/InsertEncryptedDocument.java
         :start-after: start-insert
         :end-before: end-insert
         :language: java
         :dedent:

   .. tab::
      :tabid: nodejs

      .. literalinclude:: /includes/generated/in-use-encryption/csfle/node/local/reader/insert_encrypted_document.js
         :start-after: start-insert
         :end-before: end-insert
         :language: javascript
         :dedent:

   .. tab::
      :tabid: python

      .. literalinclude:: /includes/generated/in-use-encryption/csfle/python/local/reader/insert_encrypted_document.py
          :start-after: start-insert
          :end-before: end-insert
          :language: python
          :dedent:

   .. tab::
      :tabid: csharp

      .. literalinclude:: /includes/generated/in-use-encryption/csfle/dotnet/local/reader/CSFLE/InsertEncryptedDocument.cs
          :start-after: start-insert
          :end-before: end-insert
          :language: csharp
          :dedent:

   .. tab::
      :tabid: go

      .. literalinclude:: /includes/generated/in-use-encryption/csfle/go/local/reader/insert-encrypted-document.go
          :start-after: start-insert
          :end-before: end-insert
          :language: go
          :dedent:

      .. note::

         Rather than creating a raw BSON document, you can pass a struct with ``bson`` tags directly
         to the driver for encoding.

When you insert a document, your {+csfle-abbrev+}-enabled client
encrypts the fields of your document such that it resembles the following:

.. literalinclude:: /includes/quick-start/inserted-doc-enc.json
   :language: json
   :copyable: false
