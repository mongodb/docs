- Creates a default ConfigMap named ``mongodb-kubernetes-operator-member-list``
  that contains all the member clusters of the |multi-cluster|. This name is
  hard-coded and you can't change it. See :ref:`Known Issues <hardcoded_configmap_multi-clusters>`.
- Creates :k8sdocs:`ServiceAccounts </tasks/configure-pod-container/configure-service-account/>`,
  :k8sdocs:`Roles, ClusterRoles </reference/access-authn-authz/rbac/#role-and-clusterrole>`,
  :k8sdocs:`RoleBindings and ClusterRoleBindings </reference/access-authn-authz/rbac/#rolebinding-and-clusterrolebinding>`
  in the :ref:`central cluster <central-and-member-clusters>` and
  each :ref:`member cluster <central-and-member-clusters>`.
- Applies the correct permissions for service accounts.
- Uses the preceding settings to create your |multi-cluster|.
