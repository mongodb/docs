Retrieve the encrypted document you inserted in the
:ref:`Insert a Document with Encrypted Fields <qe-gcp-insert>`
step of this guide.

To show the functionality of {+qe+}, the following code snippet queries for
your document with a client configured for automatic {+qe+} as well as
a client that is not configured for automatic {+qe+}.

.. tabs-drivers::

   .. tab::
      :tabid: nodejs

      .. literalinclude:: /includes/sample_apps/csfle/build/node-fle-2/gcp/reader/insert_encrypted_document.js
         :start-after: start-find
         :end-before: end-find
         :caption: insert_encrypted_document.js
         :language: javascript
         :dedent:

   .. tab::
      :tabid: python

      .. literalinclude:: /includes/sample_apps/csfle/build/python-fle-2/gcp/reader/insert_encrypted_document.py
         :start-after: start-find
         :end-before: end-find
         :language: python
         :dedent:
         :caption: insert_encrypted_document.py

   .. tab::
      :tabid: java-sync

      .. literalinclude:: /includes/sample_apps/csfle/build/java-fle-2/gcp/reader/src/main/java/com/mongodb/csfle/insertEncryptedDocument.java
         :start-after: start-find
         :end-before: end-find
         :language: java
         :dedent:
         :caption: insertEncryptedDocument.java

   .. tab::
      :tabid: go

      .. literalinclude:: /includes/sample_apps/csfle/build/go-fle-2/gcp/reader/insert-encrypted-document.go
         :start-after: start-find
         :end-before: end-find
         :language: go
         :dedent:
         :caption: insert-encrypted-document.go

   .. tab::
      :tabid: csharp

      .. literalinclude:: /includes/sample_apps/csfle/build/dotnet-fle-2/gcp/reader/CSFLE/InsertEncryptedDocument.cs
         :start-after: start-find
         :end-before: end-find
         :language: csharp
         :dedent:
         :caption: InsertEncryptedDocument.cs

The output of the preceding code snippet should look like this:

.. literalinclude:: /includes/queryable-encryption/quick-start/find-output.out
   :language: text
