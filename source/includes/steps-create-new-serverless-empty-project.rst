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
      
   .. step:: Select a {+database-deployment+} type.
      
      Use the tabs at the top of the screen to select your 
      {+database-deployment+} type. You can deploy the following 
      {+database-deployments+}:
      
      {+Serverless-Instances+}
        {+Serverless-instances+} require minimal configuration and are best for
        applications that aren't critical and experience low or variable traffic. To learn
        more about {+serverless-instances+}, see :ref:`Choose a
        {+Database-Deployment+} Type <ref-deployment-types>`.
      
      {+Shared-Clusters+}
        {+Shared-clusters+} include the ``M0``, ``M2``, and ``M5`` tiers.
        These low-cost cluster types are suitable for teams who are
        learning MongoDB or developing small proof-of-concept applications.
        You can begin your project with a {+shared-cluster+} and upgrade to a
        production-ready tier at a future time.
      
      {+Dedicated-Clusters+}
        Dedicated clusters include ``M10`` and higher tiers. The
        ``M10`` and ``M20`` tiers are suitable for development environments
        and low-traffic applications, while higher tiers can handle large
        datasets and high-traffic applications. Dedicated clusters can be
        deployed into a single geographical region or multiple geographical regions.
      
      Select :guilabel:`Serverless`, then proceed to the next step to customize the
      configuration prior to deployment.
      
      To create a {+shared-cluster+} or a {+dedicated-cluster+}, see
      :doc:`Create a New Cluster </tutorial/create-new-cluster>` for next steps.
      
   .. step:: Select your preferred :guilabel:`Cloud Provider & Region`.

      The :doc:`choice of cloud provider and region </cloud-providers-regions>`
      affects the network latency for clients accessing your {+serverless-instance+},
      the geographic location of the nodes in your {+serverless-instance+}, and the
      :doc:`cost of running the {+serverless-instance+} </billing>`.
      
      {+Serverless-instances+} support fewer regions than {+clusters+}. To learn
      more, see the region information for :doc:`AWS </reference/amazon-aws>`,
      :doc:`Google Cloud </reference/google-gcp>` and :doc:`Azure </reference/microsoft-azure>`.
      
   .. step:: Configure backup for your {+serverless-instance+}.
      
      Select one of the following backup options:
      
      .. include:: /includes/list-table-serverless-backup-options.rst
      
   .. step:: Specify the :guilabel:`Serverless Instance Details`.
      
      From the :guilabel:`Serverless Instance Details` section, you can:
      
      - Specify the :guilabel:`Serverless Instance Name`.
       
        This is the {+serverless-instance+} name as it appears in 
        |service|. You can't change the {+serverless-instance+} name once 
        you deploy it.
      
        .. figure:: /images/create-serverless-instance-name.png
           :figwidth: 720px
           :alt: Name {+serverless-instance+} input
      
        {+Serverless-instance+} names can't exceed 64 characters in length.
      
        .. include:: /includes/admonitions/importants/serverless-instance-naming-limitations.rst
      
      - :ref:`Apply tags to the {+serverless-instance+} 
        <apply-tags-new-cluster>`.
      
        .. include:: /includes/fact-sensitive-info-resource-tags.rst 
      
   .. step:: Proceed to checkout.

      Click :guilabel:`Create Cluster` below the form and complete the 
      billing information only if it doesn't already exist. If your
      organization already has the billing information, |service| deploys
      your cluster.  
      
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
      
      Under the :guilabel:`Cart` section, review costs for the following: 
      
      - :guilabel:`Read Processing Unit (RPU) - Daily Tiering / RPU`
      - :guilabel:`Write Processing Unit (WPU)`
      - :guilabel:`Storage`
      
   .. step:: Deploy your {+serverless-instance+}.
      Click :guilabel:`Confirm and Deploy Instance`.
      
      .. important::
      
        .. include:: /includes/fact-database-deployment-project-limit.rst   
