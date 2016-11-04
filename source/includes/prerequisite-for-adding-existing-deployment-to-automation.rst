- If the |mms| group does not have authentication settings enabled, but
  the MongoDB process requires authentication, add an automation user
  for the |mms| group with the appropriate roles. The import process
  displays the required roles for the user. The added user becomes the
  group's Automation Agent user.

- If the |mms| group has authentication settings enabled, add the |mms|
  group's Automation Agent user to the MongoDB process. To find the
  Automation Agent user, click :guilabel:`Deployments`, then
  :guilabel:`Security`, then :guilabel:`Users`.

- To find the password for the |mms| group's Automation Agent user, you
  can use the UI, the API or the configuration backup file:

  Using the UI
    #. Navigate to :guilabel:`Deployment`, :guilabel:`Security`, and
       then :guilabel:`Authentication & TLS/SSL`

    #. Click :guilabel:`Edit Settings`.

    #. Click :guilabel:`Next` until you see the :guilabel:`Configure
       |mms| Agents` page.

    #. Click :guilabel:`Show` to the right of the :guilabel:`Automation
       Agent Password` field.

       The Automation Agent's password displays.

  Using the API
    Use the :doc:`/reference/api/automation-config` endpoint:

    .. code-block:: sh

       curl -u "<username>:<apikey>" --digest -i "<host>/api/public/v1.0/groups/<Group-ID>/automationConfig"

  Using the |mms| Configuration Backup file
    Open the :asetting:`mmsConfigBackup` file in your preferred text
    editor and find the ``autoPwd`` value.

.. example::

   If the |mms| group has :doc:`Username/Password 
   </tutorial/enable-mongodbcr-authentication-for-group>` mechanism 
   selected for its authentication settings, add the group's |mms|
   Automation Agents User ``mms-automation`` to the ``admin`` database
   in the MongoDB deployment to import.

   .. code-block:: javascript

      use admin

      db.createUser(
         {
           user: "mms-automation",
           pwd: <password>,
           roles: [ 
              'clusterAdmin',
              'dbAdminAnyDatabase',
              'readWriteAnyDatabase',
              'userAdminAnyDatabase',
              'restore'
           ]
         }
      )

.. important::

   .. include:: /includes/fact-import-sharded-cluster-to-automation-user-requirements.rst
