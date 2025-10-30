.. procedure::
   :style: normal

   .. step:: Send a GET request to the ``returnAllControlPlaneIpAddresses`` endpoint. 
         
      The :oas-bump-atlas-op:`API endpoint <listcontrolplaneipaddresses>` 
      returns a list of inbound and outbound |service| control plane IP 
      addresses in CIDR categorized by cloud provider and region. To learn 
      more, see the prerequisites for managing  customer keys with  
      :ref:`AWS <aws-ksm-prereqs>`, :ref:`Azure <azure-kms-prereqs>`, 
      and :ref:`GCP <gcp-kms-prereqs>`.  
      
   .. step:: Add the returned outbound IP addresses to your cloud provider's IP access list.
         
      See the prerequisites for managing customer keys with 
      :ref:`AWS <aws-ksm-prereqs>`, :ref:`Azure <azure-kms-prereqs>`, 
      and :ref:`GCP <gcp-kms-prereqs>` for more information.   


