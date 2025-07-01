.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-db-deployments-page.rst
      
   .. step:: Open the :guilabel:`Create a New Cluster` Page.

      - If you already have one or more {+database-deployments+}, click
        :guilabel:`Build a Cluster` to display the 
        :guilabel:`Deploy your Cluster` page.
      - If this is your first {+database-deployment+}:
        
        a. Click :guilabel:`Build a Database`.
        #. Click :guilabel:`advanced configuration options` at the top of
           the screen to display the
           :guilabel:`Create New Cluster` dialog box.
      
   .. step:: Select a {+cluster+} type.
      
      .. include:: /includes/steps-choose-deployment-type-from-template.rst
      
   .. step:: Select your preferred :guilabel:`Cloud Provider & Region`.

      .. include:: /includes/steps-choose-provider-region-from-template.rst

   .. step:: Specify a name for the {+cluster+} in the :guilabel:`Name` box.
      
      This label identifies the {+cluster+} in |service|.
      
      .. note::
       
         |service| creates your hostname based on your {+cluster+} name.
      
      You can't change the {+cluster+} name after |service| deploys the 
      {+cluster+}. {+Cluster+} names can't exceed 64 characters in length.
      
      .. include:: /includes/admonitions/importants/cluster-naming-limitations.rst
      
   .. step:: Specify a tag key and value to apply to the {+cluster+}.
      
      To learn more, see :ref:`apply-tags-new-cluster-template`.
      
      .. include:: /includes/fact-sensitive-info-resource-tags.rst
      
   .. step:: Deploy your {+cluster+}.

      Click :guilabel:`Create`.
      
      .. important::
      
        .. include:: /includes/fact-database-deployment-project-limit-lettered.rst
      
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
      
