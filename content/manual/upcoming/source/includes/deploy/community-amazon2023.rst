.. code-block:: cfg
      
   [mongodb-org-{+version+}]
   name=MongoDB Repository
   baseurl=https://repo.mongodb.org/yum/amazon/2023/mongodb-org/{+version+}/x86_64/
   gpgcheck=1
   enabled=1
   gpgkey=https://pgp.mongodb.com/server-{+pgp-version+}.asc

You can also download the ``.rpm`` files directly from the
`MongoDB repository <https://repo.mongodb.org/yum/amazon/>`_.
Downloads are organized by Amazon Linux 2023 version (for
example, ``2023``), then MongoDB :ref:`version
<release-version-numbers>` (``{+version+}``), then
architecture (``x86_64``).

.. include:: /includes/5.0-changes/fact-odd-number-releases
 
