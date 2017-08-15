During deployment of a |service| project's first ``M10+`` paid cluster,
|service| creates a :abbr:`VPC (Virtual Private Cloud)` for the project that is
specific to the cloud service provider and region of the cluster. All
additional clusters deployed in that project are associated to the project's
:abbr:`VPC (Virtual Private Cloud)`, locking the choice of cloud service
provider and region.