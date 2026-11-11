variable "vercel_team" {
  description = "Vercel team slug or ID that owns the projects."
  type        = string
}

variable "git_repo" {
  description = "GitHub repository the projects deploy from."
  type        = string
  default     = "10gen/docs-mongodb-internal"
}

variable "group_name" {
  description = "Name of the microfrontends group."
  type        = string
  default     = "docs"
}

variable "import_ids" {
  description = "Existing Vercel project IDs keyed by app name. Setting one adopts that project into state instead of creating a duplicate."
  type        = map(string)
  default     = {}
}

variable "env_var_import_ids" {
  description = "Existing DOCS_PROJECT environment variable IDs keyed by app name. Each app here must also be in import_ids."
  type        = map(string)
  default     = {}

  validation {
    condition     = alltrue([for name in keys(var.env_var_import_ids) : contains(keys(var.import_ids), name)])
    error_message = "Every app in env_var_import_ids must also be in import_ids."
  }
}

variable "group_import_id" {
  description = "Existing microfrontends group ID to adopt into state."
  type        = string
  default     = null
}
