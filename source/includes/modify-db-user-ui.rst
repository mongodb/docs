To modify existing users for an |service| project:

.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-db-access.rst

   .. step:: Modify an existing user.

      a. If it's not already displayed, click the 
         :guilabel:`Database Users` tab.

      #. Click :icon-fa4:`pencil` :guilabel:`Edit` for the user you 
         want to modify.
   
         You can modify the privileges and authentication details 
         assigned to the user. You cannot modify the authentication 
         method.

         The following table describes what you can do for each user:

         .. list-table::
            :widths: 50 50
            :header-rows: 1

            * - User Type
              - Action

            * - SCRAM authenticated users
              - Edit a user's password.

            * - X.509 certificate authenticated users
              - Download a new certificate.

            * - AWS IAM users
              - Modify database access privileges.

            * - Temporary users
              - Modify the time period the user exists or make the 
                user a permanent user, provided the user's expiration 
                date has not already passed.

         .. note::

            You cannot change a permanent user into a temporary user. 
            If you change a temporary user into a permanent user, you 
            cannot make it temporary again.

      #. Click :guilabel:`Update User` to save the changes.
