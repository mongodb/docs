.. procedure::
   :style: normal
      
   .. step:: Log in to the |application|.
      
   .. step:: From the notification banner, click Update All Agents.
      
      The :guilabel:`Update to MongoDB Agent` page opens to start the
      update process. The :guilabel:`Introducing the MongoDB Agent` step
      displays. When you have finished reading this step, click
      :guilabel:`Next`.
      
   .. step:: Add any existing configuration options for your legacy Monitoring Agent.
      
      If Automation did not manage your Monitoring Agent, you can add any
      Monitoring settings you had before at the :guilabel:`Add Custom
      Configuration Options for your MongoDB Agent (Optional)` step.
      
      To add options that you had for your
      :ref:`Monitoring Agent <mongodb-agent-monitoring-settings>`, under the
      :guilabel:`Monitoring Configurations` section:
      
      a. Type the desired
         :ref:`setting <mongodb-agent-monitoring-settings>` in the
         :guilabel:`Setting` box and the corresponding value in the
         :guilabel:`Value` box.
      
      #. To add more than one :guilabel:`Setting`, click the
         :guilabel:`+ Add Setting` link. Another row appears.
      
      #. Repeat until all settings have been added.
      
      #. Once you have added all the settings necessary for your deployment, click :guilabel:`Next`.
      
      You can click the :icon-fa5:`trash-alt` to remove any settings that
      you have added.
      
      .. important::
      
         |mms| does not validate any of these settings. Make sure that the
         settings and values are correct.
      
   .. step:: Install the {+mdbagent+}.
      
      a. Click :guilabel:`View Agent Install Instructions`. The
         :guilabel:`Install Agent Instructions` modal opens.
      b. From the :guilabel:`Select Your Server's Operating System` menu,
         select {+agent-dl-msi-windows+}.
      c. Click :guilabel:`Next`. The
         :guilabel:`Install New MongoDB Agent` modal opens.
      
   .. step:: Install the {+mdbagent+}.
      
      The :guilabel:`{+mdbagent+} Installation Instructions` box
      displays the following information:
      
      - :guilabel:`Project ID`
        (Required for binding to a project)
      
      - :guilabel:`API Key`
      
        If you do not have an API Key, click :icon-fa5:`plus`
        :ref:`Generate Key <generate-agent-api-key>`.
      
      .. warning::
      
         Some or all of these values are required in a later step. Copy
         these values then store them where you can access them later.
      
   .. step:: Run the {+mdbagent+} Windows Installer.
      
      .. tabs::
      
         tabs:
           - id: interactive
             name: Interactive
             content: |
      
               a. After the ``MSI`` downloads, double-click:
      
                  :file:`mongodb-mms-automation-agent-<VERSION>.windows_x86_64.msi`
      
                  .. note::
      
                     The use of ``mongodb-mms-automation`` in the
                     filename is a legacy artifact and does not mean
                     that the {+mdbagent+} is being installed with
                     Automation configured.
      
               #. If a security warning appears, click :guilabel:`Run`.
      
               #. At the :guilabel:`Configuration/Log Folder` step
      
                  Provide the directory into which these files are saved.
      
               #. At the :guilabel:`Key Type` step, select :guilabel:`Agent
                  API Key` to bind to a specific :cloudmgr:`project </reference/glossary/#std-term-project>`.
      
               #. Enter the appropriate Agent keys.
      
                  .. note::
      
                     These keys are provided in the :guilabel:`MongoDB
                     Agent Installation Instructions` modal described in
                     the previous step.
      
                  - Type your Project ID into the :guilabel:`Project ID`
                    field.
      
                  - Type your Agent API Key into the :guilabel:`Agent API
                    Key` field. 
      
               #. At the :guilabel:`MongoDB Paths` step, specify the Log
                  and Backup directories
      
               #. At the :guilabel:`Windows Firewall Configuration` step,
                  click your preferred firewall configuration.
      
                  If you click :guilabel:`Configure firewall rules allowing
                  access from only the specified |ipaddr| addresses.`, type
                  the necessary |ipv4| addresses into the provided box.
      
               #. (Conditional) Windows enables `Stealth Mode <https://technet.microsoft.com/en-us/library/dd448557(v=ws.10).aspx>`__
                  for the Windows Firewall by default. If you have not
                  disabled it on the MongoDB host on which you are
                  installing the {+mdbagent+}, disable it now.
                  Stealth Mode significantly degrades the performance
                  and capability of the {+mdbagent+}. Click
                  :guilabel:`Disable Stealth Mode`.
      
               #. (Conditional) Windows does not enable `Disk Performance Counters <https://blogs.technet.microsoft.com/askcore/2012/03/16/windows-performance-monitor-disk-counters-explained/>`__
                  by default. If you have not enabled Disk Performance
                  Counters for the MongoDB host, click :guilabel:`Enable
                  Disk Performance Counters`. The {+mdbagent+}
                  uses these counters for some of its hardware monitoring
                  activities.
      
               #. Click :guilabel:`Install`.
      
               #. Click :guilabel:`Finish` once setup is complete.
      
           - id: unattended
             name: Unattended
             content: |
      
               After the ``MSI`` downloads, you can run an unattended
               install. You run an unattended install from the command line
               in either the Command Prompt or PowerShell. To learn
               more about unattended installs, see Microsoft's
               documentation on `Standard Installer Command-Line Options
               <https://docs.microsoft.com/en-us/windows/desktop/msi/standard-installer-command-line-options>`__
      
               To run the ``MSI`` installer unattended from the command
               line, invoke ``msiexec.exe`` with the ``/q`` and ``/i``
               flags and a combination of required and optional
               parameters:
      
               .. list-table::
                  :widths: 20 15 65
                  :header-rows: 1
      
                  * - Parameter
                    - Necessity
                    - Value
      
                  * - ``MMSAPIKEY``
                    - Required
                    - Agent |api| key of your |mms| project.
                  * - ``MMSGROUPID``
                    - Required
                    - Unique Identifier of your |mms| project.
                  * - ``CONFIGLOGDIR``
                    - Optional
                    - Absolute file path to which |mms| should write the
                      {+mdbagent+} configuration file.
                  * - ``LOGFILE``
                    - Optional
                    - Absolute file path to which |mms| should write the
                      {+mdbagent+} log
                  * - ``MMSCONFIGBACKUP``
                    - Optional
                    - Absolute file path to the |mms| automation
                      configuration backup |json| file.
      
               .. example::
      
                  To install the {+mdbagent+} unattended,
                  invoke ``msiexec.exe`` with the following options:
      
                  .. code-block:: powershell
      
                     msiexec.exe /q /i "C:\PATH\TO\mongodb-mms-automation-agent-<VERSION>.windows_x86_64.msi" MMSGROUPID=<GROUP.ID> MMSAPIKEY=<AGENT.API.ID> MMSBASEURL="<http://opsmanager.example.com:8080>" LOGFILE="C:\MMSData\Server\Log\automation-agent.log" MMSCONFIGBACKUP="C:\MMSData\MongoDB\mms-cluster-config-backup.json"
      
   .. step:: Finish the installation of the MongoDB Agent.
      In the :guilabel:`Install Agent Instructions` modal, click
      :guilabel:`Done`.
      
   .. step:: Verify that the {+mdbagent+} is running.
      
      In the :guilabel:`Install Agent Instructions` modal,
      wait for each deployment to show :guilabel:`Verified` in the
      :guilabel:`Install the {+mdbagent+}` step.
      
      .. important::
      
         All authentication SCRAM, |ldap|, and Kerberos credentials from
         legacy Agents are retained after the update. All ``.pem`` key
         files are retained as well.
      
      Click :guilabel:`Next`.
      
   .. step:: (Optional) Change the location of the {+mdbagent+} binaries and configuration backup files.
      
      Your system policies or practices may require the MongoDB binaries
      and |mms| configuration backup file to be located somewhere other
      than the default location of ``%SystemDrive%\MMSMongoDB\versions``.
      
      .. note::
      
         Windows sets the ``%SystemDrive%`` environment variable to the
         drive on which you installed Windows. By default, you are
         directed to install Windows on the ``C:`` drive. To find your
         ``%SystemDrive%``, issue with following command from `PowerShell
         <https://msdn.microsoft.com/en-us/powershell/>`__:
      
         .. code-block:: ps1
      
            get-childitem env:SystemDrive
      
      If you want to store these files in a different directory, follow
      these procedures:
      
      **To change the location of the {+mdbagent+} Binaries**
      
      a. .. include:: /includes/nav/list-agents.rst
         
      #. Click the :guilabel:`Downloads & Settings` tab.
      
      #. Below the :guilabel:`Download Directory` heading, click
         :icon-mms:`edit` to the right of the path shown in
         :guilabel:`Download Directory (Windows)`.
      
      #. Change the path to the new path you want.
      
      #. Click :guilabel:`Save`.
      
      #. Create the new directory you specified on each host that runs
         an {+mdbagent+}. Use Windows Explorer to move the file or
         issue the following command from a Command Prompt or
         `PowerShell <https://msdn.microsoft.com/en-us/powershell/>`__:
      
         .. code-block:: ps1
      
            md \<newPath>
      
         .. important::
      
            Make sure that the system user that runs the {+mdbagent+} can write
            to this new directory. This is usually the ``SYSTEM`` user,
            which requires no additional configuration unless you changed
            the user.
      
      **To change the location of the {+mdbagent+} configuration backup**
      
      a. Open the :ref:`{+mdbagent+} configuration file
         <automation-agent-config-file-location>` in your preferred text
         editor.
      
      #. Change the :setting:`mmsConfigBackup` setting to the new path
         for the configuration backup file. Replace ``X`` in the following example with the drive
         letter on which your backup is stored.
      
         .. code-block:: ini
      
            mmsConfigBackup=X:\<newPath>\mms-cluster-config-backup.json
      
      #. Save the {+mdbagent+} configuration file.
      
      #. Move the configuration backup file to the new directory. Use
         Windows Explorer to move the file or issue the following
         command from a Command Prompt or `PowerShell <https://msdn.microsoft.com/en-us/powershell/>`__:
      
         .. code-block:: ps1
      
            move %SystemDrive%\MMSMongoDB\versions\mms-cluster-config-backup.json \<newPath>
      
   .. step:: Repeat the installation procedure for each MongoDB host.
