..
   Comment: The nested lists need blank lines before and after each list
            plus extra indents 

.. list-table::
   :header-rows: 1
   :widths: 15 20

   * - Sync Type
     - Required Destination Permissions

   * - Default
     - - atlasAdmin
       - :authaction:`bypassWriteBlockingMode`
       
   * - Dual write-blocking, reversing, or multiple reversals
     - - atlasAdmin
       - :authaction:`bypassWriteBlockingMode`

For details on Atlas roles, see :ref:`Atlas User Roles
<user-roles>`.

To update Atlas user permissions, see:
:atlas:`Manage Access to a Project </access/manage-project-access/>`.

During synchronization, ``mongosync`` uses the
:dbcommand:`setUserWriteBlockMode` command to block writes on the
destination cluster. The database user that ``mongosync`` uses to
connect to the destination cluster must have both of the following
actions at the same time:

- :authaction:`setUserWriteBlockMode`, which allows ``mongosync`` to run
  the command that blocks writes.

- :authaction:`bypassWriteBlockingMode`, which allows ``mongosync`` to
  keep writing to the destination while writes are blocked.

If either action is missing, ``mongosync`` stops and reports the missing
privileges.

``atlasAdmin`` is a built-in |service| role, and these two actions are
privilege actions, not roles. To grant them, create a custom role that
includes both actions and assign the custom role to the database user.

.. tabs::

   .. tab:: Atlas UI
      :tabid: ui

      To create the custom role and assign it to the database user:

      .. procedure::
         :style: normal

         .. step:: Go to the :guilabel:`Database & Network Access` page.

            a. In |service|, select your organization from the
               organization menu in the navigation bar.

            #. Select your project from the :guilabel:`Projects` menu
               in the navigation bar.

            #. In the sidebar, click :guilabel:`Database & Network
               Access` under the :guilabel:`Security` heading.

         .. step:: Create the custom role.

            a. Click the :guilabel:`Custom Roles` tab.

            #. Click :icon-fa5:`plus` :guilabel:`Add New Custom Role`.

            #. For :guilabel:`Custom Role Name`, enter a name such as
               ``mongosyncWriteBlocking``.

            #. In the :guilabel:`Action or Role` dropdown menu, select
               the ``setUserWriteBlockMode`` action. Click
               :guilabel:`Add an action or role` and select the
               ``bypassWriteBlockingMode`` action.

            #. Click :guilabel:`Add Custom Role`.

         .. step:: Assign the custom role to the database user.

            a. Click the :guilabel:`Database Users` tab.

            #. Click :icon-fa4:`pencil` :guilabel:`Edit` for the
               database user that ``mongosync`` uses.

            #. Expand the :guilabel:`Custom Roles` section and select
               ``mongosyncWriteBlocking`` from the
               :guilabel:`Custom Roles` dropdown menu.

            #. Save your changes.

   .. tab:: Atlas CLI
      :tabid: atlascli

      To create the custom role, run the following command:

      .. code-block:: shell

         atlas customDbRoles create mongosyncWriteBlocking \
           --privilege SET_USER_WRITE_BLOCK,BYPASS_USER_WRITE_BLOCK

      To assign the custom role to the database user, run the following
      command. The ``--role`` option replaces the user's existing
      roles, so list the roles that the user already has along with the
      custom role. For example, to keep the ``atlasAdmin`` role:

      .. code-block:: shell

         atlas dbusers update <username> \
           --role atlasAdmin,mongosyncWriteBlocking
