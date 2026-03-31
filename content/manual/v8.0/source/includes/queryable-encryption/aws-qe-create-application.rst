.. selected-content::
   :selections: aws, shell

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

      .. step:: Add your KMS credentials
         
         Create a variable containing your KMS credentials with the
         following structure. Use the Access Key ID and Secret Access 
         Key you used in step 2.2 when you :ref:`created an AWS IAM user <qe-create-aws-iam-user>`.

         .. literalinclude:: /includes/qe-tutorials/mongosh/queryable-encryption-helpers.js
            :start-after: start-aws-kms-credentials
            :end-before: end-aws-kms-credentials
            :language: javascript
            :dedent:

         You can also provide a custom name for your KMS provider by passing in a string
         that includes the name of the KMS provider, followed by a colon and the custom
         name. Providing a unique name for a KMS provider allows you to specify multiple
         KMS providers of the same type.

         For example, you can name your AWS KMS provider "my_aws_provider" in your KMS
         credentials variable as shown in the following code:

         .. literalinclude:: /includes/queryable-encryption/tutorials/automatic/aws/named-kms/named-kms-shell.js
            :language: javascript
            :dedent:

         :gold:`NOTE:` The remaining steps in this tutorial use
         the default KMS provider string, ``"aws"``.

         .. important:: Reminder: Authenticate with IAM Roles in Production

            To use an {+aws-iam-abbr+} role instead of an {+aws-iam-abbr+} user
            to authenticate your application,
            specify an empty object for your credentials in your KMS provider
            object. This instructs the driver to automatically retrieve the credentials
            from the environment:

            .. code-block:: javascript

               kmsProviders = {
                 aws: { }
               };

            You cannot automatically retrieve credentials if you are using a named KMS provider.

      .. step:: Add your CMK credentials

         Create a variable containing your {+cmk-long+} credentials
         with the following structure. Use the {+aws-arn-abbr+} and
         Region you recorded in step 1.3 when you :ref:`created a CMK <qe-create-cmk-aws>`.

         .. literalinclude:: /includes/qe-tutorials/mongosh/queryable-encryption-helpers.js
            :start-after: start-aws-cmk-credentials
            :end-before: end-aws-cmk-credentials
            :language: javascript
            :dedent:

      .. step:: Set automatic encryption options

         .. note:: Automatic Encryption Options

            The automatic encryption options provide configuration
            information to the {+shared-library+},
            which modifies the application's behavior when accessing encrypted fields.

            To learn more about the {+shared-library+}, see
            the :ref:`<qe-reference-shared-library>` page.

         Create an ``autoEncryptionOptions`` object with the following
         options:

         - The namespace of your {+key-vault-long+}
         - The ``kmsProviderCredentials`` object, which
           contains your AWS KMS credentials

         .. literalinclude:: /includes/qe-tutorials/mongosh/queryable-encryption-helpers.js
            :start-after: start-auto-encryption-options
            :end-before: end-auto-encryption-options
            :language: javascript
            :dedent:

      .. step:: Create a Client to Set Up an Encrypted Collection

         To create a client used to encrypt and decrypt data in
         your collection, instantiate a new ``MongoClient`` by using your
         connection URI and your automatic encryption options.

         .. literalinclude:: /includes/qe-tutorials/mongosh/queryable-encryption-tutorial.js
            :start-after: start-create-client
            :end-before: end-create-client
            :language: javascript
            :dedent:

