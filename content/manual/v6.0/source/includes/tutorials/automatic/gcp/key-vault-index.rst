Create a unique index on the ``keyAltNames`` field in your
``encryption.__keyVault`` collection.

.. include:: /includes/queryable-encryption/tab-note.rst

.. tabs-drivers::

   .. tab::
      :tabid: nodejs

      .. literalinclude::  /includes/generated/in-use-encryption/csfle/node/gcp/reader/make_data_key.js
         :start-after: start-create-index
         :end-before: end-create-index
         :caption: make_data_key.js
         :language: javascript
         :dedent:

   .. tab::
      :tabid: python

      .. literalinclude::  /includes/generated/in-use-encryption/csfle/python/gcp/reader/make_data_key.py
         :start-after: start-create-index
         :end-before: end-create-index
         :language: python
         :dedent:
         :caption: make_data_key.py

   .. tab::
      :tabid: java-sync

      .. literalinclude:: /includes/generated/in-use-encryption/csfle/java/gcp/reader/src/main/java/com/mongodb/csfle/MakeDataKey.java
         :start-after: start-create-index
         :end-before: end-create-index
         :language: java
         :dedent:
         :caption: MakeDataKey.java

   .. tab::
      :tabid: go

      .. literalinclude:: /includes/generated/in-use-encryption/csfle/go/gcp/reader/make-data-key.go
         :start-after: start-create-index
         :end-before: end-create-index
         :language: go
         :dedent:
         :caption: insert-encrypted-document.go

   .. tab::
      :tabid: csharp

      .. literalinclude:: /includes/generated/in-use-encryption/csfle/dotnet/gcp/reader/CSFLE/MakeDataKey.cs
         :start-after: start-create-index
         :end-before: end-create-index
         :language: csharp
         :caption: MakeDataKey.cs
         :dedent:
