.. setting:: spec.security.roles.privileges.resource.cluster

   *Type*: boolean

   *Default*: False

   
   Flag that indicates that the privilege
   :setting:`~spec.security.roles.privileges.actions`
   apply to all databases and collections in the MongoDB deployment. If
   omitted, defaults to ``false``.
   
   If set to true, do not provide values for
   :setting:`spec.security.roles.privileges.resource.database`
   and 
   :setting:`spec.security.roles.privileges.resource.collection`.
   

