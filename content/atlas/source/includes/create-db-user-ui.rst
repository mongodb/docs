.. tabs::

   tabs:
   - id: scram
     name: Password Authentication
     content: |

       .. include:: /includes/steps-add-scram-user.rst

   - id: x509
     name: X.509 Certificates
     content: |

       .. include::  /includes/steps-adf-add-self-managed-x509-user.rst

   - id: aws-iam
     name: AWS IAM
     content: |

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

       .. include:: /includes/ldap-deprecated.rst

       Follow the steps to :ref:`config-auth-ldap`, then follow the
       steps to :ref:`add-db-user-group-ldap`.
