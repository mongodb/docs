Add an External Function Connection through the {+atlas-admin-api+}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The {+atlas-admin-api+} provides the :oas-bump-atlas-op:`Create One
Connection <creategroupstreamconnection>` endpoint for adding a
connection to a connection registry.

.. include:: /includes/fact-service-accounts-first.rst

You can update the ``roleArn`` placeholder in the following
example with the ``arn`` from your `AWS IAM configuration
<https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_identifiers.html#identifiers-arns>`__.

**Example:**

.. code-block:: bash

   curl --header "Authorization: Bearer {ACCESS-TOKEN}" \
      --header "Content-Type: application/json" \
      --header "Accept: application/vnd.atlas.2023-02-01+json" \
      --include \
      --data '{"name": "TestAWSLambdaConnection","type": "AWSLambda","aws": {"roleArn": "arn:aws:iam::<aws_account>:role/<role_name>"}}' \
      --request POST "https://cloud.mongodb.com/api/atlas/v2/groups/<group_id>/streams/<tenant_name>/connections"

.. include:: /includes/atlas-stream-processing/external-function-stage-support.rst
