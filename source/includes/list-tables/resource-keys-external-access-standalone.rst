.. list-table::
   :widths: 20 10 10 40 20
   :header-rows: 1

   * - Key
     - Type
     - Necessity
     - Description
     - Example

   * - :setting:`spec.exposedExternally`
     - Boolean
     - Optional
     - Set this value to ``true`` to allow external services to connect
       to the MongoDB deployment. This results in |k8s| creating a
       :k8sdocs:`NodePort service </concepts/services-networking/service/#nodeport>`.
     - ``true``