.. selected-content::
   :selections: aws, nodejs

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
         following structure. Use the Access Key ID and Secret Access 
         Key you used in step 2.2 when you :ref:`created an AWS IAM user <qe-create-aws-iam-user>`.

         .. literalinclude:: /includes/qe-tutorials/node/queryable-encryption-helpers.js
            :start-after: start-aws-kms-credentials
            :end-before: end-aws-kms-credentials
            :language: javascript
            :dedent:

         You can also provide a custom name for your KMS provider by passing in a string
         that includes the name of the KMS provider, followed by a colon and the custom
         name. Providing a unique name for a KMS provider allows you to specify multiple
         KMS providers of the same type.

         For example, you can name your AWS KMS provider "my_aws_provider" in your KMS
         credentials variable as shown in the following code:

         .. literalinclude:: /includes/queryable-encryption/tutorials/automatic/aws/named-kms/named-kms.js
            :language: javascript
            :dedent:

         :gold:`NOTE:` The remaining steps in this tutorial use
         the default KMS provider string, ``"aws"``.

         .. important:: Reminder: Authenticate with IAM Roles in Production

            To use an {+aws-iam-abbr+} role instead of an {+aws-iam-abbr+} user
            to authenticate your application,
            specify an empty object for your credentials in your KMS provider
            object. This instructs the driver to automatically retrieve the credentials
            from the environment:

            .. code-block:: javascript

               kmsProviders = {
                 aws: { }
               };

            You cannot automatically retrieve credentials if you are using a named KMS provider.

      .. step:: Add your CMK credentials

         Create a variable containing your {+cmk-long+} credentials
         with the following structure. Use the {+aws-arn-abbr+} and
         Region you recorded in step 1.3 when you :ref:`created a CMK <qe-create-cmk-aws>`.

         .. literalinclude:: /includes/qe-tutorials/node/queryable-encryption-helpers.js
            :start-after: start-aws-cmk-credentials
            :end-before: end-aws-cmk-credentials
            :language: javascript
            :dedent:

      .. step:: Set automatic encryption options

         .. note:: Automatic Encryption Options

            The automatic encryption options provide configuration
            information to the {+shared-library+},
            which modifies the application's behavior when accessing encrypted fields.

            To learn more about the {+shared-library+}, see
            the :ref:`<qe-reference-shared-library>` page.

         Create an ``autoEncryptionOptions`` object with the following
         options:

         - The namespace of your {+key-vault-long+}
         - The ``kmsProviders`` object, which contains your AWS KMS credentials
         - The ``sharedLibraryPathOptions`` object, which
           contains the path to your {+shared-library+}

         .. literalinclude:: /includes/qe-tutorials/node/queryable-encryption-helpers.js
            :start-after: start-auto-encryption-options
            :end-before: end-auto-encryption-options
            :emphasize-lines: 5-9
            :language: javascript
            :dedent:

      .. step:: Create a Client to Set Up an Encrypted Collection

         To create a client used to encrypt and decrypt data in
         your collection, instantiate a new ``MongoClient`` by using your
         connection URI and your automatic encryption options.

         .. literalinclude:: /includes/qe-tutorials/node/queryable-encryption-tutorial.js
            :start-after: start-create-client
            :end-before: end-create-client
            :language: javascript
            :dedent:

.. selected-content::
   :selections: aws, python

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
         following structure. Use the Access Key ID and Secret Access 
         Key you used in step 2.2 when you :ref:`created an AWS IAM user <qe-create-aws-iam-user>`.

         .. literalinclude:: /includes/qe-tutorials/python/queryable_encryption_helpers.py
            :start-after: start-aws-kms-credentials
            :end-before: end-aws-kms-credentials
            :language: python
            :dedent:

         You can also provide a custom name for your KMS provider by passing in a string
         that includes the name of the KMS provider, followed by a colon and the custom
         name. Providing a unique name for a KMS provider allows you to specify multiple
         KMS providers of the same type.

         For example, you can name your AWS KMS provider "my_aws_provider" in your KMS
         credentials variable as shown in the following code:

         .. literalinclude:: /includes/queryable-encryption/tutorials/automatic/aws/named-kms/named-kms.py
            :language: python
            :dedent:

         :gold:`NOTE:` The remaining steps in this tutorial use
         the default KMS provider string, ``"aws"``.

         .. important:: Reminder: Authenticate with IAM Roles in Production

            To use an {+aws-iam-abbr+} role instead of an {+aws-iam-abbr+} user
            to authenticate your application,
            specify an empty object for your credentials in your KMS provider
            object. This instructs the driver to automatically retrieve the credentials
            from the environment:

            .. code-block:: python

               kms_provider_credentials = {
                 "aws": { }
               }

            You cannot automatically retrieve credentials if you are using a named KMS provider.

      .. step:: Add your CMK credentials

         Create a variable containing your {+cmk-long+} credentials
         with the following structure. Use the {+aws-arn-abbr+} and
         Region you recorded in step 1.3 when you :ref:`created a CMK <qe-create-cmk-aws>`.

         .. literalinclude:: /includes/qe-tutorials/python/queryable_encryption_helpers.py
            :start-after: start-aws-cmk-credentials
            :end-before: end-aws-cmk-credentials
            :language: python
            :dedent:

      .. step:: Set automatic encryption options

         .. note:: Automatic Encryption Options

            The automatic encryption options provide configuration
            information to the {+shared-library+},
            which modifies the application's behavior when accessing encrypted fields.

            To learn more about the {+shared-library+}, see
            the :ref:`<qe-reference-shared-library>` page.

         Create an ``AutoEncryptionOpts`` object with the following
         options:

         - The ``kms_provider_credentials`` object, which
           contains your AWS KMS credentials
         - The namespace of your {+key-vault-long+}
         - The path to your {+shared-library+}

         .. literalinclude:: /includes/qe-tutorials/python/queryable_encryption_helpers.py
            :start-after: start-auto-encryption-options
            :end-before: end-auto-encryption-options
            :language: python
            :dedent:

      .. step:: Create a Client to Set Up an Encrypted Collection

         To create a client used to encrypt and decrypt data in
         your collection, instantiate a new ``MongoClient`` by using your
         connection URI and your automatic encryption options.

         .. literalinclude:: /includes/qe-tutorials/python/queryable_encryption_tutorial.py
            :start-after: start-create-client
            :end-before: end-create-client
            :language: python
            :dedent:

