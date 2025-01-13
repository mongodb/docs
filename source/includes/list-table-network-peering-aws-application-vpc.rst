.. list-table::
   :header-rows: 1
   :widths: 35 65

   * - Field
     - Description

   * - :guilabel:`Account ID`

     - Unique number that identifies the |aws| Account ID of the
       owner of the peer |vpc|.

       To find your :guilabel:`AWS Account ID`, click
       :guilabel:`Learn More`.

   * - :guilabel:`VPC ID`

     - Unique string that starts with ``vpc-`` that identifies the
       peer |vpc|.

       To find your :guilabel:`VPC ID`, click
       :guilabel:`Learn More`.

   * - :guilabel:`VPC CIDR`

     - |aws| |vpc| |cidr| block or subset of the network in which
       your application runs. This range cannot overlap with your
       :guilabel:`Atlas CIDR Block` or any other Network Peering
       connection :guilabel:`VPC CIDR`.

       The |cidr| block must be in one of the following
       :rfc:`private networks <rfc1918#section-3>`:

       .. include:: /includes/list-tables/aws-vpc-ranges.rst

       To include this |vpc| |cidr| block in your IP access list,
       click :guilabel:`Add this CIDR block to my IP access list`.
       You can choose to add the :ref:`Security Group associated
       <add-to-access-list>` with the |aws| |vpc|.

       To learn more about |cidr| blocks, see
       :rfc:`RFC 4632 <4632>`.

   * - :guilabel:`Application VPC Region`

     - |aws| region where the |aws| |vpc| resides.
