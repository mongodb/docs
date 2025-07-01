terraform {
  required_version = ">=1.4"
  required_providers {
    mongodbatlas = {
        source  = "mongodb/mongodbatlas"
        version = "~>1.31"
    }
  }
}

provider "mongodbatlas" {}

variable "org_id" {
  type        = string
  description = "<Organization ID>"
}