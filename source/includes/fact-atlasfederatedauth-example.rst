The following example configures an ``AtlasFederatedAuth`` custom resource
that does the following:

- Enables federated authentication for the organization linked 
  to the specified |k8s-secret|.
- Adds ``my-org-domain.com`` as an approved domain.
- Enables domain restriction for the organization.
- Disables debugging for :abbr:`SSO (Single Sign-On)`.
- Grants the :authrole:`Organization Member` role to users 
  after authenticating.
- Maps the :authrole:`Organization Owner` role for the organization 
  and applies the role mapping to an |idp| group named ``org-admin``.
- Maps the :authrole:`Organization Project Creator` and :authrole:`Project Owner`
  roles for a project in the organization named ``dev-project`` and applies the
  role mapping to an |idp| group named ``dev-team``.
