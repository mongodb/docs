During deployment of a |service| group's first ``M10+`` paid cluster,
|service| creates a :abbr:`VPC (Virtual Private Cloud)` for the group that is
specific to the cloud service provider and region of the cluster. All
additional clusters deployed in that group are associated to the group's
:abbr:`VPC (Virtual Private Cloud)`, locking the choice of cloud service
provider and region.