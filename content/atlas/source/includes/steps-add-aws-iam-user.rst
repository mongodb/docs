.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-db-access.rst
      
   .. step:: Open the :guilabel:`Add New Database User` dialog box.

      a. If it isn't already displayed, click the
         :guilabel:`Database Users` tab.
      
      #. Click :icon-fa5:`plus` :guilabel:`Add New Database User`.
      
   .. step:: Select :guilabel:`AWS IAM`.

      In the :guilabel:`Authentication Method` section of the :guilabel:`Add
      New Database User` modal window, select the box marked :guilabel:`AWS IAM`.
      
   .. step:: Enter user information.

      a. Select a user type from the :guilabel:`AWS IAM Type` dropdown menu.
      
      #. Enter an AWS user :abbr:`ARN (Amazon Resource Name)`. Click the
         :guilabel:`See instruction below` link for help with finding your ARN.
      
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
      
   .. step:: Save as temporary user.

      Toggle :guilabel:`Temporary User` to :guilabel:`On` and choose
      a time after which |service| can delete the user from the
      :guilabel:`Temporary User Duration` dropdown. You can select one of the
      following time periods for the user to exist:
      
      - 6 hours
      - 1 day
      - 1 week
      
      In the :guilabel:`Database Users` tab, temporary users display
      the time remaining until |service| will delete the user. Once
      |service| deletes the user, any client or application that uses
      the temporary user's credentials loses access to the cluster.
      
   .. step:: Click :guilabel:`Add User`.
