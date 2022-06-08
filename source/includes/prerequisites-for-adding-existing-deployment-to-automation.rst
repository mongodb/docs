- If `mongod` is enabled as a service on the deployment, this can 
result in a race condition where `systemd` starts `mongod` on reboot, 
rather than the Automation. To prevent this, ensure the `mongod` 
service is disabled before adding your deployment to Automation:

  - Check if the `mongod` service is enabled:

  .. code-block:: sh
     
     sudo systemctl is-enabled mongod.service

  - If the service is enabled, disable it:

  .. code-block:: sh

     sudo systemctl disable mongod.service

- If the |mms| project does not have authentication settings enabled,
  but the MongoDB process requires authentication, add the {+mdbagent+}
  user for the |mms| project with the appropriate roles.

  - The import process displays the required roles for the user.
  - The added user becomes the project's {+mdbagent+} user.

- If the |mms| project has authentication settings enabled, add the
  |mms| project's {+mdbagent+} user to the MongoDB process.

  - To find the {+mdbagent+} user, click :guilabel:`Deployments`, then
    :guilabel:`Security`, then :guilabel:`Users`.

  - To find the password for the |mms| project's {+mdbagent+} user, you
    can use the |api| or the configuration backup file:

    Using the |api|
      Use the :doc:`/reference/api/automation-config` endpoint:

      .. code-block:: sh

         curl --user "{username}:{apiKey}" --digest \
           --header "Accept: application/json" \
           --include \
           --request GET "<host>/api/public/v1.0/groups/<Group-ID>/automationConfig"

    Using the |mms| Configuration Backup file
      Open the :setting:`mmsConfigBackup` file in your preferred text
      editor and find the ``autoPwd`` value.

.. example::

   If the |mms| project has
   :doc:`Username/Password </tutorial/enable-mongodbcr-authentication-for-group>`
   mechanism selected for its authentication settings, add the
   project's |mms| {+mdbagent+}s User ``mms-automation`` to the
   ``admin`` database in the MongoDB deployment to import.

   .. code-block:: javascript

      db.getSiblingDB("admin").createUser(
         {
           user: "mms-automation",
           pwd: <password>,
           roles: [
             'clusterAdmin',
             'dbAdminAnyDatabase',
             'readWriteAnyDatabase',
             'userAdminAnyDatabase',
             'restore',
             'backup'
           ]
         }
      )
