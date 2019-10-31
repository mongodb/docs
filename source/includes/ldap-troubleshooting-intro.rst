Use ``ldapsearch`` to determine if the query template you 
configured |service| to use returns user DNs the way you expect. The 
query template may not be returning the correct user DNs if |ldap|
authentication works but |ldap| authorization doesn't.

Use the following ``ldapsearch`` template: