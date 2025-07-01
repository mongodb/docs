.. list-table::
   :widths: 10 10 80
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - ``atlasAWSAccountArn``
     - string
     - |arn| associated with the |service| |aws| account used to assume
       IAM roles in your AWS account.

   * - ``atlasAssumedRoleExternalId``
     - string
     - Unique external ID |service| uses when assuming the IAM role in
       your AWS account.

   * - ``authorizedDate``
     - date
     - Date on which this role was authorized.

   * - ``createdDate``
     - date
     - Date on which this role was created.

   * - ``featureUsages``
     - array
     - |service| features this AWS IAM role is linked to.

   * - ``iamAssumedRoleArn``
     - string
     - |arn| of the IAM Role that |service| assumes when accessing resources
       in your AWS account.

   * - ``providerName``
     - string
     - Name of the cloud provider. Currently limited to ``AWS``.

   * - ``roleId``
     - string
     - Unique ID of this role.