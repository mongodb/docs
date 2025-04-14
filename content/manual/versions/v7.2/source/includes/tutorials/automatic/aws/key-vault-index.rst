Create a unique index on the ``keyAltNames`` field in your
``encryption.__keyVault`` namespace.

.. include:: /includes/queryable-encryption/tab-note.rst

.. tabs-drivers::

   .. tab::
      :tabid: nodejs

      .. literalinclude::  /includes/generated/in-use-encryption/csfle/node/aws/reader/make_data_key.js
         :start-after: start-create-index
         :end-before: end-create-index
         :language: javascript
         :dedent:

   .. tab::
      :tabid: python

      .. literalinclude::  /includes/generated/in-use-encryption/csfle/python/aws/reader/make_data_key.py
         :start-after: start-create-index
         :end-before: end-create-index
         :language: python
         :dedent:

   .. tab::
      :tabid: java-sync

      .. literalinclude:: /includes/generated/in-use-encryption/csfle/java/aws/reader/src/main/java/com/mongodb/csfle/MakeDataKey.java
         :start-after: start-create-index
         :end-before: end-create-index
         :language: java
         :dedent:

   .. tab::
      :tabid: go

      .. literalinclude:: /includes/generated/in-use-encryption/csfle/go/aws/reader/make-data-key.go
         :start-after: start-create-index
         :end-before: end-create-index
         :language: go
         :dedent:

   .. tab::
      :tabid: csharp

      .. literalinclude:: /includes/generated/in-use-encryption/csfle/dotnet/aws/reader/CSFLE/MakeDataKey.cs
         :start-after: start-create-index
         :end-before: end-create-index
         :language: csharp
         :dedent:
