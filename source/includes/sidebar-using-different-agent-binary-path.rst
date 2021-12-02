.. topic:: Using a Different Path than ``/var/lib``

   By default, the Agent binaries and |mms|
   configuration backup file are located in 
   ``/var/lib/mongodb-mms-automation``. 
   If you want to store these files in a different
   directory, follow these procedures:

   **To change the location of the Agent Binaries:**

   a. Click :guilabel:`Deployment`, then :guilabel:`Agents`, and
      then :guilabel:`Downloads & Settings`.

   b. Below the :guilabel:`Download Directory` heading, click the
      pencil icon to the right of the path shown in
      :guilabel:`Download Directory (Linux)`.

   c. Change the path to the new path you want.

   d. Click :guilabel:`Save`.

   e. Create the new directory you specified on each host that runs
      an Agent.

      .. code-block:: sh

           sudo mkdir -m 755 -p /<newPath>

   **To change the location of the Agent configuration backup:**

   a. Open the
      :ref:`Agent configuration file <automation-agent-config-file-location>`
      in your preferred text editor.

   b. Change the :asetting:`mmsConfigBackup` setting to the new path for
      the configuration backup file.

      .. code-block:: ini

         mmsConfigBackup=/<newPath>/mms-cluster-config-backup.json

   c. Save the Agent configuration file.

   d. Move the configuration backup file to the new directory.

      .. code-block:: sh

         sudo mv /var/lib/mongodb-mms-automation/mms-cluster-config-backup.json /<newPath>
