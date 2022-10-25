.. _qe-manual-enc-create-master-key:

You must create a {+cmk-long+} ({+cmk-abbr+}) to perform {+qe+}.

Create a 96-byte {+cmk-long+} and save it to the
file ``master-key.txt``:

.. tabs-drivers::

   .. tab::
      :tabid: nodejs

      .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/node/exp/reader/make_data_key.js
         :start-after: start-local-cmk
         :end-before: end-local-cmk
         :language: javascript
         :caption: make_data_key.js
         :dedent:

   .. tab::
      :tabid: python

      .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/python/exp/reader/make_data_key.py
         :start-after: start-local-cmk
         :end-before: end-local-cmk
         :language: python
         :caption: make_data_key.py
         :dedent:

   .. tab::
      :tabid: java-sync

      .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/java/exp/reader/src/main/java/com/mongodb/qe/MakeDataKey.java
         :start-after: start-local-cmk
         :end-before: end-local-cmk
         :language: java
         :dedent:
         :caption: MakeDataKey.java

   .. tab::
      :tabid: go

      .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/go/exp/reader/make-data-key.go
         :start-after: start-local-cmk
         :end-before: end-local-cmk
         :language: go
         :caption: make-data-key.go
         :dedent:

   .. tab::
      :tabid: csharp

      .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/dotnet/exp/reader/QueryableEncryption/MakeDataKey.cs
         :start-after: start-local-cmk
         :end-before: end-local-cmk
         :language: csharp
         :dedent:
         :caption: MakeDataKey.cs

.. include:: /includes/queryable-encryption/qe-warning-local-keys.rst

.. include:: /includes/in-use-encryption/cmk-bash.rst
