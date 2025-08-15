Multi-Region CMK
~~~~~~~~~~~~~~~~

For multi-region AWS |cmk|, make sure to add **every** regional key ARN to the KMS key policy so that {+service+} 
clusters in those regions can access it.