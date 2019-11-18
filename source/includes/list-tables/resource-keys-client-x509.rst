.. list-table::
   :widths: 20 10 10 40 20
   :header-rows: 1

   * - Key
     - Type
     - Necessity
     - Description
     - Example

   * - | ``spec.security``
       | ``.authentication``
       | :setting:`.enabled<spec.security.authentication.enabled>`
     - boolean
     - Optional
     - If this value is ``true``, authentication is enabled on the
       MongoDB deployment.

     - ``true``

   * - | ``spec.security``
       | ``.authentication``
       | :setting:`.modes<spec.security.authentication.modes>`
     - array
     - Conditional
     - If you enabled authentication, you must set an authentication
       mechanism. Accepted values are ``X509``.
     - ``X509``

