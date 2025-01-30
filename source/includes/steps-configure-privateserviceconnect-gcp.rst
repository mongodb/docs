.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-network-access.rst
      
   .. step:: Click the :guilabel:`Private Endpoint` tab and then the following tab.

   .. step:: Choose a cloud provider.
      
      Click the |gcp| logo, then click :guilabel:`Next`.
      
   .. step:: Choose a region.
      
      a. From the :guilabel:`Atlas Region` list, select the region
         in which you want to create the private endpoint. 
      #. Click :guilabel:`Next`.
      
      .. note::
         If your organization has no payment information stored, |service| 
         prompts you to add it before continuing.
      
   .. step:: Configure your private endpoint.

      .. include:: /includes/fact-avoid-connection-interruptions.rst
      
      a. Enter the following details about your |gcp| |vpc|:

         .. list-table::
            :widths: 20 80

            * - :guilabel:`Google Cloud Project ID`
              - The unique ID for your project. Find this value on the
                :guilabel:`Dashboard` page on your |gcp| platform. 

            * - :guilabel:`VPC Name`
              - The name of the |vpc| that you want to use to connect to
                |service|. Find this value on the 
                :guilabel:`VPC Networks` page on your |gcp| dashboard.

            * - :guilabel:`Subnet Name`
              - The name of the subnet in your |gcp| |vpc|. Find this
                value on the :guilabel:`VPC Networks` page on your |gcp|
                dashboard.

      #. Enter a unique name for your private endpoint in the
         :guilabel:`Private Service Connect Endpoint Prefix` field. 
         This will be the prefix for all endpoints created and the name 
         of the endpoint group. Click :guilabel:`Next`.

      #. Create the forwarding rules in your |gcp| |vpc| by downloading 
         the shell script and running it using the gcloud CLI. This 
         will output a |json| file containing a list of IP addresses 
         and endpoint names that you will need in the next step. Click 
         :guilabel:`Next`.

      #. Click :guilabel:`Upload JSON File` to select and upload the 
         outputted JSON file.
            
      #. Click :guilabel:`Create Private Endpoint`.

   .. include:: /includes/nav/steps-network-access.rst 
      
   .. step:: Verify that the private endpoint is available.
      
      You can connect to an |service| cluster using the {+gcp-psc+} private 
      endpoint when all of the resources are configured and the private
      endpoint becomes available.
      
      To verify that the {+gcp-psc+} private endpoint is available:
      
      On the :guilabel:`Private Endpoint` tab, verify the following 
      statuses for the region that contains the cluster 
      you want to connect to using {+gcp-psc+}:
      
      .. list-table::
         :widths: 20 80
      
         * - :guilabel:`Atlas Endpoint Service Status`
           - Available
               
         * - :guilabel:`Endpoint Status`
           - Available
      
      To learn more about possible status values, see :ref:`pl-troubleshooting`.
      
      If you do not see these statuses, see :ref:`pl-troubleshooting` for
      additional information.
