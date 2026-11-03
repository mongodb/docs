.. setting:: spec.security.roles.privileges.resource

   *Type*: collection

   
   Resources for which the privilege
   :setting:`~spec.security.roles.privileges.actions`
   apply.
   
   This collection must include either:
   
   - The
     :setting:`spec.security.roles.privileges.resource.database`
     and
     :setting:`spec.security.roles.privileges.resource.collection`
     settings, or
   - The
     :setting:`spec.security.roles.privileges.resource.cluster`
     setting with a value of ``true``.
   

