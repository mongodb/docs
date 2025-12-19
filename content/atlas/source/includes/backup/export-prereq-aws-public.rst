1. Configure |aws| `IAM role <https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use.html>`__ 
   with ``STS:AssumeRole`` that grants |service| access to your |aws| 
   resources. To learn more about configuring |aws| access for 
   |service|, see :ref:`set-up-unified-aws-access`.
#. Configure |aws| `IAM role policy <https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html>`__ 
   that grants |service| write access or the ``S3:PutObject`` and 
   ``S3:GetBucketLocation`` permissions to your |aws| resources. To 
   learn more about configuring write access to |aws| resources, see 
   :ref:`set-up-unified-aws-access`.

   .. example:: 

      .. code-block:: json

	 {
	   "Version": "2012-10-17",
	   "Statement": [
	     {
	       "Effect": "Allow",
	       "Action": "s3:GetBucketLocation",
	       "Resource": "arn:aws:s3:::bucket-name"
	     },
	     {
	       "Effect": "Allow",
	       "Action": "s3:PutObject",
	       "Resource": "arn:aws:s3:::bucket-name/*"
	     }
	   ]
	 }
