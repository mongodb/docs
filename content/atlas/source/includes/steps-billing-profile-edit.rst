.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-org-billing.rst
      
   .. step:: Review the :guilabel:`Overview` page.
      
      In the :guilabel:`Overview` page, you can explore:
          
      - Invoice information that includes a :guilabel:`Pending Invoice` section,
        which shows your :guilabel:`Net Month-to-Date Amount` for the current billing period. The
        net month-to-date amount reflects your net charges from the start of the period
        to the current day. You can also see a :guilabel:`Last Invoice` section,
        which shows your usage and amount due for the previous billing period.
      
      - The :ref:`billing cost visualization charts 
        <billing-visualizations>`.
      
      - The :ref:`Available Credits <subscription-level>` and
        :ref:`History <subscription-level>` sections.
      
   .. step:: Click :guilabel:`Edit` in the :guilabel:`Payment Method` card.
      
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
      
   .. step:: Accept or decline your changes.

      - To accept your changes, click :guilabel:`Submit`.
      
      - To decline your changes, click :guilabel:`Cancel`. 
