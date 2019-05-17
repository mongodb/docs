- If the |mms| project does not have authentication settings enabled, but
  the MongoDB process requires authentication, add an automation user
  for the |mms| project with the appropriate roles. The import process
  displays the required roles for the user. The added user becomes the
  project's {+aagent+} user.

- If the |mms| project has authentication settings enabled, add the |mms|
  project's {+aagent+} user to the MongoDB process. To find the
  {+aagent+} user, click :guilabel:`Deployments`, then
  :guilabel:`Security`, then :guilabel:`Users`.

- To find the password for the |mms| project's {+aagent+} user, you
  can use the UI, the API or the configuration backup file:

  Using the UI
    #. Navigate to :guilabel:`Deployment`, :guilabel:`Security`, and
       then :guilabel:`Authentication & TLS/SSL`

    #. Click :guilabel:`Edit Settings`.

    #. Click :guilabel:`Next` until you see the **Configure** 
       |mms| **Agents** page.

    #. Click :guilabel:`Show` to the right of the :guilabel:`Automation Agent Password` field.

       The {+aagent+}'s password displays.

  Using the API
    Use the :doc:`/reference/api/automation-config` endpoint:

    .. code-block:: sh

       curl -u "<username>:<apikey>" --digest -i "<host>/api/public/v1.0/groups/<Group-ID>/automationConfig"

  Using the |mms| Configuration Backup file
    Open the :asetting:`mmsConfigBackup` file in your preferred text
    editor and find the ``autoPwd`` value.

.. example::

   If the |mms| project has :doc:`Username/Password 
   </tutorial/enable-mongodbcr-authentication-for-group>` mechanism 
   selected for its authentication settings, add the project's |mms|
   {+aagent+}s User ``mms-automation`` to the ``admin`` database
   in the MongoDB deployment to import.

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

.. important::

   .. include:: /includes/fact-import-sharded-cluster-to-automation-user-requirements.rst