.. selected-content::
   :selections: aws, java-sync

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
         following structure. Use the Access Key ID and Secret Access 
         Key you used in step 2.2 when you :ref:`created an AWS IAM user <qe-create-aws-iam-user>`.

         .. literalinclude:: /includes/qe-tutorials/java/src/main/java/com/mongodb/tutorials/qe/util/QueryableEncryptionHelpers.java
            :start-after: start-aws-kms-credentials
            :end-before: end-aws-kms-credentials
            :language: java
            :dedent:

         You can also provide a custom name for your KMS provider by passing in a string
         that includes the name of the KMS provider, followed by a colon and the custom
         name. Providing a unique name for a KMS provider allows you to specify multiple
         KMS providers of the same type.

         For example, you can name your AWS KMS provider "my_aws_provider" in your KMS
         credentials variable as shown in the following code:

         .. literalinclude:: /includes/queryable-encryption/tutorials/automatic/aws/named-kms/NamedKms.java
            :language: java
            :dedent:

         :gold:`NOTE:` The remaining steps in this tutorial use
         the default KMS provider string, ``"aws"``.

         .. important:: Reminder: Authenticate with IAM Roles in Production

            To use an {+aws-iam-abbr+} role instead of an {+aws-iam-abbr+} user
            to authenticate your application,
            specify an empty object for your credentials in your KMS provider
            object. This instructs the driver to automatically retrieve the credentials
            from the environment:

            .. code-block:: java

               kmsProviderCredentials.put("aws", new HashMap<>());

            You cannot automatically retrieve credentials if you are using a named KMS provider.

      .. step:: Add your CMK credentials

         Create a variable containing your {+cmk-long+} credentials
         with the following structure. Use the {+aws-arn-abbr+} and
         Region you recorded in step 1.3 when you :ref:`created a CMK <qe-create-cmk-aws>`.

         .. literalinclude:: /includes/qe-tutorials/java/src/main/java/com/mongodb/tutorials/qe/util/QueryableEncryptionHelpers.java
            :start-after: start-aws-cmk-credentials
            :end-before: end-aws-cmk-credentials
            :language: java
            :dedent:

      .. step:: Set automatic encryption options

         .. note:: Automatic Encryption Options

            The automatic encryption options provide configuration
            information to the {+shared-library+},
            which modifies the application's behavior when accessing encrypted fields.

            To learn more about the {+shared-library+}, see
            the :ref:`<qe-reference-shared-library>` page.

         Create an ``AutoEncryptionSettings`` object with the following
         options:

         - The namespace of your {+key-vault-long+}
         - The ``kmsProviderCredentials`` object, which
           contains your AWS KMS credentials
         - The ``extraOptions`` object, which contains the path
           to your {+shared-library+}

         .. literalinclude:: /includes/qe-tutorials/java/src/main/java/com/mongodb/tutorials/qe/util/QueryableEncryptionHelpers.java
            :start-after: start-auto-encryption-options
            :end-before: end-auto-encryption-options
            :emphasize-lines: 4-8
            :language: java
            :dedent:

         If you omit ``keyVaultClient`` or set ``bypassAutomaticEncryption`` to
         false in your ``AutoEncryptionSettings`` object, the driver creates a
         separate, internal ``MongoClient``. The internal ``MongoClient``
         configuration differs from the parent ``MongoClient`` by setting the
         ``minPoolSize`` to  0 and omitting the ``AutoEncryptionSettings``.

      .. step:: Create a Client to Set Up an Encrypted Collection

         To create a client used to encrypt and decrypt data in
         your collection, instantiate a new ``MongoClient`` by using your
         connection URI and your automatic encryption options.

         .. literalinclude:: /includes/qe-tutorials/java/src/main/java/com/mongodb/tutorials/qe/QueryableEncryptionTutorial.java
            :start-after: start-create-client
            :end-before: end-create-client
            :language: java
            :dedent:

