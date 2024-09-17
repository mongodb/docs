.. Install Procedure for MongoDB Enterprise on Ubuntu

.. procedure::
   :style: normal

   .. step:: Import the Public Key

      .. include:: /includes/deploy/code/enterprise-apt-key

   .. step:: Create the List File

      .. include:: /includes/deploy/enterprise-ubuntu-conf

   .. step:: Reload the Package Database
      
      .. include:: /includes/deploy/code/apt-update

   .. step:: Install MongoDB Enterprise Server

      .. include:: /includes/deploy/code/enterprise-apt-install
