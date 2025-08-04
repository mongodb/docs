The :github:`MongoDB Enterprise Kubernetes Operator </mongodb/mongodb-enterprise-kubernetes>`
creates |k8s| |k8s-statefulsets| from specification files that you write.

The |k8s-op-short| creates MongoDB-specific resources in |k8s| as
:k8sdocs:`custom resources </concepts/extend-kubernetes/api-extension/custom-resources/>`.

To manage these custom resources, use the following process:

1. Create or update a |k8s-mdbrsc| specification.
2. Direct |k8s-op-full| to apply it to your |k8s| environment.
   As a result, |k8s-op-short| performs these actions:

   - Creates the defined |k8s-statefulsets|, services and other |k8s| resources.
   - Updates the |onprem-link| deployment configuration to reflect changes.
