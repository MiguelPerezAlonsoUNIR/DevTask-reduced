terraform {
  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.20.0"
    }
  }
}

module "mongo" {
  source    = "./mongo"
  namespace = var.namespace
}

module "backend" {
  source    = "./backend"
  namespace = var.namespace
  image     = var.backend_image
  replicas  = var.backend_replicas
}

module "frontend" {
  source    = "./frontend"
  namespace = var.namespace
  image     = var.frontend_image
  replicas  = var.frontend_replicas
}

module "ingress" {
  source    = "./ingress"
  namespace = var.namespace
}
