.. code-block:: json
   :copyable: true

   {
     "Version": "2012-10-17",
     "Statement": [
       {
	 "Effect": "Allow",
	 "Action": [
	     "glue:CreateDatabase",
	     "glue:GetTable",
	     "glue:CreateTable",
	     "glue:GetDatabase",
	     "glue:UpdateTable"
	 ],
	 "Resource": [
	     "arn:aws:glue:us-east-1:1111111111:catalog",
	     "arn:aws:glue:us-east-1:1111111111:database/asp-iceberg-db",
	     "arn:aws:glue:us-east-1:1111111111:table/asp-iceberg-db/*"
	 ]
       },
       {
	 "Effect": "Allow",
	 "Action": [
	     "s3:PutObject",
	     "s3:ListBucket",
	     "s3:GetObject",
	     "s3:GetObjectVersion",
	     "s3:GetBucketLocation",
	     "s3:AbortMultipartUpload",
	     "s3:DeleteObject"
	 ],
	 "Resource": [
	     "arn:aws:s3:::iceberg-asp-dev",
	     "arn:aws:s3:::iceberg-asp-dev/*"
	 ]
       }
     ]
   }	      
