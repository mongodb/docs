.. tabs::
   :hidden:

   .. tab:: SCRAM-SHA
      :tabid: scram

      **admin** if the database user authenticates with SCRAM-SHA.

   .. tab:: X.509
      :tabid: x509

      **$external** if the database user authenticates with X.509.

   .. tab:: LDAP
      :tabid: ldap

      - **admin** if the database user authenticates with |ldap|
        and ``"ldapAuthType"  : "GROUP"`` or
      - **$external** if the database user authenticates with
        |ldap| and ``"ldapAuthType"  : "USER"``

   .. tab:: AWS IAM
      :tabid: aws-iam

      **$external** if the database user authenticates with
      |aws| |iam| and ``"awsIAMType"  : "USER"`` or
      ``"awsIAMType"  : "ROLE"``

If you don't set an authentication mechanism, |service|
defaults to **SCRAM-SHA**.
