variable "namespace" {
  type    = string
  default = "devtask"
}

variable "backend_image" {
  type    = string
  default = "ganeshwalunj/devtask-backend:latest"
}

variable "backend_replicas" {
  type    = number
  default = 2
}

variable "frontend_image" {
  type    = string
  default = "ganesha7/devtask-frontend:latest"
}

variable "frontend_replicas" {
  type    = number
  default = 2
}
