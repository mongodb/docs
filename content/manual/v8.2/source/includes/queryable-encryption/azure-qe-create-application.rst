.. selected-content::
   :selections: azure, shell

   Full Application Code
   ~~~~~~~~~~~~~~~~~~~~~

   To see the complete code for the sample application, select your programming
   language in the language selector.

   `Complete mongosh Application <{+sample-app-url-qe+}/mongosh/>`__

   Each sample application repository includes a ``README.md``
   file that you can use to learn how to set up your environment and run
   the application.

   .. procedure::
      :style: normal

      .. step:: Assign application variables

         .. include:: /includes/queryable-encryption/tutorials/assign-app-variables-shell.rst

         You can declare these variables by using the following code:

         .. literalinclude:: /includes/qe-tutorials/mongosh/queryable-encryption-tutorial.js
            :start-after: start-setup-application-variables
            :end-before: end-setup-application-variables
            :language: javascript
            :dedent:

         .. important:: {+key-vault-long-title+} Namespace Permissions

            The {+key-vault-long+} is in the ``encryption.__keyVault``
            namespace. Ensure that the database user your application uses to connect
            to MongoDB has :ref:`ReadWrite <manual-reference-role-read-write>`
            permissions on this namespace.

         .. tip:: Environment Variables

            The sample code in this tutorial references environment variables that
            you need to set. Alternatively, you can replace the values directly in
            the code.

            To learn how you can setup these environment variables, see the
            `README.md <{+sample-app-url-qe+}/node/README.md>`__ file
            included in the sample application on GitHub.

      .. _qe-tutorials-automatic-encryption-azure-kms-providers:

      .. step:: Add your KMS credentials

         Create a variable containing your KMS credentials with the
         following structure. Use the {+azure-kv+} credentials you
         recorded when you :ref:`registered your application with Azure <qe-register-cmk-azure>`.

         .. literalinclude:: /includes/qe-tutorials/mongosh/queryable-encryption-helpers.js
            :start-after: start-azure-kms-credentials
            :end-before: end-azure-kms-credentials
            :language: javascript
            :dedent:

         You can also provide a custom name for your KMS provider by passing in a string
         that includes the name of the KMS provider, followed by a colon and the custom
         name. Providing a unique name for a KMS provider allows you to specify multiple
         KMS providers of the same type.

         For example, you can name your Azure KMS provider "my_azure_provider" in your KMS
         credentials variable as shown in the following code:

         .. literalinclude:: /includes/queryable-encryption/tutorials/automatic/azure/named-kms/named-kms-shell.js
            :language: javascript
            :dedent:

         :gold:`NOTE:` The remaining steps in this tutorial use
         the default KMS provider string, ``"azure"``.

      .. step:: Add your CMK credentials

         Create a variable containing your {+cmk-long+} credentials
         with the following structure. Use the CMK details you
         recorded when you :ref:`created a CMK <qe-create-cmk-azure>`.

         .. literalinclude:: /includes/qe-tutorials/mongosh/queryable-encryption-helpers.js
            :start-after: start-azure-cmk-credentials
            :end-before: end-azure-cmk-credentials
            :language: javascript
            :dedent:

      .. step:: Create an encryption client

         To create a client for encrypting and decrypting data in
         encrypted collections, instantiate a new ``MongoClient``
         using your connection URI and automatic encryption
         options.

         .. literalinclude:: /includes/qe-tutorials/mongosh/queryable-encryption-tutorial.js
            :start-after: start-create-client
            :end-before: end-create-client
            :language: javascript
            :dedent:

