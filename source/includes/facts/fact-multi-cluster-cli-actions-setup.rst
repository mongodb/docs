- Creates a single ``mongodb`` namespace in the central cluster and
  each member cluster.
- Creates Service Accounts, Roles, and RoleBindings in the central
  cluster and each member cluster.
- Applies the correct permissions for service accounts.
- Uses these settings to create your |multi-cluster|.