.. code-block:: cfg

   [mongodb-enterprise-{+version+}]
   name=MongoDB Enterprise Repository
   baseurl=https://repo.mongodb.com/yum/amazon/2023/mongodb-enterprise/{+version+}/$basearch/
   gpgcheck=1
   enabled=1
   gpgkey=https://pgp.mongodb.com/server-{+pgp-version+}.asc

