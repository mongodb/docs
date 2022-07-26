To modify existing users for an |service| project:

#. In the :guilabel:`Security` section in the left navigation,
   click :guilabel:`Database Access`. The :guilabel:`Database Users` tab
   displays.

#. Click :icon-fa4:`pencil`
   :guilabel:`Edit` for the user you want to modify.
   You can modify the privileges and authentication details assigned to
   the user. You cannot modify the authentication method.

   - For SCRAM authenticated users, you can edit a user's password.

   - For X.509 certificate authenticated users, you can download a new
     certificate.

   - For AWS IAM users, you can only modify database access privileges.

   For temporary users, you can also modify the time
   period the user exists or make the user a permanent user,
   provided the user's expiration date has not already passed.

   .. note::

      You cannot change a permanent user into a temporary user. If you
      change a temporary user into a permanent user, you cannot make it
      temporary again.

#. Click :guilabel:`Update User` to save the changes.