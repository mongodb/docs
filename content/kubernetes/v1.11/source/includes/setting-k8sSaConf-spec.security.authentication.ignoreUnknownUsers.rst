.. setting:: spec.security.authentication.ignoreUnknownUsers

   *Type*: boolean

   *Default*: ``false``

   Determines whether you can modify database users that were not
   configured through the |k8s-op-short|, or the |com| user interface.
   
   To manage database users directly through the |mongod| or |mongos|, set
   this setting to ``true``.
   