.. selected-content::
   :selections: azure, nodejs

   Full Application Code
   ~~~~~~~~~~~~~~~~~~~~~

   To see the complete code for the sample application, select your programming
   language in the language selector.

   `Complete Node.js Application <{+sample-app-url-qe+}/node/>`__

   Each sample application repository includes a ``README.md``
   file that you can use to learn how to set up your environment and run
   the application.

   .. procedure::
      :style: normal

      .. step:: Assign application variables

         .. include:: /includes/queryable-encryption/tutorials/assign-app-variables-nodejs.rst

         You can declare these variables by using the following code:

         .. literalinclude:: /includes/qe-tutorials/node/queryable-encryption-tutorial.js
            :start-after: start-setup-application-variables
            :end-before: end-setup-application-variables
            :language: javascript
            :dedent:

         .. important:: {+key-vault-long-title+} Namespace Permissions

            The {+key-vault-long+} is in the ``encryption.__keyVault``
            namespace. Ensure that the database user your application uses to connect
            to MongoDB has :ref:`ReadWrite <manual-reference-role-read-write>`
            permissions on this namespace.

         .. tip:: Environment Variables

            The sample code in this tutorial references environment variables that
            you need to set. Alternatively, you can replace the values directly in
            the code.

            To learn how you can setup these environment variables, see the
            `README.md <{+sample-app-url-qe+}/node/README.md>`__ file
            included in the sample application on GitHub.

      .. step:: Add your KMS credentials

         Create a variable containing your KMS credentials with the
         following structure. Use the {+azure-kv+} credentials you
         recorded when you :ref:`registered your application with Azure <qe-register-cmk-azure>`.

         .. literalinclude:: /includes/qe-tutorials/node/queryable-encryption-helpers.js
            :start-after: start-azure-kms-credentials
            :end-before: end-azure-kms-credentials
            :language: javascript
            :dedent:

         You can also provide a custom name for your KMS provider by passing in a string
         that includes the name of the KMS provider, followed by a colon and the custom
         name. Providing a unique name for a KMS provider allows you to specify multiple
         KMS providers of the same type.

         For example, you can name your Azure KMS provider "my_azure_provider" in your KMS
         credentials variable as shown in the following code:

         .. literalinclude:: /includes/queryable-encryption/tutorials/automatic/azure/named-kms/named-kms.js
            :language: javascript
            :dedent:

         :gold:`NOTE:` The remaining steps in this tutorial use
         the default KMS provider string, ``"azure"``.

      .. step:: Add your CMK credentials

         Create a variable containing your {+cmk-long+} credentials
         with the following structure. Use the CMK details you
         recorded when you :ref:`created a CMK <qe-create-cmk-azure>`.

         .. literalinclude:: /includes/qe-tutorials/node/queryable-encryption-helpers.js
            :start-after: start-azure-cmk-credentials
            :end-before: end-azure-cmk-credentials
            :language: javascript
            :dedent:

      .. step:: Create an encryption client

         To create a client for encrypting and decrypting data in
         encrypted collections, instantiate a new ``MongoClient``
         using your connection URI and automatic encryption
         options.

         .. literalinclude:: /includes/qe-tutorials/node/queryable-encryption-tutorial.js
            :start-after: start-create-client
            :end-before: end-create-client
            :language: javascript
            :dedent:

