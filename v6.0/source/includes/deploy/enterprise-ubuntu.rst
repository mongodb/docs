.. Install Procedure for MongoDB Enterprise on Ubuntu

.. procedure::
   :style: normal

   .. step:: Import the public key.

      .. include:: /includes/deploy/code/enterprise-apt-key

   .. step:: Create the list file.

      .. include:: /includes/deploy/enterprise-ubuntu-conf

   .. step:: Reload the package database.
      
      .. include:: /includes/deploy/code/apt-update

   .. step:: Install MongoDB Enterprise Server.

      .. include:: /includes/deploy/code/enterprise-apt-install
