.. code-block:: cfg
      
   [mongodb-org-{+version+}]
   name=MongoDB Repository
   baseurl=https://repo.mongodb.org/yum/amazon/2023/mongodb-org/{+version+}/$basearch/
   gpgcheck=1
   enabled=1
   gpgkey=https://pgp.mongodb.com/server-{+pgp-version+}.asc

