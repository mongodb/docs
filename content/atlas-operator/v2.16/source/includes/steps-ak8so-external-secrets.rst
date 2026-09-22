To use `External Secrets Operator 
<https://external-secrets.io/latest/>`__ as the secret provisioning
tool:

a. Run the following commands to install External Secrets Operator
   with Helm Charts and start the service:

   .. code-block:: sh
      
      helm repo add external-secrets https://charts.external-secrets.io

   .. code-block:: sh

      helm upgrade -i --atomic \
      -n external-secrets --create-namespace --set extraArgs.loglevel=debug \
      external-secrets external-secrets/external-secrets`

#. Ensure External Secrets runs successfully:

   .. io-code-block::
      :copyable: true 

      .. input:: 

         kubectl get pod -n external-secrets -l app.kubernetes.io/name=external-secrets
                  
      .. output::

         NAME                                READY   STATUS    RESTARTS   AGE
         external-secrets-5779d5d6f6-2lhgd   1/1     Running   0          70s