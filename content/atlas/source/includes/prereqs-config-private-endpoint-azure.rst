1. Have an |azure| user account with
   permissions to create resources like virtual networks and private endpoints.
   To learn more about the permissions required, see
   the `Azure Documentation
   <https://learn.microsoft.com/en-us/azure/private-link/rbac-permissions>`__.

#. `Install the Azure CLI <https://learn.microsoft.com/en-us/cli/azure/install-azure-cli>`__.

.. important::

   With |azure|, you can create *up to three private endpoints per project*
   for your {+fdi+}\s due to an |azure|-imposed limit. This is why |service|
   prevents you from deleting an |service| project before first deleting its
   private endpoints. To request more than three private endpoints for a project,
   contact :ref:`MongoDB Support <request-support>`.
