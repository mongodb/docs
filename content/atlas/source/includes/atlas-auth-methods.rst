- **Password:** :ref:`SCRAM <authentication-scram>` is MongoDB's
  default authentication method. SCRAM requires a password for
  each user.

  The :ref:`authentication database <user-authentication-database>`
  for SCRAM-authenticated users is the ``admin`` database.

  .. note::

     By default, Atlas supports SCRAM-SHA-256 authentication.
     If you created a user before MongoDB 4.0, you must update
     MongoDB 4.0, update their passwords to generate SCRAM-SHA-256
     credentials. You may reuse existing passwords.

  **When to use SCRAM:**

  You can use SCRAM authentication for human users and application
  users. For lower environments, SCRAM is a suitable authentication
  method. For production and higher environments, follow security
  best practices to keep secrets secure and short-term, such as
  integrating with Privileged Access Management (PAM) solutions.

- **X.509 Certificates:** :manual:`X.509 Certificates
  </core/security-x.509/>`, also known as mutual TLS or mTLS, allow
  passwordless authentication by using a trusted certificate.

  The :ref:`authentication database <user-authentication-database>`
  for X.509-authenticated users is the ``$external`` database.

  If you :ref:`enable LDAP authorization
  <ldaps-authentication-authorization>`, you can't connect to your
  {+database-deployments+} with users that authenticate with an
  |service|-managed X.509 certificate. To enable |ldap| and
  connecting to your {+database-deployments+} with X.509 users, see
  :ref:`self-managed-x509`.

  **When to use X.509:**

  X.509 authentication is suitable for secure workload access when
  workload identity federation (OIDC) or AWS IAM authentication is
  not feasible, or when mutual authentication is required.

- **OIDC:** OpenID Connect (OIDC) authentication enables
  passwordless, secretless authentication using external identity
  providers. |service| supports the following types of OIDC 
  authentication:

  - :atlas:`Workforce Identity Federation
    </workforce-oidc/#std-label-oidc-authentication-workforce>` for
    human principals such as employees, partners, and contractors.
  - :atlas:`Workload Identity Federation
    </workload-oidc/#std-label-oidc-authentication-workload>` for
    applications using external programmatic identities such as Azure
    Service Principals, Azure Managed Identities, and Google Service
    Accounts.

  The :ref:`authentication database <user-authentication-database>`
  for OIDC-authenticated users is the ``$external`` database.

  OIDC authentication is available only on {+database-deployments+}
  which use MongoDB version 7.0 and higher.

  **When to use OIDC:**

  For human users, we recommend that you use Workforce Identity
  Federation with OIDC.

  For application users, we recommend that you use Workload Identity
  Federation with OIDC for applications that run on GCP or Azure.

- **AWS IAM:** You can create a database user which uses an `AWS IAM
  <https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html>`__
  User or Role :abbr:`ARN (Amazon Resource Name)` for authentication.

  The :ref:`authentication database <user-authentication-database>`
  for AWS IAM-authenticated users is the ``$external`` database.

  **When to use AWS IAM:**

  We recommend that you use AWS IAM authentication with IAM roles for
  application users running on AWS.
  