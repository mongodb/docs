Multi-Region CMK
~~~~~~~~~~~~~~~~

For multi-region AWS |cmk|, make sure to add **every** regional key ARN to the KMS key policy so that {+service+}
clusters in those regions can access it.

For multi-region |service| clusters on |aws| that use |aws| |kms|
private networking, your |kms| setup must cover every |service| region
that the cluster uses. Replicate the multi-Region key to each region
and create an |aws| |kms| private endpoint in each region.