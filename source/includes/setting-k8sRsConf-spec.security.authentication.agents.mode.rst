.. setting:: spec.security.authentication.agents.mode

   *Type*: string

   
   The authentication mechanism that the {+mdbagent+}s for
   your MongoDB deployment use. Valid values are ``SCRAM``, 
   ``SCARM-SHA-1``, ``MONGODB-CR``, ``X509``, and
   ``LDAP``. The value you specify must also be present in
   :setting:`spec.security.authentication.modes`. We recommend 
   ``SCRAM-SHA-256`` (``SCRAM``) over ``SCRAM-SHA-1``. If you specify 
   ``SCRAM-SHA-1``, you must also specify ``MONGODB-CR``.
   
   This setting is required if you specified more than one value for
   :setting:`spec.security.authentication.modes`.
   

