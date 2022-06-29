Create a unique index on the ``keyAltNames`` field in your
``encryption.__keyVault`` collection.

.. include:: /includes/queryable-encryption/tab-note.rst

.. tabs-drivers::

   .. tab::
      :tabid: nodejs

      .. literalinclude::  /includes/sample_apps/csfle/build/node/local/reader/make_data_key.js
         :start-after: start-create-index
         :end-before: end-create-index
         :caption: make_data_key.js
         :language: javascript
         :dedent:

   .. tab::
      :tabid: python

      .. literalinclude::  /includes/sample_apps/csfle/build/python/local/reader/make_data_key.py
         :start-after: start-create-index
         :end-before: end-create-index
         :language: python
         :dedent:
         :caption: make_data_key.py

   .. tab::
      :tabid: java-sync

      .. literalinclude:: /includes/sample_apps/csfle/build/java/local/reader/src/main/java/com/mongodb/csfle/makeDataKey.java
         :start-after: start-create-index
         :end-before: end-create-index
         :language: java
         :dedent:
         :caption: makeDataKey.java

   .. tab::
      :tabid: go

      .. literalinclude:: /includes/sample_apps/csfle/build/go/local/reader/make-data-key.go
         :start-after: start-create-index
         :end-before: end-create-index
         :language: go
         :dedent:
         :caption: insert-encrypted-document.go

   .. tab::
      :tabid: csharp

      .. literalinclude:: /includes/sample_apps/csfle/build/dotnet/local/reader/CSFLE/MakeDataKey.cs
         :start-after: start-create-index
         :end-before: end-create-index
         :language: csharp
         :caption: MakeDataKey.cs
         :dedent:
