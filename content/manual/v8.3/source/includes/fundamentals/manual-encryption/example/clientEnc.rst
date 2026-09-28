The following code snippets show how to create a ``ClientEncryption``
instance:

.. tabs-drivers::

   .. tab::
     :tabid: java-sync

     .. literalinclude:: /includes/fundamentals/manual-encryption/manual-enc.java
        :language: java
        :dedent:
        :start-after: start_client_enc
        :end-before: end_client_enc

   .. tab::
     :tabid: nodejs

     .. literalinclude:: /includes/fundamentals/manual-encryption/manual-enc.js
        :language: javascript
        :dedent:
        :start-after: start_client_enc
        :end-before: end_client_enc

   .. tab::
     :tabid: python

     .. literalinclude:: /includes/fundamentals/manual-encryption/manual-enc.py
        :language: python
        :dedent:
        :start-after: start_client_enc
        :end-before: end_client_enc
      
     .. note:: CodecOptions

        The MongoDB Python driver requires that you specify the
        ``CodecOptions`` with which you would like to encrypt and
        decrypt your documents.

        Specify the ``CodecOptions`` you have configured on the
        ``MongoClient``, ``Database``, or ``Collection`` with which
        you are writing encrypted and decrypted application data to MongoDB.

   .. tab::
     :tabid: csharp

     .. literalinclude:: /includes/fundamentals/manual-encryption/manual-enc.cs
        :dedent:
        :language: csharp
        :start-after: start_client_enc
        :end-before: end_client_enc

   .. tab::
     :tabid: go

     .. literalinclude:: /includes/fundamentals/manual-encryption/manual-enc.go
        :dedent:
        :language: go
        :start-after: start_client_enc
        :end-before: end_client_enc

   .. tab::
      :tabid: shell

      .. literalinclude:: /includes/fundamentals/manual-encryption/manual-enc-shell.js
         :language: javascript
         :start-after: start_client_enc
         :end-before: end_client_enc