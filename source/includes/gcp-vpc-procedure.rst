Configure VPC Peering for a GCP-backed Cluster
``````````````````````````````````````````````

To configure VPC Peering for a GCP-backed cluster:

1. From the :guilabel:`Clusters` view, select the :guilabel:`Security`
   tab, then click :guilabel:`Peering`, then :guilabel:`New Peering
   Connection`.

#. Enter the required information in the :guilabel:`Peering Connection` modal.

   To create the VPC Peering connection, fill in the requested
   information:
     
   .. list-table::
      :header-rows: 1
      :widths: 35 65
     
      * - Field
        - Notes

      * - :guilabel:`Project ID`

        - |gcp| Project ID of the peer VPC. Refer to the
          dialog for instructions on finding your :guilabel:`GCP
          Project ID`.

      * - :guilabel:`VPC Name`

        - The name of the peer VPC. Refer to the dialog
          for instructions on finding your :guilabel:`VPC Name`.

#. Click :guilabel:`Initiate Peering`.

#. In the :guilabel:`Google Cloud Console`, click :guilabel:`VPC network peering`.

#. Click :guilabel:`Create Connection`.

#. Click :guilabel:`Continue`.

#. In :guilabel:`Name`, enter a name for your peering connection.

#. In :guilabel:`Your VPC Network`, enter the name of your
   |gcp| VPC network.

#. In :guilabel:`Peered VPC network`, select :guilabel:`In another project`.

#. In :guilabel:`Project ID`, enter your |service| Project ID.

   You can find this name in the VPC Peering view. From the :guilabel:`Clusters`
   view in |service|, click :guilabel:`Security`, and then :guilabel:`Peering`.

#. In :guilabel:`VPC network name`, enter your Atlas VPC Name.

   You can find this name VPC Peering view. From the :guilabel:`Clusters`
   view  in |service|, click :guilabel:`Security`, and then :guilabel:`Peering`.
