Configure VPC Peering for a GCP-backed Cluster
``````````````````````````````````````````````

To configure VPC Peering for a GCP-backed cluster:

.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-network-access.rst

   .. step:: Click the :guilabel:`Peering` tab.
            
      |service| displays your network peering connections.

   .. step:: Initiate peering.

      a. Click :icon-fa5:`plus` :guilabel:`Add Peering Connection`.

      #. Enter the required information in the 
         :guilabel:`Peering Connection` modal.

         To create the VPC Peering connection, fill in the requested
         information:
     
         .. list-table::
            :header-rows: 1
            :widths: 35 65
     
            * - Field
              - Notes

            * - :guilabel:`Project ID`

              - |gcp| Project ID of the peer VPC. Refer to the
                dialog box for instructions on finding your :guilabel:`GCP
                Project ID`.

            * - :guilabel:`VPC Name`

              - The name of the peer VPC. Refer to the dialog box
                for instructions on finding your :guilabel:`VPC Name`.

      #. Click :guilabel:`Initiate Peering`.

   .. step:: Configure VPC Peering.

      a. In the :guilabel:`Google Cloud Console`, click 
         :guilabel:`VPC network peering`.

      #. Click :guilabel:`Create Connection`.

      #. Click :guilabel:`Continue`.

      #. In :guilabel:`Name`, enter a name for your peering connection.

      #. In :guilabel:`Your VPC Network`, enter the name of your
         |gcp| VPC network.

      #. In :guilabel:`Peered VPC network`, select 
         :guilabel:`In another project`.

      #. In :guilabel:`Project ID`, enter your |service| Project ID.

         To find this name in the VPC Peering view:
         
         i. .. include:: /includes/nav/list-network-access.rst
            
         #. Click the :guilabel:`Peering` tab.

      #. In :guilabel:`VPC network name`, enter your Atlas VPC Name.

         To find this name in the VPC Peering view:
         
         i. .. include:: /includes/nav/list-network-access.rst
            
         #. Click the :guilabel:`Peering` tab.
