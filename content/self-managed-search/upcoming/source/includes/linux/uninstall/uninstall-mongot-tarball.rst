.. procedure::                                                             
   :style: normal

   .. step:: Drop the ``mongotUser`` user

      .. include:: /includes/linux/uninstall/drop-mongotUser.rst
 
   .. step:: Stop the ``mongot`` 

      To stop the ``mongot`` binary, use ``Ctrl + C`` in the terminal session it's 
      running in.

   .. step:: Remove any configuration files
      
      .. include:: /includes/linux/uninstall/remove-mongot-configs.rst

   .. step:: Remove the keyfile and password file

      .. include:: /includes/linux/uninstall/remove-keyfile-passwordfile.rst

   .. step:: Remove any logs and the log directory for ``mongot``

      .. include:: /includes/linux/uninstall/remove-mongot-logs.rst
   
   .. step:: Remove the data directory for ``mongot``

      .. include:: /includes/linux/uninstall/remove-mongot-data-directory.rst