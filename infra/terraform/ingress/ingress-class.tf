resource "kubernetes_ingress_class" "nginx" {
  metadata {
    name = "nginx"
  }

  spec {
    controller = "k8s.io/ingress-nginx"
  }
}
