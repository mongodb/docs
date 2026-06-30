.. code-block:: json
   :copyable: true

   {
     "Version": "2012-10-17",
     "Statement": [
       {
	 "Effect": "Allow",
	 "Action": [
	   "s3:ListBucket",
	   "s3:GetObject",
	   "s3:GetObjectVersion",
	   "s3:GetBucketLocation"
	 ],
	 "Resource": [
	   "arn:aws:s3:::bucketName",
	   "arn:aws:s3:::bucketName/*"
	 ]
       },
       {
	 "Effect": "Allow",
	 "Action": [
	   "s3:PutObject",
	 ],
	 "Resource": [
	   "arn:aws:s3:::bucketName",
	   "arn:aws:s3:::bucketName/*"
	 ]
       }
     ]
   } 
