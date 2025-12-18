.. note:: 
   
   :ref:`IP access lists <access-list>` apply to *using* service account access tokens, not 
   :ref:`creating <generate-oauth2-token-atlas>` or :ref:`revoking <revoke-oauth2-token-atlas>` them. 
   You can generate a token from any IP address, but you can only use it to call 
   the |api| if your IP address is on the access list.