
Create a ``/etc/yum.repos.d/mongodb-org-{+version+}.repo``
file so that you can install MongoDB directly using ``yum``:

.. tabs::

   .. tab:: Amazon Linux 2023
      :tabid: amazon2023

      .. include:: /includes/deploy/code/community-amazon2023

   .. tab:: Amazon 2
      :tabid: amazon2

      .. include:: /includes/deploy/code/community-amazon2

You can also download the ``.rpm`` files directly from the
`MongoDB repository <https://repo.mongodb.org/yum/amazon/>`_.
Downloads are organized by Amazon Linux 2023 version (for
example, ``2023``), then MongoDB :ref:`version
<release-version-numbers>` (``{+version+}``), then
architecture (``x86_64``).

.. include:: /includes/5.0-changes/fact-odd-number-releases
 
