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
  