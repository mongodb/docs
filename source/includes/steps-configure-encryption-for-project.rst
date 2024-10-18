.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-advanced.rst
      
   .. step:: Toggle the button next to :guilabel:`Encryption at Rest using your Key Management` to :guilabel:`On`.
      
   .. step:: Enter your key management provider account credentials and provide an encryption key.
      
   .. step:: Click :guilabel:`Save`.
      
   .. step:: Allow access to or from the |service| control plane.
      
      Depending on your Key Management Service configuration, you may 
      have to add |service| control plane IP addresses to enable 
      Encryption at Rest for your project so that |service| can communicate with your 
      KMS. To enable communication between |service| and KMS:
      
      a. Send a GET request to the ``returnAllControlPlaneIPAddresses`` endpoint. 
         The :oas-atlas-op:`API endpoint </returnAllControlPlaneIPAddresses>` returns a list of 
         inbound and outbound |service| control plane IP addresses in CIDR categorized by 
         cloud provider and region. See the prerequisites for managing customer keys with :ref:`AWS <aws-ksm-prereqs>`, 
         :ref:`Azure <azure-kms-prereqs>`, and :ref:`GCP <gcp-kms-prereqs>` for more information.
      
      b. Add the returned IP addresses to your cloud provider's IP access list.
         See the prerequisites for managing customer keys with :ref:`AWS <aws-ksm-prereqs>`, 
         :ref:`Azure <azure-kms-prereqs>`, and :ref:`GCP <gcp-kms-prereqs>` for more information.  
