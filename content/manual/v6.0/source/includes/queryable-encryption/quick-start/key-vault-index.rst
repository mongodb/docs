Create a unique index on the ``keyAltNames`` field in your
``encryption.__keyVault`` collection.

.. include:: /includes/queryable-encryption/tab-note.rst

.. tabs-drivers::

   .. tab::
      :tabid: shell

      .. literalinclude::  /includes/generated/in-use-encryption/queryable-encryption/mongosh/local/reader/make_data_key.js
         :start-after: start-create-index
         :end-before: end-create-index
         :caption: make_data_key.js
         :language: javascript
         :dedent:

   .. tab::
      :tabid: nodejs

      .. literalinclude::  /includes/generated/in-use-encryption/queryable-encryption/node/local/reader/make_data_key.js
         :start-after: start-create-index
         :end-before: end-create-index
         :caption: make_data_key.js
         :language: javascript
         :dedent:

   .. tab::
      :tabid: python

      .. literalinclude::  /includes/generated/in-use-encryption/queryable-encryption/python/local/reader/make_data_key.py
         :start-after: start-create-index
         :end-before: end-create-index
         :language: python
         :dedent:
         :caption: make_data_key.py

   .. tab::
      :tabid: java-sync

      .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/java/local/reader/src/main/java/com/mongodb/qe/MakeDataKey.java
         :start-after: start-create-index
         :end-before: end-create-index
         :language: java
         :dedent:
         :caption: MakeDataKey.java

   .. tab::
      :tabid: go

      .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/go/local/reader/make-data-key.go
         :start-after: start-create-index
         :end-before: end-create-index
         :language: go
         :dedent:
         :caption: insert-encrypted-document.go

   .. tab::
      :tabid: csharp

      .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/dotnet/local/reader/QueryableEncryption/MakeDataKey.cs
         :start-after: start-create-index
         :end-before: end-create-index
         :language: csharp
         :dedent:
         :caption: MakeDataKey.cs