.. selected-content::
   :selections: azure, python

   Full Application Code
   ~~~~~~~~~~~~~~~~~~~~~

   To see the complete code for the sample application, select your programming
   language in the language selector.

   `Complete Python Application <{+sample-app-url-qe+}/python/>`__

   Each sample application repository includes a ``README.md``
   file that you can use to learn how to set up your environment and run
   the application.

   .. procedure::
      :style: normal

      .. step:: Assign application variables

         .. include:: /includes/queryable-encryption/tutorials/assign-app-variables-python.rst

         You can declare these variables by using the following code:

         .. literalinclude:: /includes/qe-tutorials/python/queryable_encryption_tutorial.py
            :start-after: start-setup-application-variables
            :end-before: end-setup-application-variables
            :language: python
            :dedent:

         .. important:: {+key-vault-long-title+} Namespace Permissions

            The {+key-vault-long+} is in the ``encryption.__keyVault``
            namespace. Ensure that the database user your application uses to connect
            to MongoDB has :ref:`ReadWrite <manual-reference-role-read-write>`
            permissions on this namespace.

         .. tip:: Environment Variables

            The sample code in this tutorial references environment variables that
            you need to set. Alternatively, you can replace the values directly in
            the code.

            To learn how you can setup these environment variables, see the
            `README.md <{+sample-app-url-qe+}/python/README.md>`__ file
            included in the sample application on GitHub.

      .. step:: Add your KMS credentials

         Create a variable containing your KMS credentials with the
         following structure. Use the {+azure-kv+} credentials you
         recorded when you :ref:`registered your application with Azure <qe-register-cmk-azure>`.

         .. literalinclude:: /includes/qe-tutorials/python/queryable_encryption_helpers.py
            :start-after: start-azure-kms-credentials
            :end-before: end-azure-kms-credentials
            :language: python
            :dedent:

         You can also provide a custom name for your KMS provider by passing in a string
         that includes the name of the KMS provider, followed by a colon and the custom
         name. Providing a unique name for a KMS provider allows you to specify multiple
         KMS providers of the same type.

         For example, you can name your Azure KMS provider "my_azure_provider" in your KMS
         credentials variable as shown in the following code:

         .. literalinclude:: /includes/queryable-encryption/tutorials/automatic/azure/named-kms/named-kms.py
            :language: python
            :dedent:

         :gold:`NOTE:` The remaining steps in this tutorial use
         the default KMS provider string, ``"azure"``.

      .. step:: Add your CMK credentials

         Create a variable containing your {+cmk-long+} credentials
         with the following structure. Use the CMK details you
         recorded when you :ref:`created a CMK <qe-create-cmk-azure>`.

         .. literalinclude:: /includes/qe-tutorials/python/queryable_encryption_helpers.py
            :start-after: start-azure-cmk-credentials
            :end-before: end-azure-cmk-credentials
            :language: python
            :dedent:

      .. step:: Create an encryption client

         To create a client for encrypting and decrypting data in
         encrypted collections, instantiate a new ``MongoClient``
         using your connection URI and automatic encryption
         options.

         .. literalinclude:: /includes/qe-tutorials/python/queryable_encryption_tutorial.py
            :start-after: start-create-client
            :end-before: end-create-client
            :language: python
            :dedent:

.. selected-content::
   :selections: azure, java-sync

   Full Application Code
   ~~~~~~~~~~~~~~~~~~~~~

   To see the complete code for the sample application, select your programming
   language in the language selector.

   `Complete Java Application <{+sample-app-url-qe+}/java/>`__

   Each sample application repository includes a ``README.md``
   file that you can use to learn how to set up your environment and run
   the application.

   .. procedure::
      :style: normal

      .. step:: Assign application variables

         .. include:: /includes/queryable-encryption/tutorials/assign-app-variables-java-sync.rst

         You can declare these variables by using the following code:

         .. literalinclude:: /includes/qe-tutorials/java/src/main/java/com/mongodb/tutorials/qe/QueryableEncryptionTutorial.java
            :start-after: start-setup-application-variables
            :end-before: end-setup-application-variables
            :language: java
            :dedent:

         .. important:: {+key-vault-long-title+} Namespace Permissions

            The {+key-vault-long+} is in the ``encryption.__keyVault``
            namespace. Ensure that the database user your application uses to connect
            to MongoDB has :ref:`ReadWrite <manual-reference-role-read-write>`
            permissions on this namespace.

         .. tip:: Environment Variables

            The sample code in this tutorial references environment variables that
            you need to set. Alternatively, you can replace the values directly in
            the code.

            To learn how you can setup these environment variables, see the
            `README.md <{+sample-app-url-qe+}/java/README.md>`__ file
            included in the sample application on GitHub.

      .. step:: Add your KMS credentials

         Create a variable containing your KMS credentials with the
         following structure. Use the {+azure-kv+} credentials you
         recorded when you :ref:`registered your application with Azure <qe-register-cmk-azure>`.

         .. literalinclude:: /includes/qe-tutorials/java/src/main/java/com/mongodb/tutorials/qe/util/QueryableEncryptionHelpers.java
            :start-after: start-azure-kms-credentials
            :end-before: end-azure-kms-credentials
            :language: java
            :dedent:

         You can also provide a custom name for your KMS provider by passing in a string
         that includes the name of the KMS provider, followed by a colon and the custom
         name. Providing a unique name for a KMS provider allows you to specify multiple
         KMS providers of the same type.

         For example, you can name your Azure KMS provider "my_azure_provider" in your KMS
         credentials variable as shown in the following code:

         .. literalinclude:: /includes/queryable-encryption/tutorials/automatic/azure/named-kms/NamedKms.java
            :language: java
            :dedent:

         :gold:`NOTE:` The remaining steps in this tutorial use
         the default KMS provider string, ``"azure"``.

      .. step:: Add your CMK credentials

         Create a variable containing your {+cmk-long+} credentials
         with the following structure. Use the CMK details you
         recorded when you :ref:`created a CMK <qe-create-cmk-azure>`.

         .. literalinclude:: /includes/qe-tutorials/java/src/main/java/com/mongodb/tutorials/qe/util/QueryableEncryptionHelpers.java
            :start-after: start-azure-cmk-credentials
            :end-before: end-azure-cmk-credentials
            :language: java
            :dedent:

      .. step:: Create an encryption client

         To create a client for encrypting and decrypting data in
         encrypted collections, instantiate a new ``MongoClient``
         using your connection URI and automatic encryption
         options.

         .. literalinclude:: /includes/qe-tutorials/java/src/main/java/com/mongodb/tutorials/qe/QueryableEncryptionTutorial.java
            :start-after: start-create-client
            :end-before: end-create-client
            :language: java
            :dedent:

