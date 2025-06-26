.. setting:: spec.security.roles.authenticationRestrictions.clientSource

   *Type*: array

   
   Array of IP addresses or CIDR blocks from which users assigned this
   :setting:`spec.security.roles.role` can connect. 
   
   MongoDB servers reject connection requests from users with this role
   if the requests come from a client that is not present in this array.
   

