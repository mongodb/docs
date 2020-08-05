.. list-table::
   :header-rows: 1
   :widths: 30 70

   * - Field
     - Description

   * - ``id``
     - Serial number of the certificate.

   * - ``createdAt``
     - |iso8601-time| when |service| created this X.509 certificate.

   * - ``groupId``
     - Unique identifier of the |service| project to which this 
       certificate belongs.

   * - ``notAfter``
     - |iso8601-time| when this certificate expires.

   * - ``subject``
     - Full distinguished name of the database user to which this 
       certificate belongs. To learn more, see 
       `RFC 2253 <https://tools.ietf.org/html/rfc2253>`_.
