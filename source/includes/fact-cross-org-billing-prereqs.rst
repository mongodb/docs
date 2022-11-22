- To link a paying organization to another organization, you must have 
  :authrole:`Organization Billing Admin` or 
  :authrole:`Organization Owner`
  privileges for both organizations.

- A paying organization and any linked organizations
  must be on the same subscription plan.

- A paying organization and any linked organizations
  must have the same minimums, uplifts, and SLA for their 
  subscription plan.

- A paying organization and any linked organizations
  can't have overlapping monthly commitment deals.

- A paying organization on a prepaid subscription plan and any linked 
  organizations must be on the same current and future subscription 
  plans.
  
- You can use the {+atlas-ui+} to manually link a paying organization 
  to a maximum of 20 other organizations.
  To link a paying organization to more than 20 other organizations,
  :ref:`contact support <request-support>`.

- A paying organization can't link more than 100 other organizations.

- A paying organization can't already be a linked organization.

- A paying organization must have an |service| subscription.

- A paying and all linked organizations must be in good standing
  and have no failed payments.

.. note::

   To purchase a subscription that enables cross-organization billing,
   contact :website:`MongoDB Sales </contact/atlas>`.
