.. code-block:: cfg

   [mongodb-enterprise-{+version+}]
   name=MongoDB Enterprise Repository
   baseurl=https://repo.mongodb.com/yum/amazon/2023/mongodb-enterprise/{+version+}/$basearch/
   gpgcheck=1
   enabled=1
   gpgkey=https://pgp.mongodb.com/server-{+pgp-version+}.asc

.. note::

   If you have a ``mongodb-enterprise.repo`` file
   in this directory from a previous installation of MongoDB, you
   should remove it. Use the ``mongodb-enterprise-{+version+}.repo``
   file above to install MongoDB {+version+}.

You can also download the ``.rpm`` files directly from the
`MongoDB repository <https://repo.mongodb.com/yum/amazon/>`_.
Downloads are organized by Amazon Linux version (for example,
``2023``), then MongoDB :ref:`release version
<release-version-numbers>` (``{+version+}``), then
architecture (``x86_64``).