.. selected-content::
   :selections: aws, go

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
         following structure. Use the Access Key ID and Secret Access 
         Key you used in step 2.2 when you :ref:`created an AWS IAM user <qe-create-aws-iam-user>`.

         .. literalinclude:: /includes/qe-tutorials/go/queryable_encryption_helpers.go
            :start-after: start-aws-kms-credentials
            :end-before: end-aws-kms-credentials
            :language: go
            :dedent:

         .. important:: Reminder: Authenticate with IAM Roles in Production

            To use an {+aws-iam-abbr+} role instead of an {+aws-iam-abbr+} user
            to authenticate your application,
            specify an empty object for your credentials in your KMS provider
            object. This instructs the driver to automatically retrieve the credentials
            from the environment:

            .. code-block:: go

               kmsProviderCredentials := map[string]map[string]interface{}{
                 "aws": { },
               }

            You cannot automatically retrieve credentials if you are using a named KMS provider.

      .. step:: Add your CMK credentials

         Create a variable containing your {+cmk-long+} credentials
         with the following structure. Use the {+aws-arn-abbr+} and
         Region you recorded in step 1.3 when you :ref:`created a CMK <qe-create-cmk-aws>`.

         .. literalinclude:: /includes/qe-tutorials/go/queryable_encryption_helpers.go
            :start-after: start-aws-cmk-credentials
            :end-before: end-aws-cmk-credentials
            :language: go
            :dedent:

      .. step:: Set automatic encryption options

         .. note:: Automatic Encryption Options

            The automatic encryption options provide configuration
            information to the {+shared-library+},
            which modifies the application's behavior when accessing encrypted fields.

            To learn more about the {+shared-library+}, see
            the :ref:`<qe-reference-shared-library>` page.

         Create an ``AutoEncryption`` object with the following
         options:

         - The namespace of your {+key-vault-long+}
         - The ``kmsProviderCredentials`` object, which
           contains your AWS KMS credentials
         - The ``cryptSharedLibraryPath`` object, which
           contains the path to your {+shared-library+}

         .. literalinclude:: /includes/qe-tutorials/go/queryable_encryption_helpers.go
            :start-after: start-auto-encryption-options
            :end-before: end-auto-encryption-options
            :emphasize-lines: 5-8
            :language: go
            :dedent:

      .. step:: Create a Client to Set Up an Encrypted Collection

         To create a client used to encrypt and decrypt data in
         your collection, instantiate a new ``MongoClient`` by using your
         connection URI and your automatic encryption options.

         .. literalinclude:: /includes/qe-tutorials/go/queryable_encryption_tutorial.go
            :start-after: start-create-client
            :end-before: end-create-client
            :language: go
            :dedent:

