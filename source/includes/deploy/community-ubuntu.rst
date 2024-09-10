.. Install Procedure for MongoDB Community on Ubuntu

.. procedure::
   :style: normal

   .. step:: Import the Public Key

      .. include:: /includes/deploy/code/community-apt-key

   .. step:: Create the List File

      .. include:: /includes/deploy/community-ubuntu-conf

   .. step:: Reload the Package Database
      
      .. include:: /includes/deploy/code/apt-update

   .. step:: Install MongoDB Community Server

      .. include:: /includes/deploy/code/community-apt-install
