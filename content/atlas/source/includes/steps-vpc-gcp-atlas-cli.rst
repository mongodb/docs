.. procedure::
   :style: normal

   .. step:: In |service|, configure your network peering connection.

      .. note::

         Since |gcp| uses global VPCs, you need to create only one peering connection.

      .. include:: /includes/extracts/atlas-networking-peering-create-and-watch-gcp.rst

   .. step:: In |gcp|, create the peering connection.

      a. In the :guilabel:`Google Cloud Console`, click
         :guilabel:`VPC network peering`.

      #. Click :guilabel:`Create Connection`.

      #. Click :guilabel:`Continue`.

      #. In :guilabel:`Name`, enter a name for your peering
         connection.

      #. In :guilabel:`Your VPC Network`, enter the name of your
         |gcp| |vpc| network.

      #. In :guilabel:`Peered VPC network`, select
         :guilabel:`In another project`.

      #. In :guilabel:`Project ID`, enter your |service| GCP Project ID.

         To find this name in the |vpc| Peering view in |service|. In
         the :guilabel:`Security` section of the left navigation:

         i. .. include:: /includes/nav/list-network-access.rst

         #. Click the :guilabel:`Peering` tab.

      #. In :guilabel:`VPC network name`, enter your |service| |vpc|
         Name.

         To find this name in the |vpc| Peering view in |service|:

         i. .. include:: /includes/nav/list-network-access.rst

         #. Click the :guilabel:`Peering` tab.

      .. include:: /includes/fact-vpc-peering-connections-max.rst
