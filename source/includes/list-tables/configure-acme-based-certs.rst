.. list-table::
   :widths: 25 10 10 55
   :header-rows: 1

   * - Key
     - Type
     - Necessity
     - Description

   * - | ``spec.externalAccess``
       | :setting:`.externalDomain<spec.externalAccess.externalDomain>`
     - string
     - Required
     - .. include:: /includes/facts/fact-external-domain-spec.rst

   * - | ``spec.externalAccess``
       | :setting:`.externalService.spec<spec.externalAccess.externalService.spec>`
     - collection
     - Optional
     - Configuration for the :k8sdocs:`ServiceSpec </reference/kubernetes-api/service-resources/service-v1/#ServiceSpec>`.
     
       .. include:: /includes/facts/fact-external-service-spec.rst

   * - | ``spec.externalAccess``
       | :setting:`.externalService.annotations<spec.externalAccess.externalService.annotations>`
     - collection
     - Optional
     -  .. include:: /includes/facts/fact-external-service-annotation-spec.rst
