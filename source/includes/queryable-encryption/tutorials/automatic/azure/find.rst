Retrieve the encrypted document you inserted in the
:ref:`Insert a Document with Encrypted Fields <qe-azure-insert>`
step of this guide.

To show the functionality of {+qe+}, the following code snippet queries for
your document with a client configured for automatic {+qe+} as well as
a client that is not configured for automatic {+qe+}.

.. tabs-drivers::

   .. tab::
      :tabid: nodejs

      .. literalinclude:: /includes/sample_apps/csfle/build/node-fle-2/azure/reader/insert_encrypted_document.js
         :start-after: start-find
         :end-before: end-find
         :caption: insert_encrypted_document.js
         :language: javascript
         :dedent:

   .. tab::
      :tabid: python

      .. literalinclude:: /includes/sample_apps/csfle/build/python-fle-2/azure/reader/insert_encrypted_document.py
         :start-after: start-find
         :end-before: end-find
         :language: python
         :caption: insert_encrypted_document.py
         :dedent:

   .. tab::
      :tabid: java-sync

      .. literalinclude:: /includes/sample_apps/csfle/build/java-fle-2/azure/reader/src/main/java/com/mongodb/csfle/insertEncryptedDocument.java
         :start-after: start-find
         :end-before: end-find
         :language: java
         :dedent:
         :caption: insertEncryptedDocument.java

The output of the preceding code snippet should look like this:

.. literalinclude:: /includes/queryable-encryption/quick-start/find-output.out
   :language: text
