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
     - Required
     - Set this value to ``true`` to enable authentication on the
       MongoDB deployment.

     - ``true``

   * - | ``spec.security``
       | ``.authentication``
       | :setting:`.modes<spec.security.authentication.modes>`
     - array
     - Conditional
     - Set this value to ``["X509"]``.
     - ``["X509"]``
