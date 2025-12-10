.. tabs::

   tabs:
   - id: scram
     name: Password
     content: |
       :ref:`SCRAM <authentication-scram>` is MongoDB's
       default authentication method. SCRAM requires a password for
       each user.

       The :ref:`authentication database <user-authentication-database>` for
       SCRAM-authenticated users is the ``admin`` database.

       .. note::

          By default, Atlas supports SCRAM-SHA-256 authentication. 
          If you created a user before MongoDB 4.0, you must update
          MongoDB 4.0, update their passwords to generate SCRAM-SHA-256
          credentials. You may reuse existing passwords.

   - id: x509
     name: X.509 Certificates
     content: |
       :manual:`X.509 Certificates </core/security-x.509/>`, also known 
       as mutual TLS or mTLS, allow passwordless authentication by using 
       a trusted certificate.
  
       The :ref:`authentication database <user-authentication-database>` for
       X.509-authenticated users is the ``$external`` database.

       If you :ref:`enable LDAP authorization 
       <ldaps-authentication-authorization>`, you can't connect to your
       {+database-deployments+} with users that authenticate with an
       |service|-managed X.509 certificate. To enable |ldap| and
       connecting to your {+database-deployments+} with X.509 users, see
       :ref:`self-managed-x509`.
  
   - id: aws-iam
     name: AWS IAM
     content: |
 
       You can create a database user which uses an `AWS IAM
       <https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html>`__
       User or Role :abbr:`ARN (Amazon Resource Name)` for authentication.
  
       The :ref:`authentication database <user-authentication-database>` for
       AWS IAM-authenticated users is the ``$external`` database.
  
       AWS IAM authentication is available only on {+database-deployments+} which use MongoDB
       version 7.0 and higher.