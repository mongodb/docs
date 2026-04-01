resource "aws_iam_role" "test_role" {
  name = "mongodb_atlas_kms_test_role"

  assume_role_policy = <<EOF
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Principal": {
          "AWS": "${mongodbatlas_cloud_provider_access_setup.setup_only[0].aws_config[0].atlas_aws_account_arn}"
        },
        "Action": "sts:AssumeRole",
        "Condition": {
          "StringEquals": {
            "sts:ExternalId": "${mongodbatlas_cloud_provider_access_setup.setup_only[0].aws_config[0].atlas_assumed_role_external_id}"
          }
        }
      }
    ]
  }
  EOF
}