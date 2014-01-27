.. only:: not latex

   .. raw:: html
   
      <div class="sequence-block"><div class="bullet-block"><div class="sequence-step">1</div></div>

   .. _step-1-monitoring-deploy-production-daemonize-the-process:

   Daemonize the Process
   ~~~~~~~~~~~~~~~~~~~~~


   As a temporary measure, the following command will start the agent
   process detached from the current terminal session:

   .. code-block:: sh
   
      nohup python agent.py > /[LOG-DIRECTORY]/agent.log 2>&1 &
      

   Replace ``[LOG-DIRECTORY]`` with the path to your MongoDB logs.  This
   command allows the agent survive the current terminal session and writes
   all messages to the ``agent.log`` file. You may include this command in
   your MongoDB control script or use your system's ``/etc/rc.local``
   equivalent; however, avoid running the agent as root.

   .. raw:: html
   
      </div>

.. only:: not latex

   .. raw:: html
   
      <div class="sequence-block"><div class="bullet-block"><div class="sequence-step">2</div></div>

   .. _step-2-monitoring-deploy-production-create-control-scripts:

   Create Control Scripts
   ~~~~~~~~~~~~~~~~~~~~~~


   If you need to create an initialization script to control the daemonized
   process, consider the resources listed in the Additional  Information
   section below.  You may also examine the scripts in your system's
   ``/etc/init.d/`` or ``/etc/rc.d/`` directory. Ensure that the agent does
   not run with root privileges.  Use the ``update-rc.d`` utility on Debian
   and Ubuntu and the ``chkconfig`` tool on Red Hat related systems to add
   these scripts to the initialization process. Be sure to test the control
   script configuration. It is essential that you be able to start, stop,
   and restart the agent following a system reboot.

   These resources provide details about control scripts:

   - `Ubuntu Boot Up How To
   <https://help.ubuntu.com/community/UbuntuBootupHowto>`_

   - `Debian Linux Control/Init Scripts
   <http://wiki.debian.org/LSBInitScripts>`_

   - `Arch Linux rc.d Scripts
   <https://wiki.archlinux.org/index.php/Writing_rc.d_scripts>`_

   - Debian and Ubuntu Systems have an example control script located at
   ``/etc/init.d/skeleton`` that you can use as a template.

   - Red Hat Enterprise Linux and related distributions (e.g. Fedora,
   CentOS, etc.) provide example control scripts in
   the``/usr/share/doc/initscripts-*/sysvinitfiles/`` directory.

   .. raw:: html
   
      </div>

.. only:: not latex

   .. raw:: html
   
      <div class="sequence-block"><div class="bullet-block"><div class="sequence-step">3</div></div>

   .. _step-3-monitoring-deploy-production-automate-agent-deployments:

   Automate Agent Deployments
   ~~~~~~~~~~~~~~~~~~~~~~~~~~


   The agent you downloaded from the |mms| site is automatically configured
   with the credentials for your account. You can download a configured
   copy of the Monitoring agent by from the :guilabel:`Monitoring Agent`
   section of the :guilabel:`Settings` page by selecting
   :guilabel:`Download Monitoring Agent (zip)` or :guilabel:`Download
   Monitoring Agent (tar.gz)`. The URL for the configured agent will
   resemble the following: language: none

   .. code-block:: none
   
      https://mms.mongodb.com/settings/mmsAgent/<hash>/mms-monitoring-agent-<group-name>.zip
      

   Alternately, you may automate Monitoring agent deployments using an
   unconfigured agent and the API from the :guilabel:`API Settings` section
   of the :guilabel:`Settings` page. The unconfigured agent is available at
   the following URLs:

   .. code-block:: none
   
      https://mms.mongodb.com/settings/mms-monitoring-agent.zip
      https://mms.mongodb.com/settings/mms-monitoring-agent.tar.gz
      

   Extract this archive and edit the ``settings.py`` file, replacing the
   strings "``@API_KEY@``" with the "API" defined for your account.  You
   may embed this process in your existing deployment scripts to
   automatically install or redeploy new agents.

   .. raw:: html
   
      </div>