.. selected-content::
   :selections: azure, go

   Full Application Code
   ~~~~~~~~~~~~~~~~~~~~~

   To see the complete code for the sample application, select your programming
   language in the language selector.

   `Complete Go Application <{+sample-app-url-qe+}/go/>`__

   Each sample application repository includes a ``README.md``
   file that you can use to learn how to set up your environment and run
   the application.

   .. procedure::
      :style: normal

      .. step:: Assign application variables

         .. include:: /includes/queryable-encryption/tutorials/assign-app-variables-go.rst

         You can declare these variables by using the following code:

         .. literalinclude:: /includes/qe-tutorials/go/queryable_encryption_tutorial.go
            :start-after: start-setup-application-variables
            :end-before: end-setup-application-variables
            :language: go
            :dedent:

         .. important:: {+key-vault-long-title+} Namespace Permissions

            The {+key-vault-long+} is in the ``encryption.__keyVault``
            namespace. Ensure that the database user your application uses to connect
            to MongoDB has :ref:`ReadWrite <manual-reference-role-read-write>`
            permissions on this namespace.

         .. tip:: Environment Variables

            The sample code in this tutorial references environment variables that
            you need to set. Alternatively, you can replace the values directly in
            the code.

            To learn how you can setup these environment variables, see the
            `README.md <{+sample-app-url-qe+}/go/README.md>`__ file
            included in the sample application on GitHub.

      .. step:: Add your KMS credentials

         Create a variable containing your KMS credentials with the
         following structure. Use the {+azure-kv+} credentials you
         recorded when you :ref:`registered your application with Azure <qe-register-cmk-azure>`.

         .. literalinclude:: /includes/qe-tutorials/go/queryable_encryption_helpers.go
            :start-after: start-azure-kms-credentials
            :end-before: end-azure-kms-credentials
            :language: go
            :dedent:

      .. step:: Add your CMK credentials

         Create a variable containing your {+cmk-long+} credentials
         with the following structure. Use the CMK details you
         recorded when you :ref:`created a CMK <qe-create-cmk-azure>`.

         .. literalinclude:: /includes/qe-tutorials/go/queryable_encryption_helpers.go
            :start-after: start-azure-cmk-credentials
            :end-before: end-azure-cmk-credentials
            :language: go
            :dedent:

      .. step:: Create an encryption client

         To create a client for encrypting and decrypting data in
         encrypted collections, instantiate a new ``MongoClient``
         using your connection URI and automatic encryption
         options.

         .. literalinclude:: /includes/qe-tutorials/go/queryable_encryption_tutorial.go
            :start-after: start-create-client
            :end-before: end-create-client
            :language: go
            :dedent:

