.. list-table::
   :widths: 25 10 10 40 15
   :header-rows: 1

   * - Key
     - Type
     - Necessity
     - Description
     - Example

   * - | ``spec.security``
       | :setting:`.tls.ca<spec.security.tls.ca>`
     - string
     - Required
     - Add the |k8s-configmap|\'s name that stores the custom |certauth|
       that you used to sign your deployment's |tls| certificates.
     - ``<custom-ca>``

   * - | ``spec.security``
       | :setting:`.certsSecretPrefix<spec.security.certsSecretPrefix>`
     - string
     - Required
     - Add the ``<prefix>`` of the secret 
       name that contains your MongoDB deployment's |tls| certificates.
     - ``devDb``
