.. list-table::
   :widths: 20 10 10 40 20
   :header-rows: 1

   * - Key
     - Type
     - Necessity
     - Description
     - Example

   * - | ``spec.security``
       | :setting:`.tls.enabled<spec.security.tls.enabled>`
     - boolean
     - Optional
     - Set this value to ``true`` to enable |tls| on the MongoDB
       deployment.

       By default, |k8s-op-short| requires hosts to use and
       accept |tls| encrypted connections.
     - ``true``

