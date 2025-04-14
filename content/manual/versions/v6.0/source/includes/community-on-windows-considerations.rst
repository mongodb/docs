
Localhost Binding by Default
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. include:: /includes/fact-installation-bind-ip-default-in-config.rst

Point Releases and ``.msi``
~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you installed MongoDB with the Windows installer (``.msi``), the
``.msi`` automatically upgrades within the :ref:`same release series
<release-version-numbers>` (e.g. 7.2.1 to 7.2.2).

Upgrading a full release series (e.g. 6.0 to 7.0) requires a new
installation.

Add MongoDB binaries to the System PATH
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you add ``C:\Program Files\MongoDB\Server\{+version+}\bin`` to your
System ``PATH``, you can omit the full path to the MongoDB Server
binaries. You should also add the path to :mongosh:`mongosh </>` if you
have not already done so.
