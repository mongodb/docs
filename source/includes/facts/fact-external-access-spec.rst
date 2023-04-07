If you add ``spec.externalAccess``, the |k8s-op-short| creates an external service 
for each Pod in a replica set. External services provide an external entry point 
for each MongoDB database Pod in a cluster. Each external service has selectors 
that match the external service to a specific Pod.

If you add this setting without any values, the |k8s-op-short| creates 
an external service with the following default values:

.. list-table::
  :header-rows: 1
  :widths: 30 25 45

  * - Field
    - Value
    - Description

  * - ``Name``
    - ``<pod-name>-svc-external``
    - Name of the external service. You can't change this value.

  * - ``Type``
    - ``LoadBalancer``
    - Creates an external :k8sdocs:`LoadBalancer 
      </concepts/services-networking/service/#loadbalancer>` service.

  * - ``Port``
    - ``<Port Number>``
    - A port for |mongod|. If you set |external-domain|,
      the external service adds another port (``Port Number + 1``) for backups.
  
  * - ``publishNotReadyAddress``
    - ``true``
    -  Specifies that :k8sdocs:`DNS records </concepts/services-networking/dns-pod-service/>`
       are created even if the Pod isn't ready. 
       Do not set to ``false`` for any database Pod.
        