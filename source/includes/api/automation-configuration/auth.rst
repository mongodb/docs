|mms| doesn't require the ``auth`` object. This object defines
:manual:`authentication-related </core/authentication>` settings.

.. code-block:: json
   :linenos:

   {
     "auth": {
       "authoritativeSet": "<boolean>",
       "autoUser": "<string>",
       "autoPwd": "<string>",
       "disabled": "<boolean>",
       "deploymentAuthMechanisms": ["<string>", "<string>"],
       "key": "<string>",
       "keyfile": "<string>",
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
         "roles": ["<string>", "<string>"],
         "pwd": "<string>",
         "user": "<string>"
       }]
     }
   }

.. include:: /includes/api/list-tables/auto-config/auth.rst
