.. code-block:: yaml

   # Operator with name `mongodb-kubernetes-operator-staging` will
   # watch ns-staging and ns-pre-prod
   helm install mongodb-operator helm-chart --set operator.watchNamespace="ns-staging\,ns-pre-prod" mongodb-kubernetes-operator-staging
