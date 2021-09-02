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
       | :setting:`.tls.secretRef.prefix<spec.security.tls.secretRef.prefix>`
     - string
     - Optional
     - Add the ``<prefix>`` of the |k8s| |k8s-secret| name that contains
       your MongoDB deployment's |tls| certificates. If you omit
       :setting:`spec.security.tls.secretRef.name` and you configure
       :setting:`spec.security.tls.secretRef.prefix`, you must name the 
       secret ``<prefix>-<metadata.name>-cert``.
       
       If you omit :setting:`spec.security.tls.secretRef.name` and
       :setting:`spec.security.tls.secretRef.prefix`, you must name the
       secret ``<metadata.name>-cert``.
     - ``devDb``
