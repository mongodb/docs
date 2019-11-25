.. admonition:: Required Permissions
   :class: note

   To edit a project API key's whitelist, you must have the
   :authrole:`Organization Owner` role.

1. From the :guilabel:`Context` menu, select the project that you want
   to view.

#. Under the :guilabel:`Project` section on the left navigation panel,
   click :guilabel:`Access Management`.

#. Click the tab for :guilabel:`API Keys` to see the available keys.

#. Under the :guilabel:`Actions` column, click the ellipsis menu
   and select :guilabel:`Edit Whitelist` from the dropdown.

   .. note::

      Selecting :guilabel:`Edit Whitelist` takes you to the oranization
      level of the |service| UI.

#. From the :guilabel:`API Whitelist` section of the
   :guilabel:`Edit API Key` page, you can either:
   
   - Click :guilabel:`Add Whitelist Entry`
     to add a new whitelist entry and proceed to step 6.
   
   - Click :icon:`trash-alt` to the right
     of an existing |api| key to delete it.

   .. note::

      You cannot edit an individual whitelist entry. If you need to
      modify a whitelist entry, delete and re-create it.

#. Enter an |ipv4| address or :abbr:`CIDR
   (Classless Inter-Domain Routing)`-notated IP range from which you
   want |service| to accept |api| requests for this |api| Key.

   - You can also click :guilabel:`Use Current IP Address` to add the
     IP address of your current host to the whitelist.

#. Click :guilabel:`Save`.
