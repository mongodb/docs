.. admonition:: Package Updates required on Ubuntu 16.04 for IBM POWER Systems
   :class: warning

   Due to a lock elision bug present in older versions of the ``glibc``
   package on Ubuntu 16.04 for POWER, you must upgrade the ``glibc``
   package to at least ``glibc 2.23-0ubuntu5`` before running MongoDB.
   Systems with older versions of the ``glibc`` package will experience
   database server crashes and misbehavior due to random memory
   corruption, and are unsuitable for production deployments of MongoDB