.. selected-content::
   :selections: azure, csharp

   Full Application Code
   ~~~~~~~~~~~~~~~~~~~~~

   To see the complete code for the sample application, select your programming
   language in the language selector.

   `Complete C# Application <{+sample-app-url-qe+}/csharp/>`__

   Each sample application repository includes a ``README.md``
   file that you can use to learn how to set up your environment and run
   the application.

   .. procedure::
      :style: normal

      .. step:: Assign application variables

         .. include:: /includes/queryable-encryption/tutorials/assign-app-variables-csharp.rst

         You can declare these variables by using the following code:

         .. literalinclude:: /includes/qe-tutorials/csharp/QueryableEncryptionTutorial.cs
            :start-after: start-setup-application-variables
            :end-before: end-setup-application-variables
            :language: csharp
            :dedent:

         .. important:: {+key-vault-long-title+} Namespace Permissions

            The {+key-vault-long+} is in the ``encryption.__keyVault``
            namespace. Ensure that the database user your application uses to connect
            to MongoDB has :ref:`ReadWrite <manual-reference-role-read-write>`
            permissions on this namespace.

         .. tip:: Environment Variables

            The sample code in this tutorial references environment variables that
            you need to set. Alternatively, you can replace the values directly in
            the code.

            To learn how you can setup these environment variables, see the
            `README.md <{+sample-app-url-qe+}/csharp/README.md>`__ file
            included in the sample application on GitHub.

      .. step:: Add your KMS credentials

         Create a variable containing your KMS credentials with the
         following structure. Use the {+azure-kv+} credentials you
         recorded when you :ref:`registered your application with Azure <qe-register-cmk-azure>`.

         .. literalinclude:: /includes/qe-tutorials/csharp/QueryableEncryptionHelpers.cs
            :start-after: start-azure-kms-credentials
            :end-before: end-azure-kms-credentials
            :language: csharp
            :dedent:

         You can also provide a custom name for your KMS provider by passing in a string
         that includes the name of the KMS provider, followed by a colon and the custom
         name. Providing a unique name for a KMS provider allows you to specify multiple
         KMS providers of the same type.

         For example, you can name your Azure KMS provider "my_azure_provider" in your KMS
         credentials variable as shown in the following code:

         .. literalinclude:: /includes/queryable-encryption/tutorials/automatic/azure/named-kms/NamedKms.cs
            :language: csharp
            :dedent:

         :gold:`NOTE:` The remaining steps in this tutorial use
         the default KMS provider string, ``"azure"``.

      .. step:: Add your CMK credentials

         Create a variable containing your {+cmk-long+} credentials
         with the following structure. Use the CMK details you
         recorded when you :ref:`created a CMK <qe-create-cmk-azure>`.

         .. literalinclude:: /includes/qe-tutorials/csharp/QueryableEncryptionHelpers.cs
            :start-after: start-azure-cmk-credentials
            :end-before: end-azure-cmk-credentials
            :language: csharp
            :dedent:

      .. step:: Create an encryption client

         To create a client for encrypting and decrypting data in
         encrypted collections, instantiate a new ``MongoClient``
         using your connection URI and automatic encryption
         options.

         :gold:`IMPORTANT:` If you are using the .NET/C# Driver version 3.0 or later,
         you must add the following code to your application before
         instantiating a new ``MongoClient``:

         .. literalinclude:: /includes/qe-tutorials/csharp/QueryableEncryptionTutorial.cs
            :start-after: start-create-client
            :end-before: var clientSettings = MongoClientSettings.FromConnectionString(uri);
            :language: csharp
            :dedent:

         Instantiate a new ``MongoClient`` by using your
         connection URI and automatic encryption options:

         .. literalinclude:: /includes/qe-tutorials/csharp/QueryableEncryptionTutorial.cs
            :start-after: MongoClientSettings.Extensions.AddAutoEncryption(); // .NET/C# Driver v3.0 or later only
            :end-before: end-create-client
            :language: csharp
            :dedent:

