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
    can use the UI, the |api| or the configuration backup file:

    Using the UI
      #. Navigate to :guilabel:`Deployment`, :guilabel:`Security`, and
         then :guilabel:`Authentication & TLS/SSL`

      #. Click :guilabel:`Edit Settings`.

      #. Click :guilabel:`Next` until you see the **Configure**
         |mms| **Agents** page.

      #. Click :guilabel:`Show` to the right of the
         :guilabel:`MongoDB Agent Password` field.

         The {+mdbagent+}'s password displays.

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
