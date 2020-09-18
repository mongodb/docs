.. list-table::
   :widths: 20 14 11 55
   :header-rows: 1
   :stub-columns: 1

   * - Parameter
     - Type
     - Necessity
     - Description

   * - awsSecurityGroup
     - string
     - Conditional
     - Unique identifier of the |aws| security group to add to the
       access list.

       Your access list entry can include only one
       **awsSecurityGroup**, one **cidrBlock**, or one **ipAddress**.

       .. note::

          You must :ref:`configure VPC peering <vpc-peering>` for your
          project before you can add an |aws| security group to an
          access list.

   * - cidrBlock
     - string
     - Conditional
     - Range of IP addresses in |cidr| notation to be added to the
       access list.

       Your access list entry can include only one
       **awsSecurityGroup**, one **cidrBlock**, or one **ipAddress**.

   * - comment
     - string
     - Optional
     - Comment associated with the access list entry.

   * - deleteAfterDate
     - date
     - Optional
     - |iso8601-time| after which |service| removes the entry from the
       access list. The specified date must be in the future and within
       one week of the time you make the |api| request.

       .. important::

          You cannot set |aws| security groups as temporary access list
          entries.

       .. note::

          You may include an |iso8601| time zone designator to ensure
          that the expiration date occurs with respect to the local
          time in the specified time zone.

   * - ipAddress
     - string
     - Conditional
     - Single IP address to be added to the access list. Mutually
       exclusive with **awsSecurityGroup** and **cidrBlock**.

       Your access list entry can include only one
       **awsSecurityGroup**, one **cidrBlock**, or one **ipAddress**.

