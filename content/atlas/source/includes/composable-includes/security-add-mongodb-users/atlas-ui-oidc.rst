Add Database Users
==================

Select an authentication mechanism and follow the steps to create
a new database user using the {+atlas-ui+}.

.. include:: /includes/steps-create-oidc-user.rst

View Database Users and Certificates
=====================================

To view |service| database users and X.509 certificates in the
      {+atlas-ui+}:

.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-db-access.rst

   .. step:: View |service| database users.

      a. If it's not already displayed, click the
         :guilabel:`Database Users` tab.

      b. Click :icon-fa4:`pencil` :guilabel:`Edit` for the user
         to view their privileges, authentication details, and
         X.509 certificates.

Modify Database Users
=====================

.. include:: /includes/modify-db-user-ui.rst

Delete Database Users
=====================

To delete existing users for an |service| project using the {+atlas-ui+}:

.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-db-access.rst

      .. step:: Delete an existing user.

         a. If it's not already displayed, click the    
            :guilabel:`Database Users` tab.

         #. Click :icon-fa4:`trash-o` :guilabel:`Delete` next to 
            the user you want to delete.

         #. Click :guilabel:`Delete` again to confirm.
