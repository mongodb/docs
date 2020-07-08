The ``roles`` array is optional and describes user-defined roles.

.. code-block:: cfg

   "roles" : [
       {
           "role" : <string>,
           "db" : <string>,
           "privileges" : [
               {
                   "resource" : { ... },
                   "actions" : [ <string>, ... ]
               },
               ...
           ],
           "roles" : [
               {
                   "role" : <string>,
                   "db" : <string>
               }
           ]
           "authenticationRestrictions" : [
                  {
                     "clientSource": ["<IP>" | "<CIDR range>", ...],
                     "serverAddress": ["<IP>" | "<CIDR range>", ...]
                  }, ...
               ]
       },
       ...
   ]

.. list-table::
   :widths: 30 10 80
   :header-rows: 1
   :class: table-large
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - ``roles``
     - object array
     - *Optional*. The ``roles`` array contains objects that
       describe the cluster's user-defined roles. Each object describes
       a different user-defined role. Objects in this array contain the
       same fields as documents in the :manual:`system roles collection
       </reference/system-roles-collection>`, except for the ``_id``
       field, which is not included here.

   * - | ``roles``
       | ``.[n]``
       | ``.role``
     - string
     - The name of the user-defined role.
  
   * - | ``roles``
       | ``.[n]``
       | ``.db``
     - string
     - The database to which the user-defined role belongs.
       
   * - | ``roles``
       | ``.[n]``
       | ``.privileges``
     - array of documents
     - Defines the :ref:`privileges <privileges>` for the role.
       
   * - | ``roles``
       | ``.[n]``
       | ``.privileges``
       | ``.[i]``
       | ``.resource``
     - string
     - Specifies the resources upon which the privilege ``actions`` apply.
       
   * - | ``roles``
       | ``.[n]``
       | ``.privileges``
       | ``.[i]``
       | ``.actions``
     - string
     - Specifies the actions permitted on the resource. For a list of
       actions, see `Privilege Actions <https://docs.mongodb.com/manual/reference/privilege-actions/>`_.

   * - | ``roles``
       | ``.[n]``
       | ``.roles`` 
     - array of documents
     - Specifies the roles from which this role :ref:`inherits <inheritance>`
       privileges.

   * - | ``roles``
       | ``.[n]``
       | ``.authenticationRestrictions``
     - array of documents
     - *Optional*. The authentication restrictions that the server enforces
       on the role. 

       .. only:: onprem

           *New in version 3.6.1.*

       .. include:: /includes/warning-inheriting-incompatible-auths.rst

   * - | ``roles``
       | ``.[n]``
       | ``.authenticationRestrictions``
       | ``.[k]``
       | ``.clientSource``
     - array of strings
     - If present, when authenticating a user, the server verifies that
       the client's IP address is either in the given list or belongs to a 
       :abbr:`CIDR (Classless Inter-Domain Routing)` range in the list. 
       If the client's IP address is not present, the server does not
       authenticate the user.

   * - | ``roles``
       | ``.[n]``
       | ``.authenticationRestrictions``
       | ``.[k]``
       | ``.serverAddress``
     - array of strings
     - A comma-separated array of IP addresses to which the client can connect. If present,
       the server will verify that the client's connection was accepted
       from an IP address in the given array. If the connection was accepted
       from an unrecognized IP address, the server does not authenticate
       the user.
