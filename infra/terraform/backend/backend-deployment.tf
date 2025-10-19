resource "kubernetes_deployment" "backend" {
  metadata {
    name      = "backend"
    namespace = var.namespace
    labels = {
      app = "backend"
    }
  }

  spec {
    replicas = var.replicas

    selector {
      match_labels = {
        app = "backend"
      }
    }

    template {
      metadata {
        labels = {
          app = "backend"
        }
      }

      spec {
        container {
          name  = "backend"
          image = var.image

          port {
            container_port = 5000
          }

          readiness_probe {
            http_get {
              path = "/api/tasks"
              port = 8083
            }
            initial_delay_seconds = 10
            period_seconds        = 10
          }

          env {
            name  = "MONGO_URL"
            value = "mongodb://mongo:27017/devtask"
          }

          resources {
            limits = {
              cpu    = "500m"
              memory = "512Mi"
            }
            requests = {
              cpu    = "250m"
              memory = "256Mi"
            }
          }
        }
      }
    }
  }
}
