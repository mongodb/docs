.. only:: not latex

   .. raw:: html
   
      <div class="sequence-block"><div class="bullet-block"><div class="sequence-step">1</div></div>

   .. _step-1-monitoring-install-windows-monitoring-install-windows-pymongo:

   Install PyMongo
   ~~~~~~~~~~~~~~~

   .. class:: step-1

      Use the Windows installer to install `PyMongo from PyPi
      <http://pypi.python.org/pypi/pymongo/>`_.  If PyMongo was previously
      installed without C extensions, :doc:`install PyMongo C extensions
      </monitoring/tutorial/install-pymongo-c-extensions>`.  If you are
      installing PyMongo and the Monitoring agent on systems that do not have
      C compilers, :doc:`build PyMongo packages with PyMongo C extensions
      </monitoring/tutorial/building-pymongo-packages-with-c>`.

   .. raw:: html
   
      </div>

.. only:: not latex

   .. raw:: html
   
      <div class="sequence-block"><div class="bullet-block"><div class="sequence-step">2</div></div>

   .. _step-2-monitoring-install-windows-monitoring-install-enable-powershell:

   Enable Script Execution in PowerShell
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   .. class:: step-2

      This returns the current execution policy. Save this value for future
      use in Step 4 below. If the policy is "``Unrestricted``" you can proceed
      to the next step. If the policy is not "``Unrestricted``" issue the
      following command:

      .. code-block:: powershell
      
         Set-ExecutionPolicy -ExecutionPolicy Unrestricted
         

      Confirm the policy change when prompted.

   .. raw:: html
   
      </div>

.. only:: not latex

   .. raw:: html
   
      <div class="sequence-block"><div class="bullet-block"><div class="sequence-step">3</div></div>

   .. _step-3-monitoring-install-windows-monitoring-install-mms-agent-windows:

   Install the MMS Monitoring Agent
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   .. class:: step-3

      Start an administrator command window. Change to the folder containing
      the Monitoring agent files. Run ``mongommsinstall.bat``. If this
      succeeds, the Monitoring agent will be running and will start on system
      boot.

      .. code-block:: sh
      
         _`Python 2.7 64-bit Windows Installer`: http://www.python.org/ftp/python/2.7.2/python-2.7.2.amd64.msi
         

      Now you can start and stop the Windows service to control the MMS agent.
      Consult the ``WINDOWS.txt`` file for more information.

   .. raw:: html
   
      </div>

.. only:: not latex

   .. raw:: html
   
      <div class="sequence-block"><div class="bullet-block"><div class="sequence-step">4</div></div>

   .. _step-4-monitoring-install-windows-install-monitoring-disable-powershell:

   Disable Script Execution in PowerShell
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   .. class:: step-4

      If you have changed the execution policy, after the installation has
      completed successfully set it back to its original value using the
      following command:

      .. code-block:: powershell
      
         Set-ExecutionPolicy -ExecutionPolicy <original value>
         

      Replace ``<original value>`` with the value that you recorded above in
      Step 2.

   .. raw:: html
   
      </div>

.. only:: latex

   
   Step 1: Install PyMongo
   ~~~~~~~~~~~~~~~~~~~~~~~
   
   Use the Windows installer to install `PyMongo from PyPi
   <http://pypi.python.org/pypi/pymongo/>`_.  If PyMongo was previously
   installed without C extensions, :doc:`install PyMongo C extensions
   </monitoring/tutorial/install-pymongo-c-extensions>`.  If you are
   installing PyMongo and the Monitoring agent on systems that do not have
   C compilers, :doc:`build PyMongo packages with PyMongo C extensions
   </monitoring/tutorial/building-pymongo-packages-with-c>`.
   
   
   Step 2: Enable Script Execution in PowerShell
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   
   This returns the current execution policy. Save this value for future
   use in Step 4 below. If the policy is "``Unrestricted``" you can proceed
   to the next step. If the policy is not "``Unrestricted``" issue the
   following command:
   
   .. code-block:: powershell
   
      Set-ExecutionPolicy -ExecutionPolicy Unrestricted
      
   
   Confirm the policy change when prompted.
   
   
   Step 3: Install the MMS Monitoring Agent
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   
   Start an administrator command window. Change to the folder containing
   the Monitoring agent files. Run ``mongommsinstall.bat``. If this
   succeeds, the Monitoring agent will be running and will start on system
   boot.
   
   .. code-block:: sh
   
      _`Python 2.7 64-bit Windows Installer`: http://www.python.org/ftp/python/2.7.2/python-2.7.2.amd64.msi
      
   
   Now you can start and stop the Windows service to control the MMS agent.
   Consult the ``WINDOWS.txt`` file for more information.
   
   
   Step 4: Disable Script Execution in PowerShell
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   
   If you have changed the execution policy, after the installation has
   completed successfully set it back to its original value using the
   following command:
   
   .. code-block:: powershell
   
      Set-ExecutionPolicy -ExecutionPolicy <original value>
      
   
   Replace ``<original value>`` with the value that you recorded above in
   Step 2.
   
