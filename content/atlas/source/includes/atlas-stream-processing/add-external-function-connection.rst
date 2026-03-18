You can add your AWS Lambda resource as a connection through the |service| UI, 
the |service| CLI, or the |service| API, as shown in the following example. 
You can update the ``roleArn`` placeholder in the example with the ``arn`` 
from your `AWS IAM configuration <https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_identifiers.html#identifiers-arns>`__.

.. include:: /includes/fact-service-accounts-first.rst

.. code-block:: bash 

   curl --header "Authorization: Bearer {ACCESS-TOKEN}" \
      --header "Content-Type: application/json" \
      --header "Accept: application/vnd.atlas.2023-02-01+json" \
      --include \
      --data '{"name": "TestAWSLambdaConnection","type": "AWSLambda","aws": {"roleArn": "arn:aws:iam::<aws_account>:role/<role_name>"}}' \
      --request POST "https://cloud.mongodb.com/api/atlas/v2/groups/<group_id>/streams/<tenant_name>/connections"