.. warning::

   |onprem| automation doesn't support or validate the following settings. Using them 
   could cause deployment failure or downtime.

   - :manual:`net.unixDomainSocket </reference/configuration-options>` options such as 
     :setting:`net.unixDomainSocket.enabled`, :setting:`net.unixDomainSocket.pathPrefix`, 
     and :setting:`net.unixDomainSocket.filePermissions`. 

   - |onprem| automation rejects deployments that contain internal settings such as 
     :configexpansion:`__exec` and :configexpansion:`__rest`.

   If you require these settings, you must manage the deployment manually without |onprem|.