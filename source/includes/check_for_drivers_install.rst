Ensure that your MongoDB instance is running and accessible.

.. tabs::

   tabs:
     - id: atlas (cloud)
       name: atlas
       content: |
         Atlas Check

     - id: windows
       name: Windows
       content: |
         To make sure that your MongoDB instance is running on Windows,
         run the following command from the Windows command prompt:
         
         .. code-block:: bat
         
            tasklist /FI "IMAGE\ NAME eq mongod.exe"
         
         If a :binary:`mongod.exe <bin.mongod.exe>` instance is running, you will
         see something like:
         
         .. code-block:: bat
         
            Image Name                     PID Session Name        Session#    Mem Usage
            ========================= ======== ================ =========== ============
            mongod.exe                    8716 Console                    1      9,508 K

     - id: linux
       name: Linux
       content: |
       
         To make sure your MongoDB instance is running on linux, run the
         following command from your terminal:
           
         .. code-block:: sh

            ps -e| grep 'mongod'

         If a :binary:`~bin.mongod` instance is running, you will see
         something like:

         .. code-block:: sh

            89780 ttys026    0:53.48 ./mongod

     - id: macos
       name: macOS
       content: |
       
         To make sure your MongoDB instance is running on mac, run the
         following command from your terminal:
           
         .. code-block:: sh

            ps -e | grep 'mongod'

         If a :binary:`~bin.mongod` instance is running, you will see
         something like:

         .. code-block:: sh

            89780 ttys026    0:53.48 ./mongod
