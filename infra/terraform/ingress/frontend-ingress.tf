resource "kubernetes_ingress_v1" "frontend_ingress" {
  metadata {
    name      = "frontend-ingress"
    namespace = var.namespace
    labels = {
      app = "frontend"
    }
    # 🚫 No annotations needed
  }

  spec {
    ingress_class_name = "nginx"

    rule {
      host = "devtask.local"

      http {
        path {
          path      = "/"
          path_type = "Prefix"

          backend {
            service {
              name = "frontend"
              port {
                number = 4173
              }
            }
          }
        }
      }
    }
  }
}
