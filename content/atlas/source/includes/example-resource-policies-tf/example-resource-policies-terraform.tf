# start-restrict-ip
resource "mongodbatlas_resource_policy" "forbid_project_access_anywhere" {
  org_id = var.org_id
  name   = "forbid-project-access-anywhere"
  policies = [
    {
      body = <<EOF
        forbid (
            principal,
            action == ResourcePolicy::Action::"project.ipAccessList.modify",
            resource
        )
        when {context.project.ipAccessList.contains(ip("0.0.0.0/0"))};
    EOF
    },
  ]
}
# end-restrict-ip

# start-restrict-provider
resource "mongodbatlas_resource_policy" "allow_only_aws_cloud_provider" {
  org_id = var.org_id
  name   = "cluster-allow-only-aws-cloud-provider"
  policies = [
    {
      body = <<EOF
        forbid (
            principal,
            action == ResourcePolicy::Action::"cluster.modify",
            resource
        )
        unless
          { context.cluster.cloudProviders == [ResourcePolicy::CloudProvider::"aws"] };
      EOF
  }]
}
# end-restrict-provider

# start-restrict-region
resource "mongodbatlas_resource_policy" "allow_only_regions" {
  org_id = var.org_id
  name   = "cluster-allow-only-regions"
  policies = [
    {
      body = <<EOF
        forbid (
          principal,
          action == ResourcePolicy::Action::"cluster.modify",
          resource
        ) unless {
            [ResourcePolicy::Region::"aws:eu-west-1", ResourcePolicy::Region::"aws:eu-central-1"]
              .containsAll(context.cluster.regions)};
      EOF
    },
  ]
}
# end-restrict-region

# start-provider-region
resource "mongodbatlas_resource_policy" "allow_only_provider_regions" {
  org_id = var.org_id
  name   = "cluster-allow-only-provider-regions"
  policies = [
    {
      body = <<EOF
        forbid (
          principal,
          action == ResourcePolicy::Action::"cluster.modify",
          resource
        ) unless {
            context.cluster.cloudProviders == [ResourcePolicy::CloudProvider::"gcp"] ||
            [ResourcePolicy::Region::"aws:eu-west-1", ResourcePolicy::Region::"aws:eu-central-1"]
              .containsAll(context.cluster.regions)};
      EOF
    },
  ]
}
# end-provider-region

# start-restrict-region-project
resource "mongodbatlas_resource_policy" "allow_only_regions_project" {
  org_id = var.org_id
  name   = "cluster-allow-only-regions-project"
  policies = [
    {
      body = <<EOF
        forbid (
          principal,
          action == ResourcePolicy::Action::"cluster.modify",
          resource
        ) unless {
            resource in ResourcePolicy::Project::"<PROJECT_ID>" &&
            [ResourcePolicy::Region::"aws:eu-west-1", ResourcePolicy::Region::"aws:eu-central-1"]
              .containsAll(context.cluster.regions)};
      EOF
    },
  ]
}
# end-restrict-region-project