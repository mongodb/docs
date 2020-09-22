The ``roles`` array is optional and describes user-defined roles.

.. code-block:: json
   :linenos:

   "roles" : [
     {
       "role" : "<string>",
       "db" : "<string>",
       "privileges" : [
         {
           "resource" : { ... },
           "actions" : [ "<string>", ... ]
         },
         ...
       ],
       "roles" : [
         {
           "role" : "<string>",
           "db" : "<string>"
         }
       ]
       "authenticationRestrictions" : [
        {
         "clientSource": [("<IP>" | "<CIDR range>"), ...],
         "serverAddress": [("<IP>" | "<CIDR range>"), ...]
       }, ...
     ]
     },
     ...
   ]


.. list-table::
   :widths: 20 14 11 55
   :header-rows: 1
   :class: table-large
   :stub-columns: 1

   * - Name
     - Type
     - Necessity
     - Description

   * - roles
     - array of objects
     - Optional
     - Roles and privileges that MongoDB has assigned to a cluster's
       user-defined roles. Each object describes a different
       user-defined role. Objects in this array contain the same fields
       as documents in the :manual:`system roles collection
       </reference/system-roles-collection>`, except for the **_id**
       field.

   * - roles[n].role
     - string
     - Conditional
     - Name of the user-defined role.

   * - roles[n].db
     - string
     - Conditional
     - Database to which the user-defined role belongs.

   * - roles[n].privileges
     - array of documents
     - Conditional
     - :ref:`Privileges <privileges>` this role can perform.

   * - roles[n].privileges[k].resource
     - string
     - Conditional
     - Specifies the resources upon which the privilege **actions**
       apply.

   * - roles[n].privileges[k].actions
     - string
     - Conditional
     - Actions permitted on the resource.

       .. seealso:: :manual:`Privilege Actions </reference/privilege-actions/>`

   * - roles[n].roles
     - array of documents
     - Conditional
     - Roles from which this role :ref:`inherits <inheritance>`
       privileges.

   * - roles[n].authenticationRestrictions
     - array of documents
     - Optional
     - Authentication restrictions that the MongoDB server enforces on
       this role.

       .. include:: /includes/warning-inheriting-incompatible-auths.rst

   * - roles[n].authenticationRestrictions[k].clientSource
     - array of strings
     - Conditional
     - If present, when authenticating a user, the MongoDB server
       verifies that the client's IP address is either in the given
       list or belongs to a |cidr| range in the list. If the client's
       IP address is not present, the MongoDB server does not
       authenticate the user.

   * - roles[n].authenticationRestrictions[k].serverAddress
     - array of strings
     - Conditional
     - Comma-separated array of IP addresses to which the client can
       connect. If present, the MongoDB server verifies that it
       accepted the client's connection from an IP address in the given
       array. If the MongoDB server accepts a connection from an
       unrecognized IP address, the MongoDB server does not
       authenticate the user.
