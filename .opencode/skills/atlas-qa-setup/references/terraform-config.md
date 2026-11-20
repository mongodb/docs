# Terraform Configuration Templates

Referenced from Steps TF-2 and TF-3 of the atlas-qa-setup skill. Replace
placeholders as indicated before running `terraform plan`.

## versions.tf — shared provider config

`versions.tf` must contain the following. Do not overwrite it if it already
exists with this content:

```hcl
terraform {
  required_providers {
    mongodbatlas = {
      source  = "mongodb/mongodbatlas"
      version = "~> 2.8"
    }
  }
  required_version = ">= 1.9"
}

variable "atlas_base_url" {
  type        = string
  description = "Atlas environment base URL (QA default; override for Dev)"
  default     = "https://cloud-qa.mongodb.com/"
}

provider "mongodbatlas" {
  client_id     = var.client_id
  client_secret = var.client_secret
  base_url      = var.atlas_base_url
}
```

If the existing `versions.tf` hardcodes `base_url =
"https://cloud-qa.mongodb.com/"`, that is fine for QA — leave it. Only
migrate to the variable form when a Dev run is requested, and show the user
the diff first.

## variables.tf — credential and org declarations

`variables.tf` must declare `client_id`, `client_secret`, and `org_id`.
Append whichever are missing:

```hcl
variable "client_id" {
  type        = string
  description = "Atlas service account client ID (set via TF_VAR_client_id)"
  sensitive   = true
}

variable "client_secret" {
  type        = string
  description = "Atlas service account client secret (set via TF_VAR_client_secret)"
  sensitive   = true
}

variable "org_id" {
  type        = string
  description = "Atlas org ID for the target environment (set via TF_VAR_org_id)"
}
```

The QA environment hosts many orgs — do not hardcode an org ID as a default.
Each user sets `TF_VAR_org_id` to the org where their service account lives.
To find it: Atlas QA UI → Organization → Settings, or
`atlas organizations list --profile qa`.

Credentials are never written to `.tf` files.

## Ticket file template — <ticket-id>.tf

Create `~/terraform-atlas-test/<ticket-id-lowercase>.tf` (e.g.
`docsp-60721.tf`). Replace `<TICKET>` with the lowercase ticket ID and
`<TICKET_SNAKE>` with the underscored form (e.g. `docsp60721`). If running
against Dev, include the environment in resource names (e.g.
`<TICKET>-dev-cluster`).

```hcl
# <TICKET-UPPERCASE> — <one-line description of what this tests>
# Prerequisites before running `terraform apply`:
#   1. After the cluster is ready, load sample data via Atlas UI if needed.
#   2. Wait for all search indexes to reach Active status before running queries.
#   3. Create a database user via Atlas UI → Database Access for mongosh access.

module "atlas_project_<TICKET_SNAKE>" {
  source  = "terraform-mongodbatlas-modules/project/mongodbatlas"
  version = "~> 0.2"

  org_id = var.org_id
  name   = "<TICKET>-test"
}

resource "mongodbatlas_advanced_cluster" "<TICKET_SNAKE>" {
  project_id   = module.atlas_project_<TICKET_SNAKE>.id
  name         = "<TICKET>-cluster"
  cluster_type = "REPLICASET"

  replication_specs = [
    {
      region_configs = [
        {
          priority      = 7
          provider_name = "AWS"
          region_name   = "US_EAST_1"
          electable_specs = {
            instance_size = "M10"
            node_count    = 3
          }
        }
      ]
    }
  ]
}

output "<TICKET_SNAKE>_connection_string" {
  value       = mongodbatlas_advanced_cluster.<TICKET_SNAKE>.connection_strings.standard_srv
  description = "Use with mongosh to run the <TICKET-UPPERCASE> test queries"
}
```

Add `mongodbatlas_search_index` resources or other resources as required by
the specific test case.
