terraform {
  required_version = ">= 1.9"

  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "~> 5.25"
    }
  }
}

provider "vercel" {
  team = var.vercel_team
}
