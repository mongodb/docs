.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-project-access-manager.rst
      
   .. step:: Click the :guilabel:`Users` or :guilabel:`Teams` tab.
      
   .. step:: Click :guilabel:`Invite to Project`.
      
   .. step:: Add |a-service| user or team.
      
      a. Enter the new user's
         email address or |jira| username, or an existing team name.
      
         If the console finds a connected |jira| account, |service|
         invites the user to the |service| project. If the user accepts
         the invite, that user is added to the corresponding |jira|
         group.
      
         If you want to grant access to a new team, you must first
         :ref:`create the team <create-team>`. 
      
      #. Press :guilabel:`Enter` or click on the email
         address, |jira| username, or team name.
      
      #. Repeat for any additional users or teams.
      
   .. step:: Select roles for the new user or team.

      By default, each user is given the :authrole:`Project Read Only` 
      role. To change or add additional roles for each user or 
      team, click on the role dropdown menu, then select the checkboxes for
      each :ref:`role <project-roles>` you want the user or team to
      have in the project.
      
      All team members share the roles assigned to the team on this
      project.
      
   .. step:: Click :guilabel:`Grant Access`.
      
      |service| sends an email to the selected users inviting them to join
      the project. Invited users do not have access to the project until
      they accept the invitation. Invitations expire after 30 days.
      
