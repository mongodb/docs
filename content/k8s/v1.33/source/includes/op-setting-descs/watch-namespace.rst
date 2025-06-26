Namespaces that the |k8s-op-short| watches for |k8s-mdbrsc|
changes. If this |k8s-ns| differs from the default, ensure that
the |k8s-op-short| ServiceAccount :k8sdocs:`can access
</reference/access-authn-authz/rbac/#rolebinding-and-clusterrolebinding>`
this namespace.

- To watch *all namespaces*, specify **\*** and assign the |k8s-cr| to the
  ``mongodb-enterprise-operator`` ServiceAccount that you use to run the
  |k8s-op-short|.

- To watch a *subset of all namespaces*, specify them in a
  comma-separated list, escape each comma with a backslash,
  and surround the list in quotes, such as
  ``"operator.watchNamespace=ns1\,ns2"``.

.. include:: /includes/admonitions/fact-subset-of-namespaces.rst

.. include:: /includes/admonitions/fact-create-service-account-namespaces.rst

The default value is **<metadata.namespace>**.
