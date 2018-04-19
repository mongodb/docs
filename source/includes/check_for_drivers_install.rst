.. tabs::

   tabs:
     - id: atlas (cloud)
       name: atlas
       content: |
         Atlas Check

     - id: windows
       name: windows
       content: |
         Windows check

     - id: linux
       name: linux
       content: |
         To make sure your MongoDB process is running on linux, run the following command:
           
         .. code-block:: sh

            ps -e| grep 'mongod'

         If a :binary:`~bin.mongod` process is running, you will see something like:

         .. code-block:: sh

            89780 ttys026    0:53.48 ./mongod

     - id: macos
       name: macOs
       content: |
         To make sure your MongoDB process is running on mac, run the following command:
           
         .. code-block:: sh

            ps -e | grep 'mongod'

         If a :binary:`~bin.mongod` process is running, you will see something like:

         .. code-block:: sh

            89780 ttys026    0:53.48 ./mongod
