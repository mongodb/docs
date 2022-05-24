You want to encrypt the fields of your document using the
following algorithms:

.. include:: /includes/fundamentals/manual-encryption/sample-table.rst

The following code snippets show how to manually encrypt the fields in
your document and insert your document into MongoDB:

.. tabs-drivers::

   .. tab::
     :tabid: java-sync

     .. literalinclude:: /includes/fundamentals/manual-encryption/manual-enc.java
        :language: java
        :start-after: start_enc_and_insert
        :end-before: end_enc_and_insert

   .. tab::
     :tabid: nodejs

     .. literalinclude:: /includes/fundamentals/manual-encryption/manual-enc.js
        :language: javascript
        :start-after: start_enc_and_insert
        :end-before: end_enc_and_insert

   .. tab::
     :tabid: python

     .. literalinclude:: /includes/fundamentals/manual-encryption/manual-enc.py
        :language: python
        :start-after: start_enc_and_insert
        :end-before: end_enc_and_insert

   .. tab::
     :tabid: csharp

     .. literalinclude:: /includes/fundamentals/manual-encryption/manual-enc.cs
        :dedent:
        :language: csharp
        :start-after: start_enc_and_insert
        :end-before: end_enc_and_insert

   .. tab::
     :tabid: go

     .. literalinclude:: /includes/fundamentals/manual-encryption/manual-enc.go
        :dedent:
        :language: go
        :start-after: start_enc_and_insert
        :end-before: end_enc_and_insert

   .. tab::
      :tabid: shell

      .. literalinclude:: /includes/fundamentals/manual-encryption/manual-enc-shell.js
         :language: javascript
         :start-after: start_enc_and_insert
         :end-before: end_enc_and_insert
