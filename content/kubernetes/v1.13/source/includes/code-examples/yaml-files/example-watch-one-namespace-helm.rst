.. code-block:: yaml

   # Watch one namespace
   helm install mongodb-kubernetes-operator mongodb/mongodb-kubernetes \
      --set operator.watchNamespace='namespace-to-watch' <...>
