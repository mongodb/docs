- A paying organization must have an |service| subscription.

- To link an organization to a paying organization, you must have 
  :authrole:`Organization Billing Admin` or 
  :authrole:`Organization Owner`
  privileges for both organizations.

- For an organization to be linked to a paying organization, it must have
  the same minimums, uplifts, and SLA for their subscription plan as 
  the paying organization or have no support plan (|service| Basic).

- A paying organization and any linked organizations or any 
  organizations intended to be linked:

  - Can't have failed payments.
  - Can't have an active self-serve support plan.
  - Can't have an active self-serve marketplace subscription.
  - Can't have overlapping monthly commitment subscriptions.