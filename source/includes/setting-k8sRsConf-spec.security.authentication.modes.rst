.. setting:: spec.security.authentication.modes

   *Type*: array

   Specifies the authentication mechanism that your MongoDB deployment 
   uses. Valid values are ``SCRAM``, ``SCRAM-SHA-1``, ``MONGODB-CR``, 
   ``X509``, and ``LDAP``. We recommend ``SCRAM-SHA-256`` (``SCRAM``) 
   over ``SCRAM-SHA-1``. If you specify ``SCRAM-SHA-1``, you must also 
   specify ``MONGODB-CR``.
   
   .. note:: X.509 Internal Cluster Authentication
   
      To enable :ref:`X.509 internal cluster authentication
      <x509-internal-authentication>` for the |com| project, set this
      value to ``["X509"]`` and specify the following settings:
   
      - :setting:`spec.security.authentication.internalCluster` ``: "X509"``
      - provide a value for the
        :setting:`spec.security.certsSecretPrefix` setting.`
   
   If you provide more than one value for
   :setting:`spec.security.authentication.modes`, you must also specify a
   value for :setting:`spec.security.authentication.agents.mode`.
   

