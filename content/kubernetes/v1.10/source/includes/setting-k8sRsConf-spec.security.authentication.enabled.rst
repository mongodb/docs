.. setting:: spec.security.authentication.enabled

   *Type*: boolean

   *Default*: ``false``

   Specifies whether authentication is enabled on the |com|
   project. If set to ``true``, you must set an authentication mechanism in 
   :setting:`spec.security.authentication.modes`.
   
   .. important::
   
      The |k8s-op-short| manages authentication for this MongoDB
      resource if you include this setting, even if it's set to
      ``false``. You can't configure authentication for this
      resource using the |com| UI  or APIs while this setting
      exists in the resource specification.
   
      Omit this setting if you want to manage authentication using the
      |com| UI or APIs.
   

