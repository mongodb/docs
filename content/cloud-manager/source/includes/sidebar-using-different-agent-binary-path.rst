By default, the Agent binaries and |mms|
configuration backup file are located in 
``/var/lib/mongodb-mms-automation``. 
If you want to store these files in a different
directory, follow these procedures:

**To change the location of the Agent Binaries:**

a. .. include:: /includes/nav/list-agents.rst

#. Change the path.

   i. Click :guilabel:`Downloads & Settings`.

   #. Below the :guilabel:`Download Directory` heading, click the
      pencil icon to the right of the path shown in
      :guilabel:`Download Directory (Linux)`.

   #. Change the path to the new path you want.

   #. Click :guilabel:`Save`.

   #. Create the new directory you specified on each host that runs
      an Agent.

      .. code-block:: sh
         
         sudo mkdir -m 755 -p /<newPath>

**To change the location of the Agent configuration backup:**

a. Open the
   :ref:`Agent configuration file <automation-agent-config-file-location>`
   in your preferred text editor.

b. Change the :setting:`mmsConfigBackup` setting to the new path for
   the configuration backup file.

   .. code-block:: ini

      mmsConfigBackup=/<newPath>/mms-cluster-config-backup.json

c. Save the Agent configuration file.

d. Move the configuration backup file to the new directory.

   .. code-block:: sh

      sudo mv /var/lib/mongodb-mms-automation/mms-cluster-config-backup.json /<newPath>
