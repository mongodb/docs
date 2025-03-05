.. procedure::
   :style: normal
      
   .. step:: Add a new Network Peering connection for your project.
      
      .. note::
      
         You can skip this step if you are using the {+atlas-cli+} to add a network peering connection.
      
      .. include:: /includes/nav/list-network-access.rst
      
      #. In the :guilabel:`Peering` tab, click :icon-fa5:`plus`
         :guilabel:`Add Peering Connection`.
      
   .. step:: In |service|, configure your network peering connection.
      
      .. note::
      
         Since |gcp| uses global VPCs, you need to create only one peering connection.
      
      .. tabs::
      
       .. tab:: {+atlas-cli+}
          :tabid: atlascli
      
          .. include:: /includes/extracts/atlas-networking-peering-create-and-watch-gcp.rst
      
       .. tab:: {+atlas-ui+}
          :tabid: ui
      
          a. In the :guilabel:`Peering Connection` modal, select
             :guilabel:`Google Cloud Platform` and click
             :guilabel:`Next`.
      
          #. To create the |vpc| Peering connection, fill in the
             requested information in the :guilabel:`Peering Connection` modal:
      
             .. list-table::
                :header-rows: 1
                :widths: 20 80
      
                * - Field
                  - Description
      
                * - :guilabel:`Project ID`
      
                  - |gcp| Project ID of the peer |vpc|. Refer to the
                    dialog box for instructions on finding your
                    :guilabel:`GCP Project ID`.
      
                * - :guilabel:`VPC Name`
      
                  - Name of the peer |vpc|. Refer to the dialog box for
                    instructions on finding your :guilabel:`VPC Name`.
      
                * - :guilabel:`Atlas CIDR`
                  - |cidr| block for your Atlas cluster.
      
                    .. include:: /includes/fact-gcp-peering-atlas-cidr-block.rst
      
          #. Click :guilabel:`Initiate Peering`.
      
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
