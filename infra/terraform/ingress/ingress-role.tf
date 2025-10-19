resource "kubernetes_role" "nginx_ingress_pod_reader" {
  metadata {
    name      = "nginx-ingress-pod-reader"
    namespace = var.namespace
  }

  rule {
    api_groups = [""]
    resources  = ["pods"]
    verbs      = ["get"]
  }
}

