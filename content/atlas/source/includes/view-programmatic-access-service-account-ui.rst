To view the details of a service account in a project using the
{+atlas-ui+}:

.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-project-access-manager.rst

   .. step:: Click the :guilabel:`Applications` tab.

   .. step:: Click :guilabel:`Service Accounts`.

      All the service accounts with access to your project are listed.

      Click the name of a service account to view its details, including:

      - The obfuscated client secret for the service account
      - The date the client secret was last used
      - The date the client secret was created
      - The |ipaddr| addresses from which the service account can access the |api|
      - The :ref:`roles <project-roles>` the service account has been assigned
