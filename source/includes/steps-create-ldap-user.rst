.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-db-access.rst
      
   .. step:: Open the :guilabel:`Add New Database User` dialog box.

      a. If it isn't already displayed, click the
         :guilabel:`Database Users` tab.
      
      #. Click :icon-fa5:`plus` :guilabel:`Add New Database User`.
      
   .. step:: Select :guilabel:`LDAP`.

      In the :guilabel:`Authentication Method` section of the :guilabel:`Add
      New Database User` modal window, select the box labeled :guilabel:`LDAP`.
      
      .. note::
      
         If you don't see an LDAP option, you must 
         :ref:`configure authorization with LDAP <config-auth-ldap>`. 
      
   .. step:: Select the LDAP type.

      Under :guilabel:`LDAP Type`, select :guilabel:`LDAP User` for a single
      user or :guilabel:`LDAP Group` for an LDAP group.
      
   .. step:: Enter LDAP authentication string.

      Enter the authentication string for the LDAP user or LDAP group.
      
      .. example::
      
         For the LDAP user named myUser in the project named projectName,
         enter the following:
      
         ``cn=myUser,ou=projectName,dc=com``
      
      If you enable LDAP authorization, you can create LDAP users, but they
      can't access your {+clusters+}. Add an LDAP group to access
      {+clusters+} with LDAP authorization enabled.
      
       
      
   .. step:: Assign privileges.

      Select the database user privileges. You can assign privileges to the new user
      in one or more of the following ways:
      
      - Select a :ref:`built-in role <atlas-user-privileges>` from the
        :guilabel:`Built-in Role` dropdown menu. You can select one
        built-in role per database user within the {+atlas-ui+}. If you delete the
        default option, you can click :guilabel:`Add Built-in Role` to select a new built-in role.
      
      - If you have any :ref:`custom roles <mongodb-roles>` defined, you can expand
        the :guilabel:`Custom Roles` section and select
        one or more roles from the :guilabel:`Custom Roles` dropdown menu. Click
        :guilabel:`Add Custom Role` to add more custom roles. You can also
        click the :guilabel:`Custom Roles` link to see the custom
        roles for your project.
      
      - Expand the :guilabel:`Specific Privileges` section and select one or more
        :ref:`privileges <atlas-specific-privileges>` from the
        :guilabel:`Specific Privileges` dropdown menu. Click
        :guilabel:`Add Specific Privilege` to add more privileges. This assigns the
        user specific privileges on individual databases and collections.
      
      |service| can apply a built-in role, multiple custom roles, and multiple specific
      privileges to a single database user. 
      
      To remove an applied role or privilege, click :icon-fa4:`trash-o`
      :guilabel:`Delete` next to the role or privilege you wish to delete.
      
      .. note::
      
        |service| doesn't display the :icon-fa4:`trash-o` :guilabel:`Delete` icon
        next to your :guilabel:`Built-in Role`, :guilabel:`Custom Role`, or
        :guilabel:`Specific Privilege` selection if you selected only one option. You
        can delete the selected role or privilege once you apply another role or privilege.
         
      For more information on authorization, see :manual:`Role-Based
      Access Control </core/authorization>` and :manual:`Built-in
      Roles </reference/built-in-roles>` in the MongoDB manual.
      
   .. step:: Specify the resources in the project that the user can access.

      By default, users can access all the clusters and {+fdi+}\s in the 
      project. You can restrict access to specific clusters and {+fdi+}\s
      by doing the following: 
      
      a. Toggle :guilabel:`Restrict Access to Specific Clusters/Federated 
         Database Instances` to :guilabel:`ON`.
      
      #. Select the clusters and {+fdi+}\s to grant the user access to 
         from the :guilabel:`Grant Access To` list.
      
   .. step:: Save as a temporary user or temporary group.
      
      a. Toggle :guilabel:`Temporary User` or :guilabel:`Temporary Group`
         to :guilabel:`On`.
      b. Choose a time after which |service| can delete the
         user or group from the :guilabel:`Temporary User Duration` or
         :guilabel:`Temporary Group Duration` dropdown. You can select one
         of the following time periods for the user or group to exist:
      
         - 6 hours
         - 1 day
         - 1 week
      
      In the :guilabel:`Database Users` tab, temporary users and groups
      display the time remaining until |service| will delete the user or
      group. Once |service| deletes the user or group, any client or
      application that uses the temporary user's or group's credentials
      loses access to the cluster.
      
   .. step:: Click :guilabel:`Add User` or :guilabel:`Add Group`.
