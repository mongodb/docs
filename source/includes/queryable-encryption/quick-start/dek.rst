.. procedure::
   :style: connected

   .. step:: Read the {+cmk-long+} and Specify KMS Provider Settings

      .. _qe-field-level-encryption-data-key-create:

      Retrieve the contents of the {+cmk-long+} file that you generated
      in the :ref:`Create a {+cmk-long+} <qe-quick-start-create-master-key>` step of this guide.

      Pass the {+cmk-abbr+} value to your KMS provider settings. The
      client uses these settings to discover the {+cmk-abbr+}. As
      you are using the Local Key Provider, set the provider name to
      ``local``.

      .. include:: /includes/queryable-encryption/tab-note.rst

      .. tabs-drivers::

         .. tab::
            :tabid: nodejs

            .. literalinclude::  /includes/sample_apps/csfle/build/node-fle-2/local/reader/make_data_key.js
               :start-after: start-kmsproviders
               :end-before: end-kmsproviders
               :caption: make_data_key.js
               :language: javascript
               :dedent:

         .. tab::
            :tabid: python

            .. literalinclude::  /includes/sample_apps/csfle/build/python-fle-2/local/reader/make_data_key.py
               :start-after: start-kmsproviders
               :end-before: end-kmsproviders
               :language: python
               :dedent:
               :caption: make_data_key.py

         .. tab::
            :tabid: java-sync

            .. literalinclude:: /includes/sample_apps/csfle/build/java-fle-2/local/reader/src/main/java/com/mongodb/csfle/makeDataKey.java
               :start-after: start-kmsproviders
               :end-before: end-kmsproviders
               :language: java
               :dedent:
               :caption: makeDataKey.java

         .. tab::
            :tabid: go

            .. literalinclude:: /includes/sample_apps/csfle/build/go-fle-2/local/reader/make-data-key.go
               :start-after: start-kmsproviders
               :end-before: end-kmsproviders
               :language: go
               :dedent:
               :caption: insert-encrypted-document.go

   .. step:: Create your {+dek-long+}s

      .. _qe-local-create-dek:

      Construct a client with your MongoDB connection string and {+key-vault-long+}
      namespace, and create the {+dek-long+}s:

      .. note:: {+key-vault-long-title+} Namespace Permissions

         The {+key-vault-long+} in this guide is the ``__keyVault``
         collection in the ``encryption`` database.
         Ensure that the database user your application uses to connect
         to MongoDB has `ReadWrite
         <https://www.mongodb.com/docs/manual/reference/built-in-roles/#readWrite>`_
         permissions on the ``encryption.__keyVault`` namespace.

      .. tabs-drivers::

         .. tab::
            :tabid: nodejs

            .. literalinclude::  /includes/sample_apps/csfle/build/node-fle-2/local/reader/make_data_key.js
               :start-after: start-create-dek
               :end-before: end-create-dek
               :language: javascript
               :dedent:
               :caption: make_data_key.js

         .. tab::
            :tabid: python

            .. literalinclude::  /includes/sample_apps/csfle/build/python-fle-2/local/reader/make_data_key.py
               :start-after: start-create-dek
               :end-before: end-create-dek
               :language: python
               :dedent:
               :caption: make_data_key.py

         .. tab::
            :tabid: java-sync

            .. literalinclude:: /includes/sample_apps/csfle/build/java-fle-2/local/reader/src/main/java/com/mongodb/csfle/makeDataKey.java
               :start-after: start-create-dek
               :end-before: end-create-dek
               :language: java
               :dedent:
               :caption: makeDataKey.java

         .. tab::
            :tabid: go

            .. literalinclude:: /includes/sample_apps/csfle/build/go-fle-2/local/reader/make-data-key.go
               :start-after: start-create-dek
               :end-before: end-create-dek
               :language: go
               :dedent:
               :caption: insert-encrypted-document.go

   .. step:: Create Your Encrypted Collection

      Use a {+qe+} enabled ``MongoClient`` instance to specify what
      fields you must encrypt and create your encrypted collection:

      .. tabs-drivers::

         .. tab::
            :tabid: nodejs

            .. literalinclude::  /includes/sample_apps/csfle/build/node-fle-2/local/reader/make_data_key.js
               :start-after: start-create-enc-collection
               :end-before: end-create-enc-collection
               :language: javascript
               :dedent:
               :caption: make_data_key.js

         .. tab::
            :tabid: python

            .. literalinclude::  /includes/sample_apps/csfle/build/python-fle-2/local/reader/make_data_key.py
               :start-after: start-create-enc-collection
               :end-before: end-create-enc-collection
               :language: python
               :dedent:
               :caption: make_data_key.py

         .. tab::
            :tabid: java-sync

            .. literalinclude:: /includes/sample_apps/csfle/build/java-fle-2/local/reader/src/main/java/com/mongodb/csfle/makeDataKey.java
               :start-after: start-create-enc-collection
               :end-before: end-create-enc-collection
               :language: java
               :dedent:
               :caption: makeDataKey.java

         .. tab::
            :tabid: go

            .. literalinclude:: /includes/sample_apps/csfle/build/go-fle-2/local/reader/make-data-key.go
               :start-after: start-create-enc-collection
               :end-before: end-create-enc-collection
               :language: go
               :dedent:
               :caption: insert-encrypted-document.go

The output from the code in this section should resemble the following:

.. literalinclude:: /includes/queryable-encryption/quick-start/dek-output.out
   :language: text
