- If :manual:`mongod </reference/program/mongod/#mongodb-binary-bin.mongod>` is enabled as a service on the deployment, 
  a race condition might result where ``systemd`` starts ``mongod`` on reboot, 
  rather than the Automation. To prevent this issue, ensure the ``mongod`` 
  service is disabled before you add your deployment to Automation:

  1. Verify whether the ``mongod`` service is enabled:

     .. code-block:: sh
     
        sudo systemctl is-enabled mongod.service

  2. If the service is enabled, disable it:

     .. code-block:: sh

        sudo systemctl disable mongod.service

- If the |mms| project doesn't have authentication settings enabled but
  the MongoDB process requires authentication, add the {+mdbagent+} user
  for the |mms| project with the appropriate roles. The import process
  displays the required roles for the user. The added user becomes the
  project's {+mdbagent+} user.

- If the |mms| project has authentication settings enabled, add the
  |mms| project's {+mdbagent+} user to the MongoDB process.

  - To find the {+mdbagent+} user, click :guilabel:`Deployments`, then
    :guilabel:`Security`, then :guilabel:`Users`.

  - To find the password for the |mms| project's {+mdbagent+} user, use
    one of the following methods:
  
    .. tabs::

       .. tab:: Using the UI
          :tabid: ui
    
          Follow the steps in the :ref:`Add MongoDB Processes procedure
          <add-existing-mongodb-hosts>` to launch the wizard in the UI.
          When you reach the modal that says :guilabel:`Do you want to add automation to this deployment?`:

          1. Select 
             :guilabel:`Add Automation and Configure Authentication`.
          #. Click :guilabel:`Show Password`.

       .. tab:: Using the API
          :tabid: api
      
          Use the :doc:`/reference/api/automation-config` endpoint:

          .. code-block:: sh

             curl --user "{username}:{apiKey}" --digest \
               --header "Accept: application/json" \
               --include \
               --request GET "<host>/api/public/v1.0/groups/<Group-ID>/automationConfig"

       .. tab:: Using the Configuration Backup file
          :tabid: file
      
          Open the :setting:`mmsConfigBackup` file in your preferred text editor and find the ``autoPwd`` value.
   
  - In {+mongosh+}, use the :method:`db.createUser()` method to add the 
    |mms| project's {+mdbagent+} user to the MongoDB process.
    For example, if the |mms| project uses :doc:`Username/Password 
    </tutorial/enable-mongodbcr-authentication-for-group>` authentication, 
    run the following command to add the ``mms-automation`` user to
    the ``admin`` database in the MongoDB deployment to import:
    
    .. code-block:: javascript

       db.getSiblingDB("admin").createUser(
         {
           user: "mms-automation",
           pwd: "<password>",
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

- When you add a cluster under |mms|, |mms| automatically enables log
  :manual:`rotation </tutorial/rotate-log-files/>`, which could collide
  with your existing ``logRotate`` configuration for ``mongod`` or
  ``mongos`` logs. To prevent this collision, do the following:  

  - Disable your ``logRotate`` configuration for ``mongod`` or ``mongos``
    processes. 
  - Remove the ``systemLog.logRotate`` and ``systemLog.logAppend``
    :manual:`options
    </reference/configuration-options/#systemlog-options>` from the 
    ``mongod`` or ``mongos`` process :manual:`configuration
    </reference/configuration-options/#configuration-file>` to use the
    default of |mms|. 

- The import process requires that the authentication credentials and
  keyfiles are the same on the source and destination clusters. To learn
  more, see :ref:`Authentication Credentials on Source and Destination Clusters
  <auth-creds-on-source-and-destination>`.
  
- To successfully import an existing replica set to |mms|, 
  the instance must be healthy.
  