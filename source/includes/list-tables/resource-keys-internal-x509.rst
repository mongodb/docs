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
       | :setting:`.internalCluster<spec.security.authentication.internalCluster>`
     - string
     - Required
     - Use this setting to enable
       :manual:`X.509 internal cluster authentication </tutorial/configure-x509-member-authentication#x509-internal-authentication>`.

       .. important::

          Once internal cluster authentication is enabled, it can't
          be disabled.

     - ``X509``
