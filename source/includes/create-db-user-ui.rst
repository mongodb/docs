.. tabs::

   tabs:
   - id: scram
     name: Password Authentication
     content: |

       .. include:: /includes/steps/add-scram-user.rst

   - id: x509
     name: X.509 Certificates
     content: |

       .. include:: /includes/steps/add-x509-user.rst

   - id: aws-iam
     name: AWS IAM Authentication
     content: |

       .. note::

          AWS IAM authentication is available only on {+database-deployments+} which use
          MongoDB version 4.4 and higher.

       .. include:: /includes/steps/add-aws-iam-user.rst

       AWS IAM Connection String Example
       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

       Connecting to |service| using AWS IAM authentication with the
       {+mongosh+} requires shell version v0.9.0 or higher.

       - Use your `AWS IAM credentials
         <https://console.aws.amazon.com/iam/home?region=us-west-2#/security_credentials>`__,
         using your access key ID as your username and your secret key
         as your password.

       - The ``authSource`` query parameter is ``$external``,
         URL-encoded as ``%24external``.

       - The ``authMechanism`` query parameter is ``MONGODB-AWS``.

       Example:

       .. code-block:: sh

          mongosh "mongodb+srv://<atlas-host-name>/test?authSource=%24external&authMechanism=MONGODB-AWS" \
            --username <access-key-id> --password <secret-key>