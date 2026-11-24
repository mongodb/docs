variable "vercel_team" {
  description = "Vercel team slug or ID that owns the project."
  type        = string
  default     = "team_MluoyvVVwpPbXYedRwDKVAR0"
}

variable "git_repo" {
  description = "GitHub repository the project deploys from."
  type        = string
  default     = "10gen/docs-mongodb-internal"
}

variable "project_name" {
  description = "Name of the Vercel project."
  type        = string
  default     = "mongodb-docs"
}

variable "root_directory" {
  description = "App directory the project builds, relative to the repository root."
  type        = string
  default     = "platform/docs-web"
}

variable "domain" {
  description = "Stable domain assigned to the project's production deployments."
  type        = string
  default     = "mongodb-docs.vercel.app"
}
