.. only:: html or dirhtml or singlehtml

   .. raw:: html
   
      <div class="sequence-block"><div class="bullet-block"><div class="sequence-step">1</div></div>

   Find your MongoDB instance.
   ```````````````````````````

   .. tabs::
   
     tabs:
       - id: windows
         name: windows
         content: |
           The Python examples below assume that you have `connected to a MongoDB replica set and have accessed a database
           <http://api.mongodb.com/python/current/tutorial.html#making-a-connection-with-mongoclient/>`__
           that contains an ``inventory`` collection.
   
       - id: linux
         name: linux
         content: |
           To make sure your MongoDB process is running on linux, run the following command:
             .. cssclass:: copyable-code
             .. code-block:: sh
   
               ps -ef | grep 'mongod'
   
           If a mongod process is running, you will see something like:
   
             .. code-block:: sh
   
               502  6990   540   0  7Feb18 ttys008    8:53.94 ./mongod
   
   
   

   .. raw:: html
   
      </div>

.. only:: not(html or dirhtml or singlehtml)

   Step 1: Find your MongoDB instance.
   ```````````````````````````````````

   .. tabs::
   
     tabs:
       - id: windows
         name: windows
         content: |
           The Python examples below assume that you have `connected to a MongoDB replica set and have accessed a database
           <http://api.mongodb.com/python/current/tutorial.html#making-a-connection-with-mongoclient/>`__
           that contains an ``inventory`` collection.
   
       - id: linux
         name: linux
         content: |
           To make sure your MongoDB process is running on linux, run the following command:
             .. cssclass:: copyable-code
             .. code-block:: sh
   
               ps -ef | grep 'mongod'
   
           If a mongod process is running, you will see something like:
   
             .. code-block:: sh
   
               502  6990   540   0  7Feb18 ttys008    8:53.94 ./mongod
   
   
   

.. only:: html or dirhtml or singlehtml

   .. raw:: html
   
      <div class="sequence-block"><div class="bullet-block"><div class="sequence-step">2</div></div>

   Access to Mongo Shell
   `````````````````````

   If you have properly installed mongo, you should be able to access your mongod
   instance with:
     .. cssclass:: copyable-code
     .. code-block:: sh
   
       mongo
   
   If a mongo shell successfully starts, you will see some log output to the console
   and then a command prompt. Type the following to make sure you are running mongo shell,
   it will return the version number of the shell.
   
     .. cssclass:: copyable-code
     .. code-block:: sh
   
       > db.version()
   

   .. raw:: html
   
      </div>

.. only:: not(html or dirhtml or singlehtml)

   Step 2: Access to Mongo Shell
   `````````````````````````````

   If you have properly installed mongo, you should be able to access your mongod
   instance with:
     .. cssclass:: copyable-code
     .. code-block:: sh
   
       mongo
   
   If a mongo shell successfully starts, you will see some log output to the console
   and then a command prompt. Type the following to make sure you are running mongo shell,
   it will return the version number of the shell.
   
     .. cssclass:: copyable-code
     .. code-block:: sh
   
       > db.version()
   

