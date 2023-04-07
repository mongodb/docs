If you add ``spec.externalAccess``, the |k8s-op-short| creates an external service 
for each Pod in a replica set. External services provide an external entry point 
for each MongoDB database Pod in a cluster. Each external service has selectors 
that match the external service to a specific Pod.

If you add this setting without any values, the |k8s-op-short| creates 
an external service with the following default values:

.. include:: /includes/list-tables/external-service-default.rst