.. only:: not latex

   .. raw:: html
   
      <div class="sequence-block"><div class="bullet-block"><div class="sequence-step">4</div></div>

   .. _step-4-monitoring-deploy-production-configure-any-proxies:

   Configure any Proxies
   ~~~~~~~~~~~~~~~~~~~~~


   You will need to export the "``https_proxy``" environment variable (or
   "``HTTPS_PROXY``" on Windows). To do so, issue the following command
   before running the Monitoring agent:

   .. code-block:: sh
   
      export https_proxy='http://proxyserver.example.net:port"
      

   Replace "``http://proxyserver.example.net``" with the name or IP address
   of the proxy server and "``port`` with the TCP port that the proxy
   service runs on. You may choose to export this variable inside of your
   control script.

   .. raw:: html
   
      </div>

.. only:: latex

   
   Step 1: Daemonize the Process
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   
   As a temporary measure, the following command will start the agent
   process detached from the current terminal session:
   
   .. code-block:: sh
   
      nohup python agent.py > /[LOG-DIRECTORY]/agent.log 2>&1 &
      
   
   Replace ``[LOG-DIRECTORY]`` with the path to your MongoDB logs.  This
   command allows the agent survive the current terminal session and writes
   all messages to the ``agent.log`` file. You may include this command in
   your MongoDB control script or use your system's ``/etc/rc.local``
   equivalent; however, avoid running the agent as root.
   
   
   Step 2: Create Control Scripts
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   
   If you need to create an initialization script to control the daemonized
   process, consider the resources listed in the Additional  Information
   section below.  You may also examine the scripts in your system's
   ``/etc/init.d/`` or ``/etc/rc.d/`` directory. Ensure that the agent does
   not run with root privileges.  Use the ``update-rc.d`` utility on Debian
   and Ubuntu and the ``chkconfig`` tool on Red Hat related systems to add
   these scripts to the initialization process. Be sure to test the control
   script configuration. It is essential that you be able to start, stop,
   and restart the agent following a system reboot.
   
   These resources provide details about control scripts:
   
   - `Ubuntu Boot Up How To
   <https://help.ubuntu.com/community/UbuntuBootupHowto>`_
   
   - `Debian Linux Control/Init Scripts
   <http://wiki.debian.org/LSBInitScripts>`_
   
   - `Arch Linux rc.d Scripts
   <https://wiki.archlinux.org/index.php/Writing_rc.d_scripts>`_
   
   - Debian and Ubuntu Systems have an example control script located at
   ``/etc/init.d/skeleton`` that you can use as a template.
   
   - Red Hat Enterprise Linux and related distributions (e.g. Fedora,
   CentOS, etc.) provide example control scripts in
   the``/usr/share/doc/initscripts-*/sysvinitfiles/`` directory.
   
   
   Step 3: Automate Agent Deployments
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   
   The agent you downloaded from the |mms| site is automatically configured
   with the credentials for your account. You can download a configured
   copy of the Monitoring agent by from the :guilabel:`Monitoring Agent`
   section of the :guilabel:`Settings` page by selecting
   :guilabel:`Download Monitoring Agent (zip)` or :guilabel:`Download
   Monitoring Agent (tar.gz)`. The URL for the configured agent will
   resemble the following: language: none
   
   .. code-block:: none
   
      https://mms.mongodb.com/settings/mmsAgent/<hash>/mms-monitoring-agent-<group-name>.zip
      
   
   Alternately, you may automate Monitoring agent deployments using an
   unconfigured agent and the API from the :guilabel:`API Settings` section
   of the :guilabel:`Settings` page. The unconfigured agent is available at
   the following URLs:
   
   .. code-block:: none
   
      https://mms.mongodb.com/settings/mms-monitoring-agent.zip
      https://mms.mongodb.com/settings/mms-monitoring-agent.tar.gz
      
   
   Extract this archive and edit the ``settings.py`` file, replacing the
   strings "``@API_KEY@``" with the "API" defined for your account.  You
   may embed this process in your existing deployment scripts to
   automatically install or redeploy new agents.
   
   
   Step 4: Configure any Proxies
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   
   You will need to export the "``https_proxy``" environment variable (or
   "``HTTPS_PROXY``" on Windows). To do so, issue the following command
   before running the Monitoring agent:
   
   .. code-block:: sh
   
      export https_proxy='http://proxyserver.example.net:port"
      
   
   Replace "``http://proxyserver.example.net``" with the name or IP address
   of the proxy server and "``port`` with the TCP port that the proxy
   service runs on. You may choose to export this variable inside of your
   control script.
   
