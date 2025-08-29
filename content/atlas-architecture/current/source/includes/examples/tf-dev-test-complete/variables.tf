# Atlas Organization ID
variable "atlas_org_id" {
  type        = string
  description = "Atlas Organization ID"
}

# Atlas Project Name
variable "atlas_project_name" {
  type        = string
  description = "Atlas Project Name"
}

# Atlas Project ID
variable "atlas_project_id" {
  type        = string
  description = "MongoDB Atlas project id"
}

# Atlas Project Environment
variable "environment" {
  type        = string
  description = "The environment to be built"
}

# Cluster Instance Size Name
variable "cluster_instance_size_name" {
  type        = string
  description = "Cluster instance size name"
}

# Cloud Provider to Host Atlas Cluster
variable "cloud_provider" {
  type        = string
  description = "AWS or GCP or Azure"
}

# Atlas Region
variable "atlas_region" {
  type        = string
  description = "Atlas region where resources will be created"
}

# MongoDB Version
variable "mongodb_version" {
  type        = string
  description = "MongoDB Version"
}

# Atlas Group Name
variable "atlas_group_name" {
  type        = string
  description = "Atlas Group Name"
}

variable "atlas_cluster_name" {
  description = "MongoDB Atlas Cluster Name"
  default     = "datadog-test-cluster"
  type        = string
}

variable "user" {
  description = "MongoDB Atlas User"
  type        = list(string)
  default     = ["dbuser1", "dbuser2"]
}

variable "database_name" {
  description = "The Database in the cluster"
  type        = list(string)
}

variable "connection_strings" {
  description = "List of MongoDB connection strings to the cluster"
  type        = list(string)
}

variable "trusted_domains" {
  description = "List of associated domains to trust"
  type        = list(string)
  default     = ["myOrg.com", "another-trusted-domain.org"] # Example domains
}

# Azure Variables

variable "token_audience" {
  type        = string
  default     = "https://management.azure.com/"
  description = "Used as resource when getting the access token. See more in the [Azure documentation](https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/how-to-use-vm-token#get-a-token-using-http)"
}

variable "azure_tenant_id" {
  type        = string
  description = "Azure Tenant ID"
}

variable "azure_subscription_id" {
  type        = string
  description = "Azure Subscription ID"
}

variable "azure_client_id" {
  type        = string
  description = "Azure Client ID"
}

variable "azure_client_secret" {
  type        = string
  description = "Azure Client Secret"
}

variable "azure_resource_group_name" {
  type        = string
  description = "Azure Resource Group Name"
}

variable "azure_key_vault_name" {
  type        = string
  description = "Azure Key Vault Name"
}

variable "azure_key_identifier" {
  type        = string
  description = "Azure Key Identifier"
}

variable "vm_admin_username" {
  type        = string
  description = "VM Admin Username"
}

variable "ssh_public_key" {
  type        = string
  description = "SSH Public Key"
}