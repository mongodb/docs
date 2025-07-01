.. list-table::
   :widths: 20 14 65
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - awsSecurityGroup
     - string
     - Unique identifier of |aws| security group in this access list
       entry.

   * - cidrBlock
     - string
     - Range of |ipaddr| addresses in |cidr| notation in this access
       list entry.

   * - comment
     - string
     - Comment associated with this access list entry.

   * - deleteAfterDate
     - date
     - |iso8601-time| after which |service| deletes the temporary
       access list entry. |service| returns this field if you specified
       an expiration date when creating this access list entry.

   * - groupId
     - string
     - Unique identifier of the project to which this access list entry
       applies.

   * - ipAddress
     - string
     - Entry using an |ipaddr| address in this access list entry.

   * - links
     - object array
     - .. include:: /includes/api/links-explanation.rst
