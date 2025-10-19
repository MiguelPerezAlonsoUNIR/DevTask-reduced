resource "kubernetes_deployment" "nginx_ingress_controller" {
  metadata {
    name      = "nginx-ingress-controller"
    namespace = var.namespace
    labels = {
      app = "nginx-ingress"
    }
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        app = "nginx-ingress"
      }
    }

    template {
      metadata {
        labels = {
          app = "nginx-ingress"
        }
      }

      spec {
        service_account_name = "nginx-ingress-serviceaccount"

        container {
          name  = "controller"
          image = "k8s.gcr.io/ingress-nginx/controller:v1.9.0"

          args = [
            "/nginx-ingress-controller",
            "--controller-class=k8s.io/ingress-nginx",
            "--ingress-class=nginx"
          ]

          env {
            name  = "POD_NAME"
            value_from {
              field_ref {
                field_path = "metadata.name"
              }
            }
          }

          env {
            name  = "POD_NAMESPACE"
            value_from {
              field_ref {
                field_path = "metadata.namespace"
              }
            }
          }

          port {
            container_port = 80
          }

          port {
            container_port = 443
          }

          readiness_probe {
            http_get {
              path = "/healthz"
              port = 10254
            }
            initial_delay_seconds = 10
            period_seconds        = 10
          }

          liveness_probe {
            http_get {
              path = "/healthz"
              port = 10254
            }
            initial_delay_seconds = 10
            period_seconds        = 10
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "nginx_ingress_controller_service" {
  metadata {
    name      = "nginx-ingress-controller"
    namespace = var.namespace
    labels = {
      app = "nginx-ingress"
    }
  }

  spec {
    type = "NodePort"

    selector = {
      app = "nginx-ingress"
    }

    port {
      name        = "http"
      port        = 80
      target_port = 80
      node_port   = 30080
    }

    port {
      name        = "https"
      port        = 443
      target_port = 443
      node_port   = 30443
    }
  }
}
