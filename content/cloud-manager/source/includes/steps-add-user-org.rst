.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-org-access-manager-users.rst
      
   .. step:: Specify User.
      
      a. Select :guilabel:`Invite Users` from the :guilabel:`Manage`
         button menu.
      
      b. From the :guilabel:`Add Users` page, enter the new user's
         email address or |jira| username in the combo box.
      
         If the console finds a connected |jira| account, |mms|
         invites the user to the |mms|  project. If the user accepts
         the invite, that user is added to the corresponding |jira|
         group.
      
         After typing in the email address or |jira| username, you
         must either press :guilabel:`Enter` or click on the email
         address or |jira| username beneath the :guilabel:`New User`
         header under the combo box.
      
      c. Repeat for any additional users.
      
   .. step:: Choose the roles for the new Users.
      
      By default, each user is given the :authrole:`Organization Member`
      role. To change or add additional roles for each user, click the
      role dropdown menu, then select the checkboxes for each :ref:`role
      <organization-roles>` you want the user to have in the organization.
      
   .. step:: Invite the Users.
      
      Click :guilabel:`Add Users to Organization`.
      
      |mms| sends an e-mail to the selected users inviting them to join
      the project. Invited users do not have access to the project until
      they accept the invitation. Invitations expire after 30 days.
      