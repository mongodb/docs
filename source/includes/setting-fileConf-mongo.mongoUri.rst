.. setting:: mongo.mongoUri

   *Type*: string

   
   :manual:`connection string </reference/connection-string/>` used
   to access the |application| Database. If applicable, the connection
   string **must** include the authentication credentials for the
   :parameter:`authentication mechanism <authenticationMechanisms>`
   used on the |application| database.
   
   How you format your connection string depends on:
   
   - the type of cluster you deployed for your backing databases,
   - the protocol you use, and
   - the authentication method you use.
   
   .. include:: /includes/tabsets/connstring/stringformat.rst
   
   

