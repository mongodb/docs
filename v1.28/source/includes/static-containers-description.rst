Static containers are simpler and more secure than non-static
containers. Static containers are immutable at runtime, which means that
they don't change from the image used to create the container. In
addition: 

- While running, static containers don't download binaries or run
  scripts or other utilities over network connections. Static containers
  only download runtime configuration files.  
- While running, static containers don't modify any file except storage
  volume mounts. 
- You can run security scans on the container images to determine what is
  actually run as a live container, and the container that runs won't
  run binaries other than what was defined in the
  image.  
- Static containers don't require that you host the MongoDB binary on
  either |onprem| or another |https| server, which is especially useful
  if you have an air-gapped environment.
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
