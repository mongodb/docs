Static containers are more secure and simpler than non-static 
containers. Static containers are immutable at runtime. In addition:

- While running, static containers can't download binaries or run scripts or other 
  utilities over network connections. Static containers can only download runtime 
  configuration files. 
- While running, static containers can't modify any file except storage volume mounts.
- Static containers don't require that you scan the containers for security vulnerabilities, 
  as opposed to non-static containers that require container security scanning. If you use 
  static containers, you can only run security scans on the container images 
  themselves but not on their containers.
- If you have an air-gapped environment, static containers don't require that you 
  host the MongoDB binary on the server that hosts |onprem| or another |https| server.
- You can't run extensive ``CMD`` scripts for the static container.
- You can't copy files between static containers using ``initContainer``. 
  
.. note:: 

   When deployed as static containers, a |k8s-op-short| deployment consists of 
   two containers - a ``mongodb-agent`` container and a ``mongodb-enterprise-server``
   container. The MongoDB database custom resource inherits resource limit 
   definitions from the ``mongodb-agent`` container, which runs the ``mongod`` 
   process in a static container deployment. In order to modify the resource 
   limits for the MongoDB database resource, you must specify your desired 
   resource limits on the ``mongodb-agent`` container. 
