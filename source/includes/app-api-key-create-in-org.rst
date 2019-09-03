1. From the :guilabel:`Context` menu, select the organization that you
   want to view.

#. Click :guilabel:`Access`.

#. Click the tab for :guilabel:`API Keys`.

#. Select :guilabel:`Create API Key` from the :guilabel:`Manage`
   button menu.

#. From the :guilabel:`API Key Information` step of the
   :guilabel:`Add API Key` page, enter a description for the new |api|
   Key in the :guilabel:`Description` box.

#. Select the :ref:`new role or roles <organization-roles>` for the
   |api| Key from the :guilabel:`Organization Permissions` menu.

#. Copy and save the :guilabel:`Public Key`. 

   The public key acts as the username when making API requests.

#. Click :guilabel:`Next`.

#. From the :guilabel:`Private Key & Whitelist` step of the
   :guilabel:`Add API Key` page, click :guilabel:`Add Whitelist Entry`.

#. Enter an |ipv4| address from which you want |service| to
   accept |api| requests for this |api| Key.

   You can also click :guilabel:`Use Current IP Address` if the host
   you are using to access |service| also will make |api| requests
   using this |api| Key.

#. Click :guilabel:`Save`.

   .. admonition:: Copy the Private Key Before Leaving this Page
      :class: warning

      The :guilabel:`Private Key` is only shown once: *on this page*.
      Click the :guilabel:`Copy` button to add the Private Key to the
      clipboard. Save and secure both the Public and Private Keys.
