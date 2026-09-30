.. setting:: spec.security.roles.authenticationRestrictions.serverAddress

   *Type*: array

   
   Array of IP addresses or CIDR blocks to which users assigned this
   :setting:`spec.security.roles.role` can connect. 
   
   MongoDB servers reject connection requests from users with this role
   if the client requests to connect to a server that is not present in
   this array.
   