.. selected-content::
   :selections: azure, rust

   Full Application Code
   ~~~~~~~~~~~~~~~~~~~~~

   To see the complete code for the sample application, select your programming
   language in the language selector.

   `Complete Rust Application <{+sample-app-url-qe+}/rust/>`__

   Each sample application repository includes a ``README.md``
   file that you can use to learn how to set up your environment and run
   the application.

   .. procedure::
      :style: normal

      .. step:: Assign application variables

         .. include:: /includes/queryable-encryption/tutorials/assign-app-variables-rust.rst

         You can declare these variables by using the following code:

         .. literalinclude:: /includes/qe-tutorials/rust/src/queryable_encryption_tutorial.rs
             :start-after: start-setup-application-variables
             :end-before: end-setup-application-variables
             :language: rust
             :dedent:

         .. important:: {+key-vault-long-title+} Namespace Permissions

            The {+key-vault-long+} is in the ``encryption.__keyVault``
            namespace. Ensure that the database user your application uses to connect
            to MongoDB has :ref:`ReadWrite <manual-reference-role-read-write>`
            permissions on this namespace.

         .. tip:: Environment Variables

            The sample code in this tutorial references environment variables that
            you need to set. Alternatively, you can replace the values directly in
            the code.

            To learn how you can setup these environment variables, see the
            `README.md <{+sample-app-url-qe+}/rust/README.md>`__ file
            included in the sample application on GitHub.

      .. step:: Add your KMS credentials

         Create a variable containing your KMS credentials with the
         following structure. Use the {+azure-kv+} credentials you
         recorded when you :ref:`registered your application with Azure <qe-register-cmk-azure>`.

         .. literalinclude:: /includes/qe-tutorials/rust/src/queryable_encryption_helpers.rs
            :start-after: start-azure-kms-credentials
            :end-before: end-azure-kms-credentials
            :language: rust
            :dedent:

         You can also provide a custom name for your KMS provider by passing the
         name as a string to the ``with_name()`` function. Providing a unique name for
         a KMS provider allows you to specify multiple KMS providers of the same type.

         For example, you can name your Azure KMS provider "my_azure_provider" in your KMS
         credentials variable as shown in the following code:

         .. literalinclude:: /includes/queryable-encryption/tutorials/automatic/azure/named-kms/named_kms.rs
            :language: rust
            :dedent:

         :gold:`NOTE:` The remaining steps in this tutorial use
         the default KMS provider string, ``"azure"``.

      .. step:: Add your CMK credentials

         Create a variable containing your {+cmk-long+} credentials
         with the following structure. Use the CMK details you
         recorded when you :ref:`created a CMK <qe-create-cmk-azure>`.

         .. literalinclude:: /includes/qe-tutorials/rust/src/queryable_encryption_helpers.rs
            :start-after: start-azure-cmk-credentials
            :end-before: end-azure-cmk-credentials
            :language: rust
            :dedent:

      .. step:: Create an encryption client

         To create a client for encrypting and decrypting data in
         encrypted collections, instantiate a new ``MongoClient``
         using your connection URI and automatic encryption
         options.

         .. literalinclude:: /includes/qe-tutorials/rust/src/queryable_encryption_tutorial.rs
            :start-after: start-create-client
            :end-before: end-create-client
            :language: rust
            :dedent:

.. selected-content::
   :selections: azure, php

   Full Application Code
   ~~~~~~~~~~~~~~~~~~~~~

   To see the complete code for the sample application, select your programming
   language in the language selector.

   `Complete PHP Application <{+sample-app-url-qe+}/php/>`__

   Each sample application repository includes a ``README.md``
   file that you can use to learn how to set up your environment and run
   the application.

   .. procedure::
      :style: normal

      .. step:: Assign application variables

         .. include:: /includes/queryable-encryption/tutorials/assign-app-variables-php.rst

         You can declare these variables by using the following code:

         .. literalinclude:: /includes/qe-tutorials/php/queryable-encryption-tutorial.php
             :start-after: start-setup-application-variables
             :end-before: end-setup-application-variables
             :language: php
             :dedent:

         .. important:: {+key-vault-long-title+} Namespace Permissions

            The {+key-vault-long+} is in the ``encryption.__keyVault``
            namespace. Ensure that the database user your application uses to connect
            to MongoDB has :ref:`ReadWrite <manual-reference-role-read-write>`
            permissions on this namespace.

         .. tip:: Environment Variables

            The sample code in this tutorial references environment variables that
            you need to set. Alternatively, you can replace the values directly in
            the code.

            To learn how you can setup these environment variables, see the
            `README.md <{+sample-app-url-qe+}/php/README.md>`__ file
            included in the sample application on GitHub.

      .. step:: Add your KMS credentials

         Create a variable containing your KMS credentials with the
         following structure. Use the {+azure-kv+} credentials you
         recorded when you :ref:`registered your application with Azure <qe-register-cmk-azure>`.

         .. literalinclude:: /includes/qe-tutorials/php/queryable-encryption-helpers.php
            :start-after: start-azure-kms-credentials
            :end-before: end-azure-kms-credentials
            :language: php
            :dedent:

         You can also provide a custom name for your KMS provider by passing in a string
         that includes the name of the KMS provider, followed by a colon and the custom
         name. Providing a unique name for a KMS provider allows you to specify multiple
         KMS providers of the same type.

         For example, you can name your Azure KMS provider 'my_azure_provider' in your KMS
         credentials variable as shown in the following code:

         .. literalinclude:: /includes/qe-tutorials/php/queryable-encryption-helpers.php
            :start-after: start-azure-named-kms-credentials
            :end-before: end-azure-named-kms-credentials
            :language: php
            :dedent:

         :gold:`NOTE:` The remaining steps in this tutorial use
         the default KMS provider string, ``'azure'``.

      .. step:: Add your CMK credentials

         Create a variable containing your {+cmk-long+} credentials
         with the following structure. Use the CMK details you
         recorded when you :ref:`created a CMK <qe-create-cmk-azure>`.

         .. literalinclude:: /includes/qe-tutorials/php/queryable-encryption-helpers.php
            :start-after: start-azure-cmk-credentials
            :end-before: end-azure-cmk-credentials
            :language: php
            :dedent:

      .. step:: Create an encryption client

         To create a client for encrypting and decrypting data in
         encrypted collections, instantiate a new ``MongoClient``
         using your connection URI and automatic encryption
         options.

         .. literalinclude:: /includes/qe-tutorials/php/queryable-encryption-tutorial.php
            :start-after: start-create-client
            :end-before: end-create-client
            :language: php
            :dedent:

