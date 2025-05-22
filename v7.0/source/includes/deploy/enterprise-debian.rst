.. Install Procedure for MongoDB Enterprise on Debian

.. procedure::
   :style: normal

   .. step:: Import the public key.

      .. include:: /includes/deploy/code/enterprise-apt-key

   .. step:: Create the list file.

      .. include:: /includes/deploy/enterprise-debian-conf

   .. step:: Reload the package database.
      
      .. include:: /includes/deploy/code/apt-update

   .. step:: Install MongoDB Enterprise Server.

      .. include:: /includes/deploy/code/enterprise-apt-install
