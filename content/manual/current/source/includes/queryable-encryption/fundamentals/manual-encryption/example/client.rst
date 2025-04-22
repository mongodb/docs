In this example, you use the same ``MongoClient`` instance to access your
{+key-vault-long+} and to read and write encrypted data.

The following code snippets show how to create a ``MongoClient`` instance:

.. tabs-drivers::

   .. tab::
     :tabid: java-sync

     .. literalinclude:: /includes/queryable-encryption/fundamentals/manual-encryption/manual-enc.java
        :language: java
        :dedent:
        :start-after: start_mongoclient
        :end-before: end_mongoclient

   .. tab::
     :tabid: nodejs

     .. literalinclude:: /includes/queryable-encryption/fundamentals/manual-encryption/manual-enc.js
        :language: javascript
        :start-after: start_mongoclient
        :end-before: end_mongoclient

   .. tab::
     :tabid: python

     .. literalinclude:: /includes/queryable-encryption/fundamentals/manual-encryption/manual-enc.py
        :language: python
        :start-after: start_mongoclient
        :end-before: end_mongoclient

   .. tab::
     :tabid: csharp

     .. literalinclude:: /includes/queryable-encryption/fundamentals/manual-encryption/manual-enc.cs
        :language: csharp
        :dedent:
        :start-after: start_mongoclient
        :end-before: end_mongoclient

   .. tab::
     :tabid: go

     .. literalinclude:: /includes/queryable-encryption/fundamentals/manual-encryption/manual-enc.go
        :language: go
        :dedent:
        :start-after: start_mongoclient
        :end-before: end_mongoclient

   .. tab::
      :tabid: shell

      .. literalinclude:: /includes/queryable-encryption/fundamentals/manual-encryption/manual-enc-shell.js
         :language: javascript
         :start-after: start_mongoclient
         :end-before: end_mongoclient
