.. tabs::

   tabs:
   - id: scram
     name: Password Authentication
     content: |

       .. include:: /includes/steps-add-scram-user.rst

   - id: x509
     name: X.509 Certificates
     content: |

       .. include:: /includes/steps-add-x509-user.rst

   - id: aws-iam
     name: AWS IAM
     content: |

       .. note::

          AWS IAM authentication is available only on {+database-deployments+} which use
          MongoDB version 5.0 and higher.

       .. include:: /includes/steps-add-aws-iam-user.rst

       AWS IAM Connection String Example
       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

       .. include:: /includes/aws-iam-connection-string-example.rst

   - id: oidc
     name: OIDC
     content: |

       .. include:: /includes/steps-create-oidc-user.rst

   - id: ldap
     name: LDAP
     content: |

       Follow the steps to :ref:`config-auth-ldap`, then follow the
       steps to :ref:`add-db-user-group-ldap`.
