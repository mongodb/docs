.. Install Procedure for MongoDB Community on Ubuntu

.. procedure::
   :style: normal

   .. step:: Import the public key.

      .. include:: /includes/deploy/code/community-apt-key

   .. step:: Create the list file.

      .. include:: /includes/deploy/community-ubuntu-conf

   .. step:: Reload the package database.
      
      .. include:: /includes/deploy/code/apt-update

   .. step:: Install MongoDB Community Server.

      .. include:: /includes/deploy/code/community-apt-install
