Retrieve the encrypted document you inserted in the
:ref:`Insert a Document with Encrypted Fields <csfle-azure-insert>`
step of this guide.

To show the functionality of {+csfle-abbrev+}, the following code snippet queries for
your document with a client configured for automatic {+csfle-abbrev+} as well as
a client that is not configured for automatic {+csfle-abbrev+}.

.. tabs-drivers::

   .. tab::
      :tabid: java-sync

      .. literalinclude:: /includes/sample_apps/csfle/build/java/azure/reader/src/main/java/com/mongodb/csfle/insertEncryptedDocument.java
         :start-after: start-find
         :end-before: end-find
         :language: java
         :dedent:
         :caption: insertEncryptedDocument.java

   .. tab::
      :tabid: nodejs

      .. literalinclude:: /includes/sample_apps/csfle/build/node/azure/reader/insert_encrypted_document.js
         :start-after: start-find
         :end-before: end-find
         :language: javascript
         :dedent:
         :caption: insert_encrypted_document.js

   .. tab::
      :tabid: python

      .. literalinclude:: /includes/sample_apps/csfle/build/python/azure/reader/insert_encrypted_document.py
         :start-after: start-find
         :end-before: end-find
         :language: python
         :dedent:
         :caption: insert_encrypted_document.py

   .. tab::
      :tabid: csharp

      .. literalinclude:: /includes/sample_apps/csfle/build/dotnet/azure/reader/CSFLE/InsertEncryptedDocument.cs
         :start-after: start-find
         :end-before: end-find
         :language: csharp
         :dedent:
         :caption: InsertEncryptedDocument.cs

   .. tab::
      :tabid: go

      .. literalinclude:: /includes/sample_apps/csfle/build/go/azure/reader/insert-encrypted-document.go
         :start-after: start-find
         :end-before: end-find
         :language: go
         :dedent:
         :caption: insert-encrypted-document.go

The output of the preceding code snippet should look like this:

.. literalinclude:: /includes/quick-start/find-output.out
   :language: json
