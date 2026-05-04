.. important::

   When building or running the Golang code in this guide using 
   ``go build`` or ``go run``, always include the ``cse`` build 
   constraint to enable {+csfle-abbrev+}. See the following shell
   command for an example of including the build constraint:

   .. code-block:: bash 

      go run -tags cse insert-encrypted-document.go

.. procedure::
   :style: normal

   .. step:: Configure your {+kmip-kms-no-hover+}

      .. include:: /includes/tutorials/automatic/kmip/configure.rst

   .. step:: Specify your Certificates

      .. literalinclude:: /includes/generated/in-use-encryption/csfle/go/kmip/reader/make-data-key.go
         :start-after: start-create-tls
         :end-before: end-create-tls
         :language: go
         :dedent:

      .. important::
      
         You must use certificates with `ECDSA keys <https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm>`__ 
         when using the Go driver.
            
Create the Application
~~~~~~~~~~~~~~~~~~~~~~

.. procedure::
   :style: normal

   .. step:: Create a Unique Index on Your Key Vault Collection

      Create a unique index on the ``keyAltNames`` field in your
      ``encryption.__keyVault`` namespace.

      .. include:: /includes/queryable-encryption/tab-note.rst

      .. literalinclude:: /includes/generated/in-use-encryption/csfle/go/kmip/reader/make-data-key.go
         :start-after: start-create-index
         :end-before: end-create-index
         :language: go
         :dedent:

   .. step:: Create a {+dek-long+}

      a. Add your Endpoint

         Specify the URI endpoint of your {+kmip-kms+}:

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/go/kmip/reader/make-data-key.go
            :start-after: start-kmsproviders
            :end-before: end-kmsproviders
            :language: go
            :dedent:

      #. Add Your Key Information

         The following code prompts your {+kmip-kms+} to automatically generate
         a {+cmk-long+}:

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/go/kmip/reader/make-data-key.go
            :start-after: start-datakeyopts
            :end-before: end-datakeyopts
            :language: go
            :dedent:

      #. Generate your {+dek-long+}

         Generate your {+dek-long+} using the variables declared in :ref:`step one
         <csfle-kmip-create-index>` of this tutorial.

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/go/kmip/reader/make-data-key.go
            :start-after: start-create-dek
            :end-before: end-create-dek
            :language: go
            :dedent:

      .. see:: Complete Code

         To view the complete code for making a {+dek-long+}, see
         `our Github repository <{+sample-app-url-csfle+}/go/kmip/reader/make-data-key.go>`__.

   .. step:: Configure the MongoClient

      .. tip::

         Follow the remaining steps in this tutorial in a separate file
         from the one created in the previous steps.

         To view the complete code for this file, see
         `our Github repository <{+sample-app-url-csfle+}/go/kmip/reader/insert-encrypted-document.go>`__.

      a. Specify the {+key-vault-long-title+} Namespace

         Specify ``encryption.__keyVault`` as the {+key-vault-long+}
         namespace.

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/go/kmip/reader/insert-encrypted-document.go
            :start-after: start-key-vault
            :end-before: end-key-vault
            :language: go
            :dedent:

      #. Specify your KMIP Endpoint

         Specify ``kmip`` in your ``kmsProviders`` object and enter
         the URI endpoint of your {+kmip-kms+}:

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/go/kmip/reader/insert-encrypted-document.go
            :start-after: start-kmsproviders
            :end-before: end-kmsproviders
            :language: go
            :dedent:

      #. Create an Encryption Schema For Your Collection

         Create an encryption schema that specifies how your client
         application encrypts your documents' fields:

         .. tip:: Add Your {+dek-long+} Base64 ID

            Make sure to update the following code to include your Base64
            {+dek-abbr+} ID. You received this value in the
            :ref:`Generate your {+dek-long+} <csfle-kmip-create-dek>` step of this
            guide.

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/go/kmip/reader/insert-encrypted-document.go
            :start-after: start-schema
            :end-before: end-schema
            :language: go
            :dedent:

         .. include:: /includes/quick-start/schema/further-reading-note.rst

      #. Specify the Location of the {+shared-library+}

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/go/kmip/reader/insert-encrypted-document.go
            :start-after: start-extra-options
            :end-before: end-extra-options
            :language: go
            :dedent:

         .. include:: /includes/tutorials/csfle-shared-lib-learn-more.rst

      #. Create the MongoClient

         Instantiate a MongoDB client object with the following automatic
         encryption settings that use the variables declared in the previous
         steps:
         
         .. literalinclude:: /includes/generated/in-use-encryption/csfle/go/kmip/reader/insert-encrypted-document.go
            :start-after: start-client
            :end-before: end-client
            :language: go
            :dedent:

   .. step:: Insert a Document with Encrypted Fields

      Use your {+csfle-abbrev+}-enabled
      ``MongoClient`` instance to insert a {+in-use-doc+} into the
      ``medicalRecords.patients`` namespace using the following code
      snippet:

      .. literalinclude:: /includes/generated/in-use-encryption/csfle/go/kmip/reader/insert-encrypted-document.go
         :start-after: start-insert
         :end-before: end-insert
         :language: go
         :dedent:

      .. note::

         Rather than creating a raw BSON document, you can pass a struct with ``bson`` tags directly
         to the driver for encoding.

      When you insert a document, your {+csfle-abbrev+}-enabled client
      encrypts the fields of your document such that it resembles the following:

      .. literalinclude:: /includes/quick-start/inserted-doc-enc.json
         :language: json
         :copyable: false

      .. see:: Complete Code

         To view the complete code for inserting a {+in-use-doc+}, see
         `our Github repository
         <{+sample-app-url-csfle+}/go/kmip/reader/insert-encrypted-document.go>`__.

   .. step:: Retrieve Your {+in-use-doc-title+}

      Retrieve the {+in-use-doc+} you inserted in the
      :ref:`Insert a Document with Encrypted Fields <csfle-kmip-insert>`
      step of this guide.

      To show the functionality of {+csfle-abbrev+}, the following code snippet queries for
      your document with a client configured for automatic {+csfle-abbrev+} as well as
      a client that is not configured for automatic {+csfle-abbrev+}.

      .. literalinclude:: /includes/generated/in-use-encryption/csfle/go/kmip/reader/insert-encrypted-document.go
         :start-after: start-find
         :end-before: end-find
         :language: go
         :dedent:

      The output of the preceding code snippet should look like this:

      .. literalinclude:: /includes/quick-start/find-output.out
         :language: json
         :copyable: false

      .. see:: Complete Code

         To view the complete code for inserting a {+in-use-doc+}, see
         `our Github repository  <{+sample-app-url-csfle+}/go/kmip/reader/insert-encrypted-document.go>`__.