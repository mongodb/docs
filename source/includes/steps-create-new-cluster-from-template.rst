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
      
   .. step:: Select a {+cluster+} type.
      
      Select either an ``M10`` {+dedicated-cluster+} or an ``M0`` 
      {+free-cluster+} type from the available preset templates. You can
      also deploy a {+serverless-instance+} from this page.
      
      .. include:: /includes/fact-deployment-types.rst
      
      To create a {+serverless-instance+}, see  
      :doc:`Create a New {+Serverless-Instance+} </tutorial/create-serverless-instance>` 
      for next steps.
      
   .. step:: Select your preferred :guilabel:`Provider`.

      The cloud provider that you select affects the configuration
      options for the available {+cluster+} tiers, network latency for
      clients accessing your {+cluster+}, and the 
      :doc:`cost of running the {+cluster+} </billing>`.
      
      To learn more, see :ref:`create-cluster-cloud-provider-region`.
      
   .. step:: Select your preferred :guilabel:`Region`.

      |service| displays available regions for the cloud provider you
      select. The region that you select determines the geographic location
      of the nodes in your {+cluster+} and the 
      :doc:`cost of running the {+cluster+} </billing>`.
      
      To learn more, see :ref:`create-cluster-cloud-provider-region`.
      
      To deploy your {+cluster+} across multiple regions, you must select
      :guilabel:`advanced configuration options`. Multi-region
      {+clusters+} can better withstand data center outages and may contain
      dedicated geographic regions for localized reads, thereby improving
      performance. To learn how to deploy a multi-region {+cluster+}, see
      :ref:`create-cluster-multi-region`.
      
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
      
        .. include:: /includes/fact-database-deployment-project-limit.rst
      
   .. step:: Update your :guilabel:`Billing Address` details as needed.
      
      .. list-table::
         :widths: 20 10 70
         :header-rows: 1
         :stub-columns: 1
      
         * - Field
           - Necessity
           - Action
      
         * - Billing Email Address
           - Optional
           - Type the email address to which |service| should send
             :ref:`billing alerts <billing-alerts>`. 
      
             By default, |service| sends billing alerts to the Organization Owners
             and Billing Admins.
             
             - If you leave the :guilabel:`Billing Email Address` blank, 
               |service| sends billing alerts to the Organization Owners and Billing Admins.
             - If you specify a billing email address and uncheck :guilabel:`Only
               send invoice emails to the Billing Email
               Address`, |service| sends billing alerts to the billing
               email address, Organization Owners, and Billing Admins.
             - If you specify a billing email address and check the box for :guilabel:`Only
               send invoice emails to the Billing Email
               Address`, |service| send billing alerts to the billing email address only.
      
         * - Company Name
           - Optional
           - Type the name of the company for your billing address.
      
         * - Country
           - Required
           - Select the country for your billing address. You can also
             start typing the name of the country and then select it from
             the filtered list of countries.
      
         * - Street Address
           - Required
           - Type the street address for your billing address.
      
         * - Apt/Suite/Floor
           - Optional
           - Type an the apartment, suite, or floor for your
             billing address.
      
         * - City
           - Required
           - Type the name of the city for your billing address.
      
         * - State/Province/Region
           - Required
           - Type or select the political subdivision in which your billing
             address exists. The label and field change depending on what
             you selected as your **Country**:
      
             - If you select **United States** as your **Country**, this
               label changes to **State**. The field changes to a dropdown
               menu of U.S. states. You can also start typing the name of
               the state and then select it from the filtered list of
               states.
      
             - If you select **Canada** as your **Country**, this label
               changes to **Province**. The field changes to a dropdown
               menu of Canadian provinces. You can also start typing the
               name of the province and then select it from the filtered
               list of provinces.
      
             - If you select any other country as your **Country**, this
               label changes to **State/Province/Region**. The field
               changes to a text box. Type the name of your province,
               state, or region in this box.
      
         * - ZIP or Postal Code
           - Required
           - Type the ZIP (U.S.) or Postal Code (other countries) for your
             billing address.
      
         * - VAT Number
           - Conditional
           - |service| displays the :guilabel:`VAT ID` field if you
             select a country other than the United States.
      
             To learn more about VAT, see
             :ref:`VAT ID <vat-id-number>`.
      
             .. include:: /includes/vat-clarification.rst
      
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
      
      Under the :guilabel:`Cart` section, review the following: 
      
      .. list-table::
         :widths: 20 80
         :header-rows: 1
         :stub-columns: 1
      
         * - Field
           - Description
      
         * - Cluster Tier 
           - Displays cost for your selected cluster tier and configuration 
             details. To learn more, see :ref:`region-costs` and 
             :ref:`instance-size-costs`.
      
         * - Included Features
           - Displays features included with your selected cluster 
             configuration.
      
         * - Additional Settings
           - Displays additional settings that you enabled, such as cloud 
             backups, sharding, |bic-short|, and more. To learn more, see 
             :ref:`billing-backup-cloud-provider-snapshots`.
      
   .. step:: Deploy your {+cluster+}.
    
      Click :guilabel:`Confirm and Deploy Cluster`.
      
      .. important::
      
        .. include:: /includes/fact-database-deployment-project-limit.rst
      
