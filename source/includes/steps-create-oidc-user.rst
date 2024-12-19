.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-db-access.rst
   
   .. step:: Open the :guilabel:`Add New Database User or Group` dialog box.

      Click :icon-fa5:`plus` :guilabel:`Add New Database User or Group`.

      .. note::
         
         Until you :ref:`apply your Workforce IdP to Atlas
         <apply-oidc-idp>`, this button says :icon-fa5:`plus`
         :guilabel:`Add New Database User`.
      
   .. step:: Select :guilabel:`Federated Auth`.
      
      In the :guilabel:`Authentication Method` section, select :guilabel:`Federated Auth`.
       
      .. note::
          
         Until you :ref:`enable Workforce IdP for your organization <configure-oidc>`,
         you can't select this box.
      
   .. step:: Select Identity Provider and Identifier
      
      a. In the :guilabel:`Select Identity Provider` section, select a configured 
      |oidc| |idp-full|.
      
      #. Specify either the user identifier or group identifier associated with 
         your configured Workforce |idp-full|.

      .. note:: 

         For Azure Entra ID users, this value maps to the Object Id of your 
         Azure user group rather than user group name.
      
   .. step:: Assign user or group privileges.
      
      To assign privileges to the new user or group, do one or more of the 
      following tasks:
      
      - Select a :ref:`built-in role <atlas-user-privileges>` from the
        :guilabel:`Built-in Role` dropdown menu.
        
        - You can select one built-in role per database group in the {+atlas-ui+}.
        
        - If you delete the default option, you can click :guilabel:`Add Built-in Role`
          to select a new built-in role.
      
      - Select or add :ref:`custom roles <mongodb-roles>`.
      
        - If you have any custom roles defined, you can expand
          the :guilabel:`Custom Roles` section and select
          one or more roles from the :guilabel:`Custom Roles` dropdown menu.
        
        - Click :guilabel:`Add Custom Role` to add more custom roles.
        
        - Click the :guilabel:`Custom Roles` link to see the custom
          roles for your project.
      
      - Add :ref:`privileges <atlas-specific-privileges>`.
      
        - Expand the :guilabel:`Specific Privileges` section and select one or more
          privileges from the :guilabel:`Specific Privileges` dropdown menu.
          
        - Click :guilabel:`Add Specific Privilege` to add more privileges. This assigns
          the group specific privileges on individual databases and collections.
      
      - Remove an applied role or privilege.
      
        - Click :icon-fa4:`trash-o` :guilabel:`Delete` next to the 
           role or privilege to delete.
      
        .. note::
      
          |service| doesn't display the :icon-fa4:`trash-o` :guilabel:`Delete` icon
          next to your :guilabel:`Built-in Role`, :guilabel:`Custom Role`, or
          :guilabel:`Specific Privilege` selection if you selected only one option. You
          can delete the selected role or privilege once you apply another role or privilege.
         
      |service| can apply a built-in role, multiple custom roles, and multiple specific
      privileges to a database group. 
      
      To learn more about authorization, see :manual:`Role-Based
      Access Control </core/authorization>` and :manual:`Built-in
      Roles </reference/built-in-roles>` in the MongoDB manual.
      
   .. step:: Specify the resources in the project that the user or group can access.
      
      By default, groups can access all the {+clusters+} and {+fdi+}\s in the 
      project. To restrict access to specific {+clusters+} and {+fdi+}\s: 
      
      a. Toggle :guilabel:`Restrict Access to Specific Clusters/Federated 
         Database Instances` to :guilabel:`On`.
      
      #. Select the {+clusters+} and {+fdi+}\s to grant the group access to 
         from the :guilabel:`Grant Access To` list.
      
   .. step:: Save as a temporary user or group.
      
      Toggle :guilabel:`Temporary User` or :guilabel:`Temporary Group` to 
      :guilabel:`On` and choose a time after which |service| can delete the user 
      or group from the :guilabel:`Temporary User Duration` or 
      :guilabel:`Temporary Group Duration` dropdown. You can select one of the
      following time periods for the group to exist:
      
      - 6 hours
      - 1 day
      - 1 week
      
      In the :guilabel:`Database Users` tab, temporary users or groups display
      the time remaining until |service| deletes the users or group. After
      |service| deletes the user or group, any client or application that uses
      the temporary user's or group's credentials loses access to the {+cluster+}.
      
   .. step:: Add the new database user or group.
   
      Do one of the following steps:
      
      - If you added a user, click the :guilabel:`Add User` button.
      
      - If you added a group, click the :guilabel:`Add Group` button.
