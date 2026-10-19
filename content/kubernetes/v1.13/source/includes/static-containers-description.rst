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

   When using static containers, the container layout and resource
   limits differ between MongoDB Database CR and {+appdb+}
   deployments.

   When deployed as static containers, a MongoDB Database CR
   consists of two containers with distinct roles:

   - The ``mongodb-agent`` container runs the MongoDB Agent, which
     then runs the ``mongod`` process. This container handles the
     actual database workload.
   - The ``mongodb-enterprise-server`` container provides the
     MongoDB binaries but does not run any active processes.

   To modify the resource limits for the MongoDB database resource,
   specify your desired resource limits on the ``mongodb-agent``
   container. Resource limits set on the
   ``mongodb-enterprise-server`` container have no functional
   impact on performance, though they still count toward node
   resource allocation.

   For the {+appdb+} in static architecture, ``mongod`` runs
   directly in the ``mongod`` container, not in ``mongodb-agent``.
   To modify the resource limits for the {+appdb+}, specify your
   desired resource limits on the ``mongod`` container instead.
