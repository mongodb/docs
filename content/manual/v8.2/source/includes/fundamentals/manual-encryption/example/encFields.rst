You want to encrypt the fields of your document using the
following algorithms:

.. include:: /includes/fundamentals/manual-encryption/sample-table.rst

The following code snippets show how to manually encrypt the fields in
your document and insert your document into MongoDB:

.. tabs-drivers::

   .. tab::
     :tabid: java-sync

     .. include:: /includes/fundamentals/manual-encryption/example/dek-note.rst

     .. literalinclude:: /includes/fundamentals/manual-encryption/manual-enc.java
        :language: java
        :dedent:
        :start-after: start_enc_and_insert
        :end-before: end_enc_and_insert

   .. tab::
     :tabid: nodejs

     .. include:: /includes/fundamentals/manual-encryption/example/dek-note.rst

     .. literalinclude:: /includes/fundamentals/manual-encryption/manual-enc.js
        :language: javascript
        :dedent:
        :start-after: start_enc_and_insert
        :end-before: end_enc_and_insert

   .. tab::
     :tabid: python

     .. include:: /includes/fundamentals/manual-encryption/example/dek-note-python.rst

     .. literalinclude:: /includes/fundamentals/manual-encryption/manual-enc.py
        :language: python
        :dedent:
        :start-after: start_enc_and_insert
        :end-before: end_enc_and_insert

   .. tab::
     :tabid: csharp

     .. include:: /includes/fundamentals/manual-encryption/example/dek-note.rst

     .. literalinclude:: /includes/fundamentals/manual-encryption/manual-enc.cs
        :dedent:
        :language: csharp
        :start-after: start_enc_and_insert
        :end-before: end_enc_and_insert

   .. tab::
     :tabid: go

     .. include:: /includes/fundamentals/manual-encryption/example/dek-note.rst

     .. literalinclude:: /includes/fundamentals/manual-encryption/manual-enc.go
        :dedent:
        :language: go
        :start-after: start_enc_and_insert
        :end-before: end_enc_and_insert

   .. tab::
      :tabid: shell

      .. include:: /includes/fundamentals/manual-encryption/example/dek-note.rst

      .. literalinclude:: /includes/fundamentals/manual-encryption/manual-enc-shell.js
         :language: javascript
         :start-after: start_enc_and_insert
         :end-before: end_enc_and_insert
