variable "vercel_team" {
  description = "Vercel team slug or ID that owns the projects."
  type        = string
  default     = "team_MluoyvVVwpPbXYedRwDKVAR0"
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
