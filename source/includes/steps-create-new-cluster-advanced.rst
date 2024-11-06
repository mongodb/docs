.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-db-deployments-page.rst
      
   .. step:: Open the :guilabel:`Create New Cluster` Dialog.

      - If you already have one or more {+database-deployments+}, click
        :guilabel:`Create` to display the 
        :guilabel:`Create New Cluster` dialog box.
      - If this is your first {+database-deployment+}:
        
        a. Click :guilabel:`Build a Database`.
        #. Click :guilabel:`advanced configuration options` at the top of
           the screen to display the
           :guilabel:`Create New Cluster` dialog box.
      
   .. step:: Open Advanced Configuration.
      
      - Navigate to the bottom of the page and click 
        :guilabel:`Go to Advanced Configuration`.
  
   .. step:: Select a {+cluster+} type.
      
      .. include:: /includes/steps-choose-deployment-type-advanced.rst

   .. step:: Select your preferred :guilabel:`Cloud Provider & Region`.

      .. include:: /includes/steps-choose-provider-region-advanced.rst
      
   .. step:: Select the :guilabel:`Cluster Tier`.

      The selected tier dictates the memory, storage, vCPUs, and |iops|
      specification for each data-bearing server [#data-bearing]_ in the
      cluster. 
      
      .. include:: /includes/fact-auto-scaling-brief.rst
      
      For more information on how to select an appropriate cluster tier and
      storage settings for your workload, see
      :ref:`create-cluster-instance` and :ref:`create-cluster-storage`.
      
      .. include:: /includes/fact-analytics-nodes-tier.rst
      
      You can also select a different tier for your Search Nodes. To learn more 
      about the available tiers for your Search Nodes, see :ref:`select-tiers-for-search-nodes`. 
      
   .. step:: Select any :guilabel:`Additional Settings`.
      
      From the :guilabel:`Additional Settings` section, you can:
      
      - :ref:`create-cluster-version`
      - :ref:`create-cluster-backups`
      - :ref:`create-cluster-termination-protection`
      - :ref:`create-cluster-sharding`
      - :ref:`create-cluster-shardNum`
      - :ref:`create-cluster-enable-bi`
      - :ref:`create-cluster-enable-encryption`
      - :ref:`create-cluster-more-configuration-options`
      
   .. step:: Specify the :guilabel:`Cluster Details`.
      
      From the :guilabel:`Cluster Details` section, you can:
      
      - Specify the :guilabel:`Cluster Name`.
      
        This label identifies the {+cluster+} in |service|.
        
        .. note::
        
           |service| creates your hostname based on your {+cluster+} name.
       
        You can't change the {+cluster+} name after |service| deploys the 
        {+cluster+}. {+Cluster+} names can't exceed 64 characters in 
        length.
      
        .. include:: /includes/admonitions/importants/cluster-naming-limitations.rst
      
      - :ref:`Apply tags to the {+cluster+} <apply-tags-new-cluster>`.
      
        .. include:: /includes/fact-sensitive-info-resource-tags.rst
      
   .. step:: Proceed to checkout.

      Click :guilabel:`Create Cluster` below the form and complete the 
      billing information only if it doesn't already exist. If your
      organization already has the billing information, |service| deploys
      your cluster.  
      
   .. step:: Update your Billing Address details as needed.
      
      .. include:: /includes/step-update-address.rst
      
   .. step:: Update your Payment Method details as needed.
      
      .. include:: /includes/step-add-payment.rst
      
   .. step:: Review project's cost.
      
      .. include:: /includes/step-review-costs.rst
      
   .. step:: Deploy your {+cluster+}.
      Click :guilabel:`Confirm and Deploy Cluster`.
      
      .. important::
      
        .. include:: /includes/fact-database-deployment-project-limit-lettered.rst   
