.. tabs::
   :hidden:

   .. tab:: SCRAM-SHA
      :tabid: scram

      An alphanumeric string

   .. tab:: X.509
      :tabid: x509

      An |fqdn| as defined in :rfc:`RFC 2253 <2253>` of 10 KB or less
      when ``"x509Type" : "CUSTOMER"``.

   .. tab:: LDAP
      :tabid: ldap

      An |fqdn| as defined in :rfc:`RFC 2253 <2253>` of 10 KB or less
      when:

      - ``"ldapAuthType" : "USER"`` or
      - ``"ldapAuthType" : "GROUP"``

   .. tab:: AWS IAM
      :tabid: aws-iam

      An |arn| of 10 KB or less when:

      - ``"awsIAMType" : "USER"`` or
      - ``"awsIAMType" : "ROLE"``