.. selected-content::
   :selections: aws, csharp

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
         following structure. Use the Access Key ID and Secret Access 
         Key you used in step 2.2 when you :ref:`created an AWS IAM user <qe-create-aws-iam-user>`.

         .. literalinclude:: /includes/qe-tutorials/csharp/QueryableEncryptionHelpers.cs
            :start-after: start-aws-kms-credentials
            :end-before: end-aws-kms-credentials
            :language: csharp
            :dedent:

         You can also provide a custom name for your KMS provider by passing in a string
         that includes the name of the KMS provider, followed by a colon and the custom
         name. Providing a unique name for a KMS provider allows you to specify multiple
         KMS providers of the same type.

         For example, you can name your AWS KMS provider "my_aws_provider" in your KMS
         credentials variable as shown in the following code:

         .. literalinclude:: /includes/queryable-encryption/tutorials/automatic/aws/named-kms/NamedKms.cs
            :language: csharp
            :dedent:

         :gold:`NOTE:` The remaining steps in this tutorial use
         the default KMS provider string, ``"aws"``.

         .. important:: Reminder: Authenticate with IAM Roles in Production

            To use an {+aws-iam-abbr+} role instead of an {+aws-iam-abbr+} user
            to authenticate your application,
            specify an empty object for your credentials in your KMS provider
            object. This instructs the driver to automatically retrieve the credentials
            from the environment:

            .. code-block:: csharp

               kmsProviderCredentials.Add("aws", new Dictionary<string, object>);

            You cannot automatically retrieve credentials if you are using a named KMS provider.

      .. step:: Add your CMK credentials

         Create a variable containing your {+cmk-long+} credentials
         with the following structure. Use the {+aws-arn-abbr+} and
         Region you recorded in step 1.3 when you :ref:`created a CMK <qe-create-cmk-aws>`.

         .. literalinclude:: /includes/qe-tutorials/csharp/QueryableEncryptionHelpers.cs
            :start-after: start-aws-cmk-credentials
            :end-before: end-aws-cmk-credentials
            :language: csharp
            :dedent:

      .. step:: Set automatic encryption options

         .. note:: Automatic Encryption Options

            The automatic encryption options provide configuration
            information to the {+shared-library+},
            which modifies the application's behavior when accessing encrypted fields.

            To learn more about the {+shared-library+}, see
            the :ref:`<qe-reference-shared-library>` page.

         Create an ``AutoEncryptionOptions`` object with the following
         options:

         - The namespace of your {+key-vault-long+}
         - The ``kmsProviderCredentials`` object, which
           contains your AWS KMS credentials
         - The ``extraOptions`` object, which contains the path
           to your {+shared-library+}

         .. literalinclude:: /includes/qe-tutorials/csharp/QueryableEncryptionHelpers.cs
            :start-after: start-auto-encryption-options
            :end-before: end-auto-encryption-options
            :emphasize-lines: 7-10
            :language: csharp
            :dedent:

      .. step:: Create a Client to Set Up an Encrypted Collection

         To create a client used to encrypt and decrypt data in
         your collection, instantiate a new ``MongoClient`` by using your
         connection URI and your automatic encryption options.

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
   :selections: aws, rust

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
         following structure. Use the Access Key ID and Secret Access 
         Key you used in step 2.2 when you :ref:`created an AWS IAM user <qe-create-aws-iam-user>`.

         .. literalinclude:: /includes/qe-tutorials/rust/src/queryable_encryption_helpers.rs
            :start-after: start-aws-kms-credentials
            :end-before: end-aws-kms-credentials
            :language: rust
            :dedent:

         You can also provide a custom name for your KMS provider by passing the
         name as a string to the ``with_name()`` function. Providing a unique name for
         a KMS provider allows you to specify multiple KMS providers of the same type.

         For example, you can name your AWS KMS provider "my_aws_provider" in your KMS
         credentials variable as shown in the following code:

         .. literalinclude:: /includes/queryable-encryption/tutorials/automatic/aws/named-kms/named_kms.rs
            :language: rust
            :dedent:

         :gold:`NOTE:` The remaining steps in this tutorial use
         the default KMS provider string, ``"aws"``.

         .. important:: Reminder: Authenticate with IAM Roles in Production

            To use an {+aws-iam-abbr+} role instead of an {+aws-iam-abbr+} user
            to authenticate your application,
            specify an empty object for your credentials in your KMS provider
            object. This instructs the driver to automatically retrieve the credentials
            from the environment:

            .. code-block:: rust

               kms_providers = vec![(
                   KmsProvider::aws(),
                   doc! {},
                   None,
               )];

            You cannot automatically retrieve credentials if you are using a named KMS provider.

      .. step:: Add your CMK credentials

         Create a variable containing your {+cmk-long+} credentials
         with the following structure. Use the {+aws-arn-abbr+} and
         Region you recorded in step 1.3 when you :ref:`created a CMK <qe-create-cmk-aws>`.

         .. literalinclude:: /includes/qe-tutorials/rust/src/queryable_encryption_helpers.rs
            :start-after: start-aws-cmk-credentials
            :end-before: end-aws-cmk-credentials
            :language: rust
            :dedent:

      .. step:: Set automatic encryption options

         .. note:: Automatic Encryption Options

            The automatic encryption options provide configuration
            information to the {+shared-library+},
            which modifies the application's behavior when accessing encrypted fields.

            To learn more about the {+shared-library+}, see
            the :ref:`<qe-reference-shared-library>` page.

         Create an ``EncryptedClientBuilder`` object that contains the following
         options:

         - A ``ClientOptions`` object
         - The namespace of your {+key-vault-long+}
         - The ``kms_providers`` object, which
           contains your AWS KMS credentials

         .. literalinclude:: /includes/qe-tutorials/rust/src/queryable_encryption_helpers.rs
            :start-after: start-auto-encryption-options
            :end-before: end-auto-encryption-options
            :language: rust
            :dedent:

      .. step:: Create a Client to Set Up an Encrypted Collection

         To create a client used to encrypt and decrypt data in
         your collection, instantiate a new ``MongoClient`` by using your
         connection URI and your automatic encryption options.

         .. literalinclude:: /includes/qe-tutorials/rust/src/queryable_encryption_tutorial.rs
            :start-after: start-create-client
            :end-before: end-create-client
            :language: rust
            :dedent:

