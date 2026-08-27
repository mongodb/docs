.. setting:: spec.opsManager.configMapRef.name

   *Type*: string

   Name of the |k8s-configmap| with the |com| connection
   configuration. The :setting:`spec.cloudManager.configMapRef.name`
   setting is an alias for this setting and can be used in its place.
   
   .. include:: /includes/admonitions/note-namespace-match-configmap.rst
   
   .. include:: /includes/admonitions/fact-k8s-operator-manages-configmap.rst
   

