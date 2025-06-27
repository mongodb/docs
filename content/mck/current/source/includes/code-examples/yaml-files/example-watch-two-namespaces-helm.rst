.. code-block:: yaml

   # Watch both namespace-a and namespace-b
   helm install mongodb-kubernetes-operator mongodb/mongodb-kubernetes \
      --set operator.watchNamespace="namespace-a\,namespace-b"
