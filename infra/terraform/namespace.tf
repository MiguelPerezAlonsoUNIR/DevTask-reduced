resource "kubernetes_namespace" "devtask" {
  metadata {
    name = var.namespace
  }
}
