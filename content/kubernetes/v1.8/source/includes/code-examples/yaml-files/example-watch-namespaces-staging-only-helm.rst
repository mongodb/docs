.. code-block:: yaml

   # Operator with name `mongodb-kubernetes-operator-staging` will
   # watch ns-staging and ns-pre-prod
   helm install mongodb-kubernetes-operator-staging mongodb/mongodb-kubernetes --set operator.watchNamespace="ns-staging\,ns-pre-prod"
