a. Add the :setting:`spec.encryptionAtRest.awsKms` object to 
   the :setting:`spec.encryptionAtRest` array in the
   :ref:`atlasproject-custom-resource`, including the
   following parameters:

   .. list-table::
      :widths: 50 50
      :header-rows: 1

      * - Parameter
        - Description

      * - ``spec.encryptionAtRest.awsKms.``
          ``customerMasterKeyID``
        - Unique alphanumeric string that identifies the |aws| customer
          master key you use to
          encrypt and decrypt the MongoDB master keys.

      * - ``spec.encryptionAtRest.awsKms.enabled``
        - Flag that indicates whether this project uses |aws| |kms| 
          to encrypt data at rest. To enable encryption at rest using 
          |aws| |kms|, set this parameter to ``true``. To disable
          encryption at rest using |aws| |kms|, set this parameter to
          ``false``. If you disable encryption at rest using |aws|
          |kms|, |ak8so| removes the configuration details.

      * - ``spec.encryptionAtRest.awsKms.region``
        - Label that indicates the :ref:`AWS region <amazon-aws>` in
          which the customer master key exists.
                    
      * - ``spec.encryptionAtRest.awsKms.roleId``
        - Unique |aws| |arn| that identifies the |aws| |iam| role with
          permission to manage your |aws| customer master key. You can
          find this in the :guilabel:`Roles` section of the |aws|
          Management Console by clicking on the |iam| role you edited
          or created for |service| access. |aws| displays the |arn| in
          the :guilabel:`Summary` section.

#. Run the following command:

   .. code-block:: sh

      cat <<EOF | kubectl apply -f -
      apiVersion: atlas.mongodb.com/v1
      kind: AtlasProject
      metadata:
        name: my-project
      spec:
        name: Test Atlas Operator Project
        encryptionAtRest:
          awsKms: 
            customerMasterKeyID: "030gce02-586d-48d2-a966-05ea954fde0g"
            enabled: true
            region: "US_EAST_1"
            roleId: "arn:aws:iam::123456789012:role/aws-service-role/support.amazonaws.com/myRole"
      EOF