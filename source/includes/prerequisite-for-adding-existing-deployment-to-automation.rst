To add an existing MongoDB deployment to automation:

- If the |mms| group does not have authentication settings enabled, but
  the MongoDB process requires authentication, add an automation user
  for the |mms| group with the appropriate roles. The import process
  will display the required roles for the user. The added user will
  become the group's Automation Agent user.

- If the |mms| group has authentication settings enabled, add the |mms|
  group's Automation Agent user to the MongoDB process. To find the
  Automation Agent user, click :guilabel:`Deployments`, then
  :guilabel:`Security`, then :guilabel:`Users`.

.. important::

   .. include:: /includes/fact-import-sharded-cluster-to-automation-user-requirements.rst

For example, if the |mms| group has :doc:`Username/Password
</tutorial/enable-mongodbcr-authentication-for-group>` mechanism
selected for its authentication settings, add the group's |mms|
Automation Agents User ``mms-automation`` to the ``admin`` database in the
MongoDB deployment to import.

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

To find the password for the |mms| group's Automation Agent user, use the
:doc:`/reference/api/automation-config` endpoint to retrieve the
current configuration and find the ``autoPwd`` value:

.. code-block:: sh

   curl -u "<username>:<apikey>" --digest -i "<host>/api/public/v1.0/groups/<Group-ID>/automationConfig"

You can also find the ``autoPwd`` value in the
:asetting:`mmsConfigBackup` file.