.. selected-content::
   :selections: azure, ruby

   Full Application Code
   ~~~~~~~~~~~~~~~~~~~~~

   To see the complete code for the sample application, select your programming
   language in the language selector.

   `Complete Ruby Application <{+sample-app-url-qe+}/ruby/>`__

   Each sample application repository includes a ``README.md``
   file that you can use to learn how to set up your environment and run
   the application.

   .. procedure::
      :style: normal

      .. step:: Assign application variables

         .. include:: /includes/queryable-encryption/tutorials/assign-app-variables-ruby.rst

         You can declare these variables by using the following code:

         .. literalinclude:: /includes/qe-tutorials/ruby/queryable-encryption-tutorial.rb
            :start-after: start-setup-application-variables
            :end-before: end-setup-application-variables
            :language: ruby
            :dedent:

         .. important:: {+key-vault-long-title+} Namespace Permissions

            The {+key-vault-long+} is in the ``encryption.__keyVault``
            namespace. Ensure that the database user your application uses to connect
            to MongoDB has :ref:`ReadWrite <manual-reference-role-read-write>`
            permissions on this namespace.

         .. tip:: Environment Variables

            The sample code in this tutorial references environment variables that
            you need to set. Alternatively, you can replace the values directly in
            the code.

            To learn how you can setup these environment variables, see the
            `README.md <{+sample-app-url-qe+}/ruby/README.md>`__ file
            included in the sample application on GitHub.

      .. step:: Add your KMS credentials

         Create a variable containing your KMS credentials with the
         following structure. Use the {+azure-kv+} credentials you
         recorded when you :ref:`registered your application with Azure <qe-register-cmk-azure>`.

         .. literalinclude:: /includes/qe-tutorials/ruby/queryable-encryption-helpers.rb
            :start-after: start-azure-kms-credentials
            :end-before: end-azure-kms-credentials
            :language: ruby
            :dedent:

      .. step:: Add your CMK credentials

         Create a variable containing your {+cmk-long+} credentials
         with the following structure. Use the CMK details you
         recorded when you :ref:`created a CMK <qe-create-cmk-azure>`.

         .. literalinclude:: /includes/qe-tutorials/ruby/queryable-encryption-helpers.rb
            :start-after: start-azure-cmk-credentials
            :end-before: end-azure-cmk-credentials
            :language: ruby
            :dedent:

      .. step:: Create an encryption client

         To create a client for encrypting and decrypting data in
         encrypted collections, instantiate a new ``Mongo::Client``
         using your connection URI and automatic encryption
         options.

         .. literalinclude:: /includes/qe-tutorials/ruby/queryable-encryption-tutorial.rb
            :start-after: start-create-client
            :end-before: end-create-client
            :language: ruby
            :dedent: