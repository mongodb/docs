.. only:: not latex

   .. raw:: html
   
      <div class="sequence-block"><div class="bullet-block"><div class="sequence-step">1</div></div>

   .. _step-1-monitoring-install-debian-ubuntu-monitoring-install-python:

   Install Python Packages and Extensions
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   .. class:: step-1

      Install ``python-setuptools`` to install any remaining Python
      dependencies. Most operating systems provide packages for
      ``setuptools``.

      .. code-block:: sh
      
         sudo apt-get install python-setuptools
         

   .. raw:: html
   
      </div>

.. only:: not latex

   .. raw:: html
   
      <div class="sequence-block"><div class="bullet-block"><div class="sequence-step">2</div></div>

   .. _step-2-monitoring-install-debian-ubuntu-monitoring-install-python-c:

   Install Python C Extensions
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~

   .. class:: step-2

      While the C extensions are not required for |monitoring|, they
      significantly improve performance. You must have a C compiler (e.g.
      ``gcc``) and Python header files installed on your system. Type this
      command to install Python headers:

      .. code-block:: sh
      
         sudo apt-get install build-essential python-dev
         

   .. raw:: html
   
      </div>

.. only:: not latex

   .. raw:: html
   
      <div class="sequence-block"><div class="bullet-block"><div class="sequence-step">3</div></div>

   .. _step-3-monitoring-install-debian-ubuntu-monitoring-install-upgrade-pymongo:

   Install and Upgrade PyMongo
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~

   .. class:: step-3

      To upgrade to the latest version of the driver, type this command:

      .. code-block:: sh
      
         sudo easy_install -U pymongo
         

      For more information about PyMongo installation, see the Additional
      Information section below.  If PyMongo was previously installed without
      C extensions,  :doc:`install PyMongo C extensions
      </monitoring/tutorial/install-pymongo-c-extensions>`.  If you are
      installing PyMongo and the Monitoring agent on systems that do  not have
      C compilers, :doc:`build PyMongo packages with PyMongo C  extensions
      </monitoring/tutorial/building-pymongo-packages-with-c>`.

   .. raw:: html
   
      </div>

.. only:: not latex

   .. raw:: html
   
      <div class="sequence-block"><div class="bullet-block"><div class="sequence-step">4</div></div>

   .. _step-4-monitoring-install-debian-ubuntu-install-monitoring-agent:

   Install the MongoDB Monitoring Agent
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   .. class:: step-4

      Download the latest MMS monitoring agent from the |MMS|, located on the
      :guilabel:`Settings` page and the :guilabel:`Monitoring Agent` tab.
      With Python software requirements installed, install the MongoDB
      monitoring agent with these commands:

      .. code-block:: sh
      
         cd mms-agent
         nohup python agent.py > /LOG_DIRECTORY/agent.log 2>&1 &
         

      Replace ``LOG-DIRECTORY`` with the path to your MongoDB logs.  [Add any
      common agent install gotchas from support as sentence or paragraph.  Or
      above Procedures as a new Considerations section.]

   .. raw:: html
   
      </div>

.. only:: latex

   
   Step 1: Install Python Packages and Extensions
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   
   Install ``python-setuptools`` to install any remaining Python
   dependencies. Most operating systems provide packages for
   ``setuptools``.
   
   .. code-block:: sh
   
      sudo apt-get install python-setuptools
      
   
   
   Step 2: Install Python C Extensions
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   
   While the C extensions are not required for |monitoring|, they
   significantly improve performance. You must have a C compiler (e.g.
   ``gcc``) and Python header files installed on your system. Type this
   command to install Python headers:
   
   .. code-block:: sh
   
      sudo apt-get install build-essential python-dev
      
   
   
   Step 3: Install and Upgrade PyMongo
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   
   To upgrade to the latest version of the driver, type this command:
   
   .. code-block:: sh
   
      sudo easy_install -U pymongo
      
   
   For more information about PyMongo installation, see the Additional
   Information section below.  If PyMongo was previously installed without
   C extensions,  :doc:`install PyMongo C extensions
   </monitoring/tutorial/install-pymongo-c-extensions>`.  If you are
   installing PyMongo and the Monitoring agent on systems that do  not have
   C compilers, :doc:`build PyMongo packages with PyMongo C  extensions
   </monitoring/tutorial/building-pymongo-packages-with-c>`.
   
   
   Step 4: Install the MongoDB Monitoring Agent
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   
   Download the latest MMS monitoring agent from the |MMS|, located on the
   :guilabel:`Settings` page and the :guilabel:`Monitoring Agent` tab.
   With Python software requirements installed, install the MongoDB
   monitoring agent with these commands:
   
   .. code-block:: sh
   
      cd mms-agent
      nohup python agent.py > /LOG_DIRECTORY/agent.log 2>&1 &
      
   
   Replace ``LOG-DIRECTORY`` with the path to your MongoDB logs.  [Add any
   common agent install gotchas from support as sentence or paragraph.  Or
   above Procedures as a new Considerations section.]
   
