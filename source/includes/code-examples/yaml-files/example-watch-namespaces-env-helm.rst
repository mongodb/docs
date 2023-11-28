.. example::

   .. code-block:: yaml

      # Operator with name `mongodb-enterprise-operator-qa-envs` will
      # watch ns-dev, ns-qa and ns-uat namespaces

      helm install mongodb-enterprise-operator-qa-envs mongodb/enterprise-operator \
        --set operator.watchNamespace="ns-dev\,ns-qa\,ns-uat"

