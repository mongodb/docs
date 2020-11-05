Namespace that the |k8s-op-short| watches for |k8s-mdbrsc|
changes. If this |k8s-ns| differs from the default, ensure that
the Operator's ServiceAccount :k8sdocs:`can access
</reference/access-authn-authz/rbac/#rolebinding-and-clusterrolebinding>`
this namespace.

Use **\*** to specify *all namespaces*. To watch all namespaces, you
must also assign the `ClusterRole
<https://kubernetes.io/docs/reference/access-authn-authz/rbac/#role-and-clusterrole>`__
to the ``mongodb-enterprise-operator`` ServiceAccount,
which is the ServiceAccount used to run the |k8s-op-short|.

.. include:: /includes/admonitions/fact-create-service-account-namespaces.rst

The default value is **<metadata.namespace>**.
