.. only:: not latex

   .. raw:: html
   
      <div class="sequence-block"><div class="bullet-block"><div class="sequence-step">1</div></div>

   .. _step-1-monitoring-build-pymongo-c-ext-monitoring-install-python-gcc:

   Install gcc and Python Packages
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


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

   .. _step-2-monitoring-build-pymongo-c-ext-monitoring-install-pymongo-curl:

   Install PyMongo
   ~~~~~~~~~~~~~~~


   .. code-block:: sh
   
      curl http://pypi.python.org/packages/source/p/pymongo/pymongo-2.6.3.tar.gz > pymongo-2.6.3.tar.gz

   .. raw:: html
   
      </div>

.. only:: not latex

   .. raw:: html
   
      <div class="sequence-block"><div class="bullet-block"><div class="sequence-step">3</div></div>

   .. _step-3-monitoring-build-pymongo-c-ext-monitoring-install-pymongo-extract:

   Extract the PyMongo Files
   ~~~~~~~~~~~~~~~~~~~~~~~~~


   .. code-block:: sh
   
      tar -zxvf pymongo-2.6.3.tar.gz

   .. raw:: html
   
      </div>

.. only:: not latex

   .. raw:: html
   
      <div class="sequence-block"><div class="bullet-block"><div class="sequence-step">4</div></div>

   .. _step-4-monitoring-build-pymongo-c-ext-monitoring-install-pymongo-egg:

   Build the ``.egg`` File
   ~~~~~~~~~~~~~~~~~~~~~~~


   .. code-block:: sh
   
      cd pymongo-2.6.3
      python setup.py bdist_egg
      

   Once built, you can find ``.egg`` file in the dist/ sub-directory. The
   file name will resemble ``pymongo-2.6.3-py2.7-linux-x86_64.egg`` but may
   have a different name depending on your platform and the version of
   python you use to compile.

   .. raw:: html
   
      </div>

.. only:: not latex

   .. raw:: html
   
      <div class="sequence-block"><div class="bullet-block"><div class="sequence-step">5</div></div>

   .. _step-5-monitoring-build-pymongo-c-ext-monitoring-install-pymongo-egg-target:

   Install the ``.egg`` File on Target System
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


   .. code-block:: sh
   
      sudo easy_install pymongo-2.6.2-py2.7-linux-x86_64.egg
      

   .. raw:: html
   
      </div>

.. only:: not latex

   .. raw:: html
   
      <div class="sequence-block"><div class="bullet-block"><div class="sequence-step">6</div></div>

   .. _step-6-monitoring-build-pymongo-c-ext-install-monitoring-agent:

   Install the Monitoring Agent
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~


   Copy the ``.egg`` file to the target system and issue this command to
   install the package:

   .. code-block:: sh
   
      cd mms-agent
      nohup python agent.py > /LOG_DIRECTORY/agent.log 2>&1 &
      

   Replace ``LOG-DIRECTORY`` with the path to your MongoDB logs.

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
   
   
   Step 2: Install PyMongo
   ~~~~~~~~~~~~~~~~~~~~~~~
   
   .. code-block:: sh
   
      curl http://pypi.python.org/packages/source/p/pymongo/pymongo-2.6.3.tar.gz > pymongo-2.6.3.tar.gz
   
   
   Step 3: Extract the PyMongo Files
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   
   .. code-block:: sh
   
      tar -zxvf pymongo-2.6.3.tar.gz
   
   
   Step 4: Build the ``.egg`` File
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   
   .. code-block:: sh
   
      cd pymongo-2.6.3
      python setup.py bdist_egg
      
   
   Once built, you can find ``.egg`` file in the dist/ sub-directory. The
   file name will resemble ``pymongo-2.6.3-py2.7-linux-x86_64.egg`` but may
   have a different name depending on your platform and the version of
   python you use to compile.
   
   
   Step 5: Install the ``.egg`` File on Target System
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   
   .. code-block:: sh
   
      sudo easy_install pymongo-2.6.2-py2.7-linux-x86_64.egg
      
   
   
   Step 6: Install the Monitoring Agent
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   
   Copy the ``.egg`` file to the target system and issue this command to
   install the package:
   
   .. code-block:: sh
   
      cd mms-agent
      nohup python agent.py > /LOG_DIRECTORY/agent.log 2>&1 &
      
   
   Replace ``LOG-DIRECTORY`` with the path to your MongoDB logs.
   
