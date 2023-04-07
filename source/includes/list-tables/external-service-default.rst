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
        