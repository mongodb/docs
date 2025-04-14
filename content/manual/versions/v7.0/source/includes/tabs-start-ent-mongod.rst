
Start the Enterprise :program:`mongod` process.

.. tabs::

   .. tab:: Linux
      :tabid: linux

      To start MongoDB Enterprise Server, run the following
      command:

      .. code-block:: bash

         sudo systemctl start mongodb

   .. tab:: Windows
      :tabid: win

      To start MongoDB Enterprise Server, run the following
      command in ``cmd.exe``:

      .. code-block:: bash

         net start MongoDB

   .. tab:: macOS
      :tabid: macos

      To start MongoDB Enterprise Server, run the following
      command from the console:

      .. code-block:: bash

         mongod --config /usr/local/etc/mongodb.conf

