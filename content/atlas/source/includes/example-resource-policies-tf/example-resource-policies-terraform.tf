# start-restrict-number-of-clusters
resource "mongodbatlas_resource_policy" "forbid_more_than_two_clusters" {
  org_id = var.org_id
  name   = "forbid-more-than-two-clusters"
  policies = [
    {
      body = <<EOF
        forbid (
            principal,
            action == ResourcePolicy::Action::"cluster.modify",
            resource
        )
        when { context.project.clustersInProject > 2 };
      EOF
    },
  ]
}
# end-restrict-number-of-clusters

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

# start-restrict-eras
resource "mongodbatlas_resource_policy" "restrict_eras_all_projects" {
  org_id = var.org_id
  name   = "restrict-eras-all-projects"
  policies = [
    {
      body = <<EOF
        forbid (
            principal,
            action == ResourcePolicy::Action::"project.aiModelAPI.modify",
            resource
        );
      EOF
    },
  ]
}
# end-restrict-eras

# start-restrict-eras-except-project
resource "mongodbatlas_resource_policy" "restrict_eras_except_one_project" {
  org_id = var.org_id
  name   = "restrict-eras-except-one-project"
  policies = [
    {
      body = <<EOF
        forbid (
            principal,
            action == ResourcePolicy::Action::"project.aiModelAPI.modify",
            resource
        )
        unless { resource in ResourcePolicy::Project::"6217f7fff7957854e2d09179" };
      EOF
    },
  ]
}
# end-restrict-eras-except-project

# start-require-database-auditing
resource "mongodbatlas_resource_policy" "require_database_auditing" {
  org_id = var.org_id
  name   = "require-database-auditing"
  policies = [
    {
      body = <<EOF
        forbid (
            principal,
            action == ResourcePolicy::Action::"cluster.modify",
            resource
        )
        when { !context.project.databaseAuditing.enabled };
      EOF
    },
  ]
}
# end-require-database-auditing

# start-require-cmk-clusters
resource "mongodbatlas_resource_policy" "require_cmk_clusters" {
  org_id = var.org_id
  name   = "require-cmk-on-clusters"
  policies = [
    {
      body = <<EOF
        forbid (
            principal,
            action == ResourcePolicy::Action::"cluster.modify",
            resource
        )
        when { !context.cluster.encryptionAtRest.customerManagedKey.enabled };
      EOF
    },
  ]
}
# end-require-cmk-clusters

# start-require-cmk-search
resource "mongodbatlas_resource_policy" "require_cmk_search" {
  org_id = var.org_id
  name   = "require-cmk-on-search-deployments"
  policies = [
    {
      body = <<EOF
        forbid (
            principal,
            action == ResourcePolicy::Action::"search.deployment.modify",
            resource
        )
        when { !context.search.encryptionAtRest.customerManagedKey.enabled };
      EOF
    },
  ]
}
# end-require-cmk-search

# start-require-cmk-all-org-data
resource "mongodbatlas_resource_policy" "require_cmk_clusters_aws" {
  org_id = var.org_id
  name   = "require-cmk-clusters-aws-policy"
  policies = [
    {
      body = <<EOF
        forbid (
            principal,
            action == ResourcePolicy::Action::"cluster.modify",
            resource
        )
        when { !context.cluster.encryptionAtRest.customerManagedKey.enabled };
      EOF
    },
  ]
}

resource "mongodbatlas_resource_policy" "require_cmk_search_aws" {
  org_id = var.org_id
  name   = "require-cmk-search-aws-policy"
  policies = [
    {
      body = <<EOF
        forbid (
            principal,
            action == ResourcePolicy::Action::"search.deployment.modify",
            resource
        )
        when { !context.search.encryptionAtRest.customerManagedKey.enabled };
      EOF
    },
  ]
}

resource "mongodbatlas_resource_policy" "restrict_to_aws_only" {
  org_id = var.org_id
  name   = "restrict-to-aws-only"
  policies = [
    {
      body = <<EOF
        forbid (
            principal,
            action in [
                ResourcePolicy::Action::"cluster.modify",
                ResourcePolicy::Action::"search.deployment.modify"
            ],
            resource
        )
        when { !([ResourcePolicy::CloudProvider::"aws"].containsAll(context.cluster.cloudProviders)) };
      EOF
    },
  ]
}
# end-require-cmk-all-org-data

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

# start-limit-max-disk-size
resource "mongodbatlas_resource_policy" "limit_max_disk_size" {
  org_id = var.org_id
  name   = "limit-max-4096gb-disk"
  policies = [
    {
      body = <<EOF
        forbid (
            principal,
            action == ResourcePolicy::Action::"cluster.modify",
            resource
        )
        when { context.cluster has diskSizeGB && context.cluster.diskSizeGB > 4096 };
      EOF
    },
  ]
}
# end-limit-max-disk-size

# start-enforce-cluster-type
resource "mongodbatlas_resource_policy" "require_replica_set" {
  org_id = var.org_id
  name   = "require-replica-set"
  policies = [
    {
      body = <<EOF
        forbid (
            principal,
            action == ResourcePolicy::Action::"cluster.modify",
            resource
        )
        unless { context.cluster.clusterType == ResourcePolicy::ClusterType::"replicaset" };
      EOF
    },
  ]
}
# end-enforce-cluster-type

# start-restrict-shard-count
resource "mongodbatlas_resource_policy" "require_min_shards" {
  org_id = var.org_id
  name   = "require-min-3-shards"
  policies = [
    {
      body = <<EOF
        forbid (
            principal,
            action == ResourcePolicy::Action::"cluster.modify",
            resource
        )
        when {
          context.cluster.minShardCount < 3 &&
          !context.cluster.isConvertingToSharded
        };
      EOF
    },
  ]
}
# end-restrict-shard-count

# start-enforce-config-server-management-mode
resource "mongodbatlas_resource_policy" "enforce_dedicated_config_server" {
  org_id = var.org_id
  name   = "enforce-dedicated-config-server"
  policies = [
    {
      body = <<EOF
        forbid (
            principal,
            action == ResourcePolicy::Action::"cluster.modify",
            resource
        )
        when {
          context.cluster.clusterType == ResourcePolicy::ClusterType::"sharded" &&
          context.cluster has configServerManagementMode &&
          context.cluster.configServerManagementMode != ResourcePolicy::ConfigServerManagementMode::"fixed_to_dedicated"
        };
      EOF
    },
  ]
}
# end-enforce-config-server-management-mode

# start-restrict-auto-embedding
resource "mongodbatlas_resource_policy" "restrict_auto_embedding" {
  org_id = var.org_id
  name   = "prevent-automated-embedding-indexes"
  policies = [
    {
      body = <<EOF
        forbid (
            principal,
            action == ResourcePolicy::Action::"search.index.modify",
            resource
        )
        when { context.search.index.isAutoEmbed };
      EOF
    },
  ]
}
# end-restrict-auto-embedding

# start-restrict-native-reranking
resource "mongodbatlas_resource_policy" "restrict_native_reranking" {
  org_id = var.org_id
  name   = "restrict-native-reranking"
  policies = [
    {
      body = <<EOF
        forbid (
            principal,
            action == ResourcePolicy::Action::"project.rerank.modify",
            resource
        )
        when { context.project.rerankEnabled == true };
      EOF
    },
  ]
}
# end-restrict-native-reranking