.. selected-content::
   :selections: aws, php

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
         following structure. Use the Access Key ID and Secret Access 
         Key you used in step 2.2 when you :ref:`created an AWS IAM user <qe-create-aws-iam-user>`.

         .. literalinclude:: /includes/qe-tutorials/php/queryable-encryption-helpers.php
            :start-after: start-aws-kms-credentials
            :end-before: end-aws-kms-credentials
            :language: php
            :dedent:

         You can also provide a custom name for your KMS provider by passing in a string
         that includes the name of the KMS provider, followed by a colon and the custom
         name. Providing a unique name for a KMS provider allows you to specify multiple
         KMS providers of the same type.

         For example, you can name your AWS KMS provider 'my_aws_provider' in your KMS
         credentials variable as shown in the following code:

         .. literalinclude:: /includes/qe-tutorials/php/queryable-encryption-helpers.php
            :start-after: start-aws-named-kms-credentials
            :end-before: end-aws-named-kms-credentials
            :language: php
            :dedent:

         :gold:`NOTE:` The remaining steps in this tutorial use
         the default KMS provider string, ``"aws"``.

         .. important:: Reminder: Authenticate with IAM Roles in Production

            To use an {+aws-iam-abbr+} role instead of an {+aws-iam-abbr+} user
            to authenticate your application,
            specify an empty object for your credentials in your KMS provider
            object. This instructs the driver to automatically retrieve the credentials
            from the environment:

            .. code-block:: php

               $kmsProviders = [
                  'aws' => [],
               ];

            You cannot automatically retrieve credentials if you are using a named KMS provider.

      .. step:: Add your CMK credentials

         Create a variable containing your {+cmk-long+} credentials
         with the following structure. Use the {+aws-arn-abbr+} and
         Region you recorded in step 1.3 when you :ref:`created a CMK <qe-create-cmk-aws>`.

         .. literalinclude:: /includes/qe-tutorials/php/queryable-encryption-helpers.php
            :start-after: start-aws-cmk-credentials
            :end-before: end-aws-cmk-credentials
            :language: php
            :dedent:

      .. step:: Set automatic encryption options

         .. note:: Automatic Encryption Options

            The automatic encryption options provide configuration
            information to the {+shared-library+},
            which modifies the application's behavior when accessing encrypted fields.

            To learn more about the {+shared-library+}, see
            the :ref:`<qe-reference-shared-library>` page.

         Create an ``$autoEncryptionOptions`` object that contains the following
         options:

         - The namespace of your {+key-vault-long+}
         - The ``$kmsProviders`` object, defined in the previous step

         .. literalinclude:: /includes/qe-tutorials/php/queryable-encryption-helpers.php
            :start-after: start-auto-encryption-options
            :end-before: end-auto-encryption-options
            :language: php
            :dedent:

      .. step:: Create a Client to Set Up an Encrypted Collection

         To create a client used to encrypt and decrypt data in
         your collection, instantiate a new ``MongoClient`` by using your
         connection URI and your automatic encryption options.

         .. literalinclude:: /includes/qe-tutorials/php/queryable-encryption-tutorial.php
            :start-after: start-create-client
            :end-before: end-create-client
            :language: php
            :dedent: