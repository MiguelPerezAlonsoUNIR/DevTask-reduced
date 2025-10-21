#!/bin/bash

echo "Provision infrastructure with Terraform..."
terraform -chdir=infra/ apply -auto-approve

echo "Build and push Docker images..."
docker build -t registry/backend:latest ./backend/
docker build -t registry/frontend:latest ./frontend/
docker push registry/backend:latest
docker push registry/frontend:latest

echo "Apply Kubernetes manifests..."
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/mongodb/
kubectl apply -f k8s/backend/
kubectl apply -f k8s/frontend/
kubectl apply -f k8s/ingress.yaml

echo "Ansible health checks..."
ansible-playbook validate.yml
