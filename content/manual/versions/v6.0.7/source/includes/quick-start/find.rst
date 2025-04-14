Retrieve the encrypted document you inserted in the
:ref:`Insert a Document with Encrypted Fields <csfle-quick-start-insert>`
step of this guide.

To show the functionality of {+csfle-abbrev+}, the following code snippet queries for
your document with a client configured for automatic {+csfle-abbrev+} as well as
a client that is not configured for automatic {+csfle-abbrev+}.

.. tabs-drivers::

   .. tab::
      :tabid: java-sync

      .. literalinclude:: /includes/generated/in-use-encryption/csfle/java/local/reader/src/main/java/com/mongodb/csfle/InsertEncryptedDocument.java
         :start-after: start-find
         :end-before: end-find
         :language: java
         :dedent:
         :caption: InsertEncryptedDocument.java

   .. tab::
      :tabid: nodejs

      .. literalinclude:: /includes/generated/in-use-encryption/csfle/node/local/reader/insert_encrypted_document.js
         :start-after: start-find
         :end-before: end-find
         :language: javascript
         :dedent:
         :caption: insert_encrypted_document.js

   .. tab::
      :tabid: python

      .. literalinclude:: /includes/generated/in-use-encryption/csfle/python/local/reader/insert_encrypted_document.py
         :start-after: start-find
         :end-before: end-find
         :language: python
         :dedent:
         :caption: insert_encrypted_document.py

   .. tab::
      :tabid: csharp

      .. literalinclude:: /includes/generated/in-use-encryption/csfle/dotnet/local/reader/CSFLE/InsertEncryptedDocument.cs
         :start-after: start-find
         :end-before: end-find
         :language: csharp
         :dedent:
         :caption: InsertEncryptedDocument.cs

   .. tab::
      :tabid: go

      .. literalinclude:: /includes/generated/in-use-encryption/csfle/go/local/reader/insert-encrypted-document.go
         :start-after: start-find
         :end-before: end-find
         :language: go
         :dedent:
         :caption: insert-encrypted-document.go

The output of the preceding code snippet should look like this:

.. literalinclude:: /includes/quick-start/find-output.out
   :language: json
