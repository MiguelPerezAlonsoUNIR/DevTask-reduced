resource "kubernetes_role_binding" "nginx_ingress_pod_reader" {
  metadata {
    name      = "nginx-ingress-pod-reader-binding"
    namespace = var.namespace
  }

  role_ref {
    api_group = "rbac.authorization.k8s.io"
    kind      = "Role"
    name      = kubernetes_role.nginx_ingress_pod_reader.metadata[0].name
  }

  subject {
    kind      = "ServiceAccount"
    name      = kubernetes_service_account.nginx_ingress.metadata[0].name
    namespace = var.namespace
  }
}
