Ensure that your :ref:`IAM role <set-up-unified-aws-access>` grants
the following permissions on your |aws| Lambda function:

- ``lambda:InvokeFunction``
- ``lambda:GetFunctionConfiguration``

{+atlas-sp+} uses ``lambda:GetFunctionConfiguration`` to retrieve
the function timeout so that it waits for the full duration of each
execution.

The following example policy grants these permissions for a single
function. Replace the ``Resource`` placeholders with the ARN of your
Lambda function.

.. literalinclude:: /includes/atlas-stream-processing/lambda-iam-policy.json
   :language: json
   :dedent:
