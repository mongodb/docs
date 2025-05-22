If you upgrade an existing instance of MongoDB to MongoDB
|broken-version|, that instance may fail to start if ``fork: true`` is
set in the ``mongod.conf`` file.

The upgrade issue affects all MongoDB instances that use ``.deb`` or
``.rpm`` installation packages. Installations that use the tarball
(``.tgz``) release or other package types are not affected. For more
information, see :issue:`SERVER-74345`.

To remove the ``fork: true`` setting, run these commands from a system
terminal:

.. code-block:: shell
 
   systemctl stop mongod.service
   sed -i.bak '/fork: true/d' /etc/mongod.conf
   systemctl start mongod.service

The second ``systemctl`` command starts the upgraded instance after the
setting is removed.

