.. list-table::
   :widths: 15 10 75
   :header-rows: 1

   * - Name
     - Type
     - Description

   * - ``links``
     - array
     - .. include:: /includes/api/links-explanation.rst

   * - ``results``
     - array of objects
     - Array of objects where each details one unexpired 
       database user certificate.

   * - ``results[n]._id``
     - number
     - Serial number of this certificate.

   * - ``results[n].createdAt``
     - string
     - |iso8601-time| when |service| created this X.509 certificate.

   * - ``results[n].groupId``
     - string
     - Unique identifier of the |service| project to which this 
       certificate belongs.

   * - ``results[n].notAfter``
     - string
     - |iso8601-time| when this certificate expires.

   * - ``results[n].subject``
     - string
     - Fully distinguished name of the database user to which this 
       certificate belongs. To learn more, see 
       `RFC 2253 <https://tools.ietf.org/html/rfc2253>`_.

   * - ``totalCount``
     - number
     - Total number of unexpired certificates 
       returned in this response.