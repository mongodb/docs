.. warning:: 

   3.4 Incompatibility with Ubuntu 16.04 on IBM Power Systems
      Due to a `lock elision bug in glibc
      <https://bugs.launchpad.net/ubuntu/+source/glibc/+bug/1642390>`_,
      if you are running on Ubuntu 16.04 on IBM Power Systems, do not use
      MongoDB 3.4 in production until the ``glibc`` version with the
      fix becomes available and you have installed that version.
