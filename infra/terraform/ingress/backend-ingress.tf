resource "kubernetes_ingress_v1" "backend_ingress" {
  metadata {
    name      = "backend-ingress"
    namespace = var.namespace
    labels = {
      app = "backend"
    }
  }

  spec {
    ingress_class_name = "nginx"

    rule {
      host = "devtask.local"

      http {
        path {
          path      = "/api"
          path_type = "Prefix"

          backend {
            service {
              name = "backend"
              port {
                number = 5000
              }
            }
          }
        }
      }
    }
  }
}
