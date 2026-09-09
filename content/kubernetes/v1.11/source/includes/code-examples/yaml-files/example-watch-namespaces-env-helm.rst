.. code-block:: yaml

   # Operator with name `mongodb-kubernetes-operator-qa-envs` will
   # watch ns-dev, ns-qa and ns-uat namespaces

   helm install mongodb-kubernetes-operator-qa-envs mongodb/mongodb-kubernetes \
      --set operator.watchNamespace="ns-dev\,ns-qa\,ns-uat"
