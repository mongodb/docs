.. _qe-aws-insert:

Use your {+qe+} enabled
``MongoClient`` instance to insert an encrypted document into the
``medicalRecords.patients`` namespace using the following code
snippet:

.. tabs-drivers::

   .. tab::
      :tabid: nodejs

      .. literalinclude:: /includes/queryable-encryption/sample_apps/build/node-fle-2/aws/reader/insert_encrypted_document.js
         :start-after: start-insert
         :end-before: end-insert
         :language: javascript
         :caption: insert_encrypted_document.js
         :dedent:

   .. tab::
      :tabid: python

      .. literalinclude:: /includes/queryable-encryption/sample_apps/build/python-fle-2/aws/reader/insert_encrypted_document.py
         :start-after: start-insert
         :end-before: end-insert
         :language: python
         :caption: insert_encrypted_document.py
         :dedent:

When you insert a document, your {+qe+} enabled client
encrypts the fields of your document such that it resembles the following:

.. literalinclude:: /includes/queryable-encryption/quick-start/inserted-doc-enc.json
   :language: json
   :copyable: false

.. include:: /includes/queryable-encryption/safe-content-warning.rst
