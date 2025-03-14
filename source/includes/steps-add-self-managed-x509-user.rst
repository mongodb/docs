.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-db-access.rst

   .. step:: Open the :guilabel:`Add New Database User` dialog box.

      a. If it's not already displayed, click the
         :guilabel:`Database Users` tab.
      
      #. Click :icon-fa5:`plus` :guilabel:`Add New Database User`.
      
   .. step:: Select :guilabel:`CERTIFICATE`.
      
   .. step:: Enter user information.
    
      .. list-table::
         :widths: 20 80
         :header-rows: 1
      
         * - Field
      
           - Description
      
         * - :guilabel:`Distinguished Name`
      
           - The user's Common Name (CN) and optionally additional
             Distinguished Name fields (`RFC 4514
             <https://www.rfc-editor.org/rfc/rfc4514>`_) from the following 
             table: 
      
             .. include:: /includes/list-tables/supported-x509-dn-fields.rst
             
             For more information on Distinguished Name fields, see `RFC 4514
             <https://www.rfc-editor.org/rfc/rfc4514>`_. 
           
             For example:
             
             .. code-block::
                :copyable: false
      
                CN=Jane Doe,O=MongoDB,C=US
      
         * - :guilabel:`User Privileges`
      
           - You can assign roles in one of the following ways:
      
             - Select :atlasrole:`Atlas admin`, which provides the user
               with :atlasrole:`readWriteAnyDatabase` as well as a number
               of administrative privileges.
      
             - Select :atlasrole:`Read and write to any database`, which
               provides the user with privileges to read and write to any
               database.
      
             - Select :atlasrole:`Only read any database` which provides
               the user with privileges to read any database.
      
             - Select :guilabel:`Select Custom Role` to select a custom 
               role previously created in |service|. You can create custom 
               roles for database users in cases where the 
               :manual:`built-in database user roles </reference/built-in-roles/#database-user-roles>` 
               cannot describe the desired set of 
               privileges. For more information on custom roles, see 
               :ref:`mongodb-roles`.
      
             - Click :guilabel:`Add Default Privileges`. When you
               click this option, you can select
               individual roles and specify the database on which the
               roles apply. Optionally, for the ``read`` and ``readWrite``
               roles, you can also specify a collection. If you do not
               specify a collection for ``read`` and ``readWrite``, the
               role applies to all non-``system`` collections in the
               database.
      
             For information on the built-in |service| privileges, see
             :ref:`atlas-user-privileges`.
      
             For more information on authorization, see :manual:`Role-Based
             Access Control </core/authorization>` and :manual:`Built-in
             Roles </core/security-built-in-roles>` in the MongoDB manual.
      
   .. step:: Click :guilabel:`Add User`.
