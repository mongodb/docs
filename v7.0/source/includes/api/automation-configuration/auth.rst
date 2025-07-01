To enable authentication, configure the ``auth`` object. This object is
optional and defines :manual:`authentication-related
</core/authentication>` settings.

.. code-block:: json
   :linenos:

   {
     "auth": {
       "authoritativeSet": "<boolean>",
       "autoUser": "<string>",
       "autoPwd": "<string>",
       "disabled": "<boolean>",
       "deploymentAuthMechanisms": ["<string>", "<string>"],
       "autoAuthMechanisms": ["<string>"],
       "key": "<string>",
       "keyfile": "<string>",
       "newAutoPwd": "<string>",
       "newKey": "<string>",
       "usersDeleted": [{
         "user": "<string>",
         "dbs": ["<string>", "<string>"]
       }],
       "usersWanted": [{
         "authenticationRestrictions": [{
           "clientSource": ["(IP | CIDR range)", "(IP | CIDR range)"],
           "serverAddress": ["(IP | CIDR range)", "(IP | CIDR range)"]
         }],
         "db": "<string>",
         "initPwd": "<string>",
         "otherDBRoles": {
           "<string>": ["<string>", "<string>"]
         },
         "roles": [{
           "db": "<string>",
           "role": "<string>"
         }],
         "pwd": "<string>",
         "user": "<string>"
       }]
     }
   }

.. include:: /includes/api/list-tables/auto-config/auth.rst
