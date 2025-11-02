# CI/CD Configuration for Vite Frontend

## 🚀 Workflows Implementados

### 1. CI/CD Principal (.github/workflows/ci-cd.yml)
- **Trigger**: Push a main/develop y PRs
- **Jobs**:
  - test-and-build: Linting, build y tests
  - docker-build-and-push: Build y push a GHCR
  - deploy-to-kubernetes: Deploy a Kubernetes

### 2. Preview Deploy (.github/workflows/preview.yml)
- **Trigger**: Pull Requests
- **Deploy**: Preview en GitHub Pages
- **Auto-comment**: Link de preview en PR

### 3. Quality Gate (.github/workflows/quality.yml)
- **Trigger**: Semanal y manual
- **Checks**: Security audit, bundle size, warnings

## 🔑 Secrets Requeridos

Configurar en GitHub Secrets:

```bash
K8S_CONFIG=<kubeconfig-en-base64>
# Opcional: SNYK_TOKEN para security scanning
