This guide shows you how to enable |service| to authenticate and 
authorize database users (not |service| users) from 
|ldap-provider-link|, a third-party |ldap| provider.

You can enable |ldap| authentication only or you can enable both |ldap|
authentication and authorization:

- If you enable |ldap| authentication only, you add individual users to 
  |service| and assign database access
  privileges to each user you add. 
- If you enable |ldap| authentication 
  and authorization, you add user groups to |service| and assign 
  database access privileges to each group. Users inherit the database 
  access privileges from the |ldap| group they belong to.