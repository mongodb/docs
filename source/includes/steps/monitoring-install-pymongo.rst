.. only:: not latex

   .. raw:: html
   
      <div class="sequence-block"><div class="bullet-block"><div class="sequence-step">1</div></div>

   .. _step-1-monitoring-install-pymongo-monitoring-install-pymongo-gcc-packages:

   Install gcc and Python Packages
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   .. class:: step-1

      For Debian and Ubuntu environments, issue this command:

      .. code-block:: sh
      
         sudo apt-get install build-essential python-dev

      For Red Hat, CentOS, and Fedora environments, issue this command:

      .. code-block:: sh
      
         sudo yum install gcc python-devel

   .. raw:: html
   
      </div>

.. only:: not latex

   .. raw:: html
   
      <div class="sequence-block"><div class="bullet-block"><div class="sequence-step">2</div></div>

   .. _step-2-monitoring-install-pymongo-monitoring-install-pymongo-install-pip:

   Install the pip Utility
   ~~~~~~~~~~~~~~~~~~~~~~~

   .. class:: step-2

      .. code-block:: sh
      
         sudo easy_install pip
         

   .. raw:: html
   
      </div>

.. only:: not latex

   .. raw:: html
   
      <div class="sequence-block"><div class="bullet-block"><div class="sequence-step">3</div></div>

   .. _step-3-monitoring-install-pymongo-monitoring-install-pymongo-remove:

   Remove PyMongo
   ~~~~~~~~~~~~~~

   .. class:: step-3

      .. code-block:: sh
      
         sudo pip uninstall pymongo
         

   .. raw:: html
   
      </div>

.. only:: not latex

   .. raw:: html
   
      <div class="sequence-block"><div class="bullet-block"><div class="sequence-step">4</div></div>

   .. _step-4-monitoring-install-pymongo-monitoring-install-pymongo-reinstall:

   Re-Install PyMongo
   ~~~~~~~~~~~~~~~~~~

   .. class:: step-4

      .. code-block:: sh
      
         sudo pip install pymongo
         

   .. raw:: html
   
      </div>

.. only:: not latex

   .. raw:: html
   
      <div class="sequence-block"><div class="bullet-block"><div class="sequence-step">5</div></div>

   .. _step-5-monitoring-install-pymongo-monitoring-install-pymongo-restart-agent:

   Restart Monitoring Agent
   ~~~~~~~~~~~~~~~~~~~~~~~~

   .. class:: step-5

      .. code-block:: sh
      
         cd mms-agent
         nohup python agent.py > /LOG_DIRECTORY/agent.log 2>&1 &
         

      Replace ``LOG-DIRECTORY`` with the path to your MongoDB logs.  When you
      restart your agent there is a 5 minute timeout before the agent will
      begin sending data to MMS again.

   .. raw:: html
   
      </div>

.. only:: latex

   
   Step 1: Install gcc and Python Packages
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   
   For Debian and Ubuntu environments, issue this command:
   
   .. code-block:: sh
   
      sudo apt-get install build-essential python-dev
   
   For Red Hat, CentOS, and Fedora environments, issue this command:
   
   .. code-block:: sh
   
      sudo yum install gcc python-devel
   
   
   Step 2: Install the pip Utility
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   
   .. code-block:: sh
   
      sudo easy_install pip
      
   
   
   Step 3: Remove PyMongo
   ~~~~~~~~~~~~~~~~~~~~~~
   
   .. code-block:: sh
   
      sudo pip uninstall pymongo
      
   
   
   Step 4: Re-Install PyMongo
   ~~~~~~~~~~~~~~~~~~~~~~~~~~
   
   .. code-block:: sh
   
      sudo pip install pymongo
      
   
   
   Step 5: Restart Monitoring Agent
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   
   .. code-block:: sh
   
      cd mms-agent
      nohup python agent.py > /LOG_DIRECTORY/agent.log 2>&1 &
      
   
   Replace ``LOG-DIRECTORY`` with the path to your MongoDB logs.  When you
   restart your agent there is a 5 minute timeout before the agent will
   begin sending data to MMS again.
   
