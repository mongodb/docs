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
      
         * - Country
           - Required
           - Select the country for your billing address. You can also
             start typing the name of the country and then select it from
             the filtered list of countries.
      
         * - VAT ID
           - Conditional
           - |service| displays the :guilabel:`VAT ID` field if you
             select a country other than the United States.
      
             To learn more about VAT, see
             :ref:`VAT ID <vat-id-number>`.
      
             .. include:: /includes/vat-clarification.rst
      
         * - Address Line 1
           - Required
           - Type the mailing address for your billing address.
      
         * - Address Line 2
           - Optional
           - Type an additional line for the mailing address for your
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
      
   .. step:: Click :guilabel:`Next`.

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
      
   .. step:: Accept or decline your changes.

      - To accept your changes, click :guilabel:`Submit`.
      
      - To decline your changes, click :guilabel:`Cancel`. 
