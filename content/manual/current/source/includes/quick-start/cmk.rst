.. _csfle-quick-start-create-master-key:
.. _fle-create-a-master-key:

You must create a {+cmk-long+} ({+cmk-abbr+}) to perform {+csfle-abbrev+}.

Create a 96-byte {+cmk-long+} and save it in your **Local Key Provider**,
which is your filesystem,
as the file ``master-key.txt``:

.. tabs-drivers::

   .. tab::
      :tabid: shell

      .. literalinclude:: /includes/generated/in-use-encryption/csfle/node/local/reader/make_data_key.js
         :start-after: start-local-cmk
         :end-before: end-local-cmk
         :language: javascript
         :dedent:

   .. tab::
      :tabid: python

      .. literalinclude:: /includes/generated/in-use-encryption/csfle/python/local/reader/make_data_key.py
         :start-after: start-local-cmk
         :end-before: end-local-cmk
         :language: python
         :dedent:

   .. tab::
      :tabid: java-sync

      .. literalinclude:: /includes/generated/in-use-encryption/csfle/java/local/reader/src/main/java/com/mongodb/csfle/MakeDataKey.java
         :start-after: start-local-cmk
         :end-before: end-local-cmk
         :language: java
         :dedent:

   .. tab::
      :tabid: go

      .. literalinclude:: /includes/generated/in-use-encryption/csfle/go/local/reader/make-data-key.go
         :start-after: start-local-cmk
         :end-before: end-local-cmk
         :language: go
         :dedent:

   .. tab::
      :tabid: csharp

      .. literalinclude:: /includes/generated/in-use-encryption/csfle/dotnet/local/reader/CSFLE/MakeDataKey.cs
         :start-after: start-local-cmk
         :end-before: end-local-cmk
         :language: csharp
         :dedent:

.. include:: /includes/queryable-encryption/qe-warning-local-keys.rst

.. include:: /includes/in-use-encryption/cmk-bash.rst
