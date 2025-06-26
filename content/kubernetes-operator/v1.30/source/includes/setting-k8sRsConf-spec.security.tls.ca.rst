.. setting:: spec.security.tls.ca

   *Type*: string

   Provide the name of the |k8s-configmap| that stores the |certauth| for the |k8s-mdbrsc|.
   
   .. important::
   
      If you use a custom |certauth| to sign your |tls| certificates for the |k8s-mdbrsc|,
      you must specify this parameter.
   
      The |k8s-op-short| requires that you name the
      |k8s-mdbrsc| certificate ``ca-pem`` in the ConfigMap.
   

