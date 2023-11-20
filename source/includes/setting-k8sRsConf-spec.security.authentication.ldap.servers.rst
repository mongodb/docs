.. setting:: spec.security.authentication.ldap.servers

   *Type*: array of strings

   *Required for LDAP authentication.* 
   
   List of hostnames and ports of the |ldap| servers. Specify
   hostnames with their respective ports in the following format:
   
   .. code-block:: yaml
   
      spec:
        security:
          authentication:
            ldap:
              servers: 
                - "<hostname1>:<port1>"
                - "<hostname2>:<port2>"
   

