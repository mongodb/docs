If the MongoDB instance requires Username/Password authentication, make
sure you have
:doc:`enabled Username/Password authentication </tutorial/enable-mongodbcr-authentication-for-group>` 
for the |mms| group.

Once you have enabled authentication for the |mms| group, add the |mms|
group's :term:`Automation Agent` user to the MongoDB instance:

#. Find the |mms| group's Automation Agent user.
  
   In |mms|, click :guilabel:`Deployments`, then :guilabel:`Security`,
   then :guilabel:`Users`.

#. Find the password for the |mms| group's Automation Agent user using
   either the UI, the API or the configuration backup file:
 
   Using the UI
     #. Navigate to :guilabel:`Deployment`, :guilabel:`Security`, and
        then :guilabel:`Authentication & TLS/SSL`.

     #. Click :guilabel:`Edit Settings`.

     #. Click :guilabel:`Next` until you see the :guilabel:`Configure
        Agents` page.

     #. Click :guilabel:`Show` to the right of the
        :guilabel:`Automation Agent Password` field.

        Where the Automation Agent's password was greyed out, it is now
        displayed inline.

   Using the API
     Use the :doc:`/reference/api/automation-config` endpoint.

     .. example::
        You can use ``curl`` to request your automation configuration:

        .. code-block:: sh

           curl -u "<username>:<apikey>" --digest -i "<host> \
             api/public/v1.0/groups/<Group-ID>/automationConfig"

        Its response includes the ``auth.autoPwd`` key and its value:

        .. code-block:: javascript
           :emphasize-lines: 2-5

           ...
           "auth" : {
              "autoUser": <string>,
              "autoPwd": <string>,
              ...
           }
           ...

   Using the |mms| Configuration Backup file
     #. Connect to another host running your Automation Agent.

     #. Open the |mms| Configuration Backup JSON file in your
        preferred text editor.

     #. Find then copy the Automation Agent password
        (``auth.autoPwd``) value.

     .. note:: 
        The path to the Configuration Backup JSON file can be found
        in the :asetting:`mmsConfigBackup` setting of the Automation
        configuration file.

#. Connect to the MongoDB instance to be imported and add the
   Automation Agent user.

   .. example::
      Add the group's |mms| Automation Agent user ``mms-automation``
      to the ``admin`` database in the MongoDB instance to import.

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
                 'restore'
              ]
            }
         )

.. important::

   .. include:: /includes/fact-import-sharded-cluster-to-automation-user-requirements.rst
