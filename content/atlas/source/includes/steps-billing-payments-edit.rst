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

         * - Full name
           - Required
           - Type the full name associated with your billing address.

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

         * - Address
           - Required
           - Type the street address for your billing address.

         * - Apt, suite, etc.
           - Optional
           - Type the apartment, suite, or floor number for your
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
      
   .. step:: Select your :guilabel:`Payment Method`.

      In the :guilabel:`Payment Method` section, select one of the
      following options:

      - If you select :guilabel:`Card`, enter the following details:

        .. list-table::
           :widths: 20 10 70
           :header-rows: 1
           :stub-columns: 1

           * - Field
             - Necessity
             - Action

           * - Card Number
             - Required
             - Type your card number.

           * - Expiration Date
             - Required
             - Type your card's expiration date in MM/YY format.

           * - |cvc|
             - Required
             - Type the three-digit security code for your card.
               For American Express, the security code is the 4-digit 
               long code on the front of the card.

      - If you select :guilabel:`Google Pay`, follow the on-screen
        instructions to complete the payment setup. Google Pay is not
        available in India.

      - If you select :guilabel:`US bank account`, follow the
        on-screen instructions to connect your bank account. This option
        is available only in the United States.

      - If you select :guilabel:`SEPA Direct Debit`, enter your
        account details. This option is available only in the EEA.
        SEPA Direct Debit charges are processed in EUR.

      - If you select :guilabel:`Revolut Pay`, an additional step
        appears to securely submit your payment information. This
        option is available only in the UK and EEA. Revolut Pay
        charges are processed in EUR.

      - If you select :guilabel:`Link`, follow the on-screen
        prompts to complete the payment setup.

      - If you select :guilabel:`PayPal`:

        i.  Click :guilabel:`Pay with PayPal`.

        ii. Complete the actions on the PayPal website.

      .. note::

         All projects within your organization share the same
         billing settings, including payment method.

   .. step:: Save your payment method.

      - To save your changes, click :guilabel:`Save Payment Method`.

      - To discard your changes, click :guilabel:`Cancel`.
