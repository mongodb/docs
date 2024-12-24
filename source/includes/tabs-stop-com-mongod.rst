
Upgrades to a running MongoDB Server process can have 
unexpected results. Before you begin, stop the existing
:program:`mongod` process.

.. tabs::

   .. tab:: Linux
      :tabid: linux

      To stop the ``mongod`` process, run the following
      command:
      
      .. code-block:: bash
      
         sudo systemctl stop mongodb

   .. tab:: Windows
      :tabid: win

      To stop the ``mongod`` process, run the following command
      on ``cmd.exe``:

      .. code-block:: text

         net stop MongoDB


