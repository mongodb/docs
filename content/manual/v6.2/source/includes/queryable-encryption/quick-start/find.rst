Retrieve the {+in-use-doc+} you inserted in the
:ref:`Insert a Document with Encrypted Fields <qe-quick-start-insert>`
step of this guide.

To show the functionality of {+qe+}, the following code snippet queries for
your document with a client configured for automatic {+qe+} as well as
a client that is not configured for automatic {+qe+}.

.. tabs-drivers::

   .. tab::
      :tabid: shell

      .. literalinclude::  /includes/generated/in-use-encryption/queryable-encryption/mongosh/local/reader/insert_encrypted_document.js
         :start-after: start-find
         :end-before: end-find
         :language: javascript
         :dedent:

   .. tab::
      :tabid: nodejs

      .. literalinclude::  /includes/generated/in-use-encryption/queryable-encryption/node/local/reader/insert_encrypted_document.js
         :start-after: start-find
         :end-before: end-find
         :language: javascript
         :dedent:

   .. tab::
      :tabid: python

      .. literalinclude::  /includes/generated/in-use-encryption/queryable-encryption/python/local/reader/insert_encrypted_document.py
         :start-after: start-find
         :end-before: end-find
         :language: python
         :dedent:

   .. tab::
      :tabid: java-sync

      .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/java/local/reader/src/main/java/com/mongodb/qe/InsertEncryptedDocument.java
         :start-after: start-find
         :end-before: end-find
         :language: java
         :dedent:

   .. tab::
      :tabid: go

      .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/go/local/reader/insert-encrypted-document.go
         :start-after: start-find
         :end-before: end-find
         :language: go
         :dedent:

   .. tab::
      :tabid: csharp

      .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/dotnet/local/reader/QueryableEncryption/InsertEncryptedDocument.cs
         :start-after: start-find
         :end-before: end-find
         :language: csharp
         :dedent:

The output of the preceding code snippet should look like this:

.. literalinclude:: /includes/queryable-encryption/quick-start/find-output.out
   :language: text
   :copyable: false
