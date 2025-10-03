Uninstall MongoDB Search and MongoDB Vector Search
--------------------------------------------------

To completely remove MongoDB Search and MongoDB Vector Search from a system, you must 
remove the container image, the configuration files, and any directories containing data and logs. 
The following section guides you through the necessary steps.

.. procedure:: 
   :style: normal

   .. step:: Drop the ``mongotUser`` user

      .. include:: /includes/installation/uninstall/drop-mongotUser.rst

   .. step:: Stop the ``mongot`` 

      To stop the ``mongot`` process, stop the container image running in Docker.

   .. step:: Remove any configuration files

      .. include:: /includes/installation/uninstall/remove-mongot-configs.rst

   .. step:: Remove the keyfile and password file

      .. include:: /includes/installation/uninstall/remove-keyfile-passwordfile.rst

   .. step:: Remove any logs and the log directory for ``mongot``

      .. include:: /includes/installation/uninstall/remove-mongot-logs.rst
   
   .. step:: Remove the data directory for ``mongot``

      .. include:: /includes/installation/uninstall/remove-mongot-data-directory.rst