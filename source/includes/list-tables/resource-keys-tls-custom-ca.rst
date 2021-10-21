.. list-table::
   :widths: 25 10 10 40 15
   :header-rows: 1

   * - Key
     - Type
     - Necessity
     - Description
     - Example

   * - | ``spec.security``
       | :setting:`.tls.enabled<spec.security.tls.enabled>`
     - boolean
     - Required
     - If this value is ``true``, |tls| is enabled on the MongoDB
       deployment.

       By default, |k8s-op-short| requires hosts to use and
       accept |tls| encrypted connections.
     - ``true``

   * - | ``spec.security``
       | :setting:`.tls.ca<spec.security.tls.ca>`
     - string
     - Required
     - Add the |k8s-configmap|\'s name that stores the custom |certauth|
       that you used to sign your deployment's |tls| certificates.
     - ``<custom-ca>``

   * - | ``spec.security``
       | :setting:`.tls.certsSecretPrefix<spec.security.tls.certsSecretPrefix>`
     - string
     - Optional
     - If applicable, add the ``<prefix>`` of the |k8s| |k8s-secret| 
       name that contains your MongoDB deployment's |tls| certificates.
     - ``devDb``
