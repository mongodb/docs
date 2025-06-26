For each namespace, create some or all of the following
local |k8s| |k8s-service-accounts|:

- If you want to deploy a MongoDB instance in the
  namespace, use ``mongodb-enterprise-database-pods``.

- If you want to deploy |onprem| in the namespace, use
  ``mongodb-enterprise-appdb`` and ``mongodb-enterprise-ops-manager``.

Copy and paste the applicable examples and replace the ``<namespace>``
value with the label that identifies the namespace.
