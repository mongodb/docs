.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-db-deployments-page.rst
      
   .. step:: Open the :guilabel:`Create New Cluster` Dialog.

      - If you already have one or more {+database-deployments+}, click
        :guilabel:`Create` to display the 
        :guilabel:`Create New Cluster` dialog box.
      - If this is your first {+database-deployment+}:
        
        1. Click :guilabel:`Build a Database`.
        #. Click :guilabel:`advanced configuration options` at the top of
           the screen to display the
           :guilabel:`Create New Cluster` dialog box.
      
   .. step:: Select the :guilabel:`Serverless` type.
      
      Select the {+serverless-instance+} {+database-deployment+} type from
      the preset templates. You can also deploy an ``M10`` 
      {+dedicated-cluster+} or an ``M0`` {+free-cluster+} from this page.
      
      .. include:: /includes/fact-deployment-types.rst
      
      To create a {+cluster+}, see 
      :doc:`Create a New Cluster </tutorial/create-new-cluster>` for next
      steps.
      
   .. step:: Select your preferred :guilabel:`Provider`.

      The cloud provider that you select affects the configuration
      options, network latency for clients accessing your 
      {+serverless-instance+}, and the :doc:`cost of running the
      {+serverless-instance+} </billing>`.
      
      To learn more, see :ref:`create-cluster-cloud-provider-region`.
      
   .. step:: Select your preferred :guilabel:`Region`.

      |service| displays available regions for the cloud provider you
      select. The region that you select determines the geographic location
      of the nodes in your {+serverless-instance+} and the 
      :doc:`cost of running the {+serverless-instance+} </billing>`.
      
      To learn more, see :ref:`create-cluster-cloud-provider-region`.
      
   .. step:: Specify a name for the {+serverless-instance+} in the :guilabel:`Name` box.
      
      This label identifies the {+serverless-instance+} in |service|. 
      
      You can't
      change the {+serverless-instance+} name after you deploy it. 
      {+Serverless-instance+} names can't exceed 64 characters in length.
      
      .. include:: /includes/admonitions/importants/cluster-naming-limitations.rst
      
   .. step:: Specify a tag key and value to apply to the {+serverless-instance+}.
      
      To learn more, see :ref:`apply-tags-new-cluster-template`.
      
      .. include:: /includes/fact-sensitive-info-resource-tags.rst
      
   .. step:: Deploy your {+serverless-instance+}.

      Click :guilabel:`Create`.
      
      .. important::
      
        .. include:: /includes/fact-database-deployment-project-limit.rst
      
   .. step:: Update your :guilabel:`Payment Method` details as needed.
      
      a. Click the radio button for :guilabel:`Credit Card` or
         :guilabel:`Paypal`.
      
         - If you selected :guilabel:`Credit Card`, type values for the
           following fields:
      
           .. list-table::
              :widths: 20 10 70
              :header-rows: 1
              :stub-columns: 1
      
              * - Field
                - Necessity
                - Action
      
              * - Name on Card
                - Required
                - Type the name that appears on your credit card.
      
              * - Card Number
                - Required
                - Type the 16-digit number that appears on your
                  credit card. American Express uses a 15-digit number.
      
              * - Expiration Date
                - Required
                - Type the expiration date for your credit card in the
                  two-digit month and two-digit year format.
      
              * - |cvc|
                - Required
                - Type the three-digit number on the back of your credit
                  card. American Express uses a 4-digit number found on
                  the front of the credit card.
      
         - If you selected :guilabel:`PayPal`:
      
           i.  Click :guilabel:`Pay with PayPal`.
      
           ii. Complete the actions on the PayPal website.
      
      All projects within your organization share the same billing
      settings, including payment method.
      
   .. step:: Review project's cost.
      
      Under the :guilabel:`Cart` section, review costs for the following: 
      
      - :guilabel:`Read Processing Unit (RPU) - Daily Tiering / RPU`
      - :guilabel:`Write Processing Unit (WPU)`
      - :guilabel:`Storage`
      
   .. step:: Deploy your {+serverless-instance+}.
      
      Click :guilabel:`Confirm and Deploy Instance`.
      
      .. important::
      
        .. include:: /includes/fact-database-deployment-project-limit.rst
      
