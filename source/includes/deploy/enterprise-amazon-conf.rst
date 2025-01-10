.. Configure repository for MongoDB Enterprise on Amazon

Create a ``/etc/yum.repos.d/mongodb-enterprise-{+version+}.repo``
file so that you can install MongoDB directly using ``yum``:

.. include:: /includes/deploy/code/enterprise-amazon2

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


