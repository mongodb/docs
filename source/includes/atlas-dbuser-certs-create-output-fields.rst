.. list-table::
   :header-rows: 1
   :widths: 30 70

   * - Field
     - Description

   * - ``certificate``
     - The PEM-encoded X.509 certificate that |service| created for the
       user.

   * - ``monthsUntilExpiration``
     - Months until the X.509 certificate expires. Maximum value is
       ``24``. Defaults to ``3``.

   * - ``username``
     - Username for whom |service| generated the x.509 certificate.
