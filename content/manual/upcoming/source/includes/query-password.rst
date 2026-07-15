
.. START-CONFIG-QUERYPASSWORD

*Type*: string or array

*Available in MongoDB Enterprise only.*

The password used to bind to an LDAP server when using
:setting:`~security.ldap.bind.queryUser`. You must use 
:setting:`~security.ldap.bind.queryPassword` with
``queryUser``.

If not set, :binary:`~bin.mongod` or :binary:`~bin.mongos` does not attempt to
bind to the LDAP server.

You can configure this setting on a running ``mongod`` or 
``mongos`` using :dbcommand:`setParameter`.

The ``ldapQueryPassword`` ``setParameter`` command accepts either a 
string or an array of strings. If ``ldapQueryPassword`` is set to an array, 
MongoDB tries each password in order until one succeeds. Use a password array 
to roll over the LDAP account password without downtime.

.. note::

    Windows MongoDB deployments can use :setting:`~security.ldap.bind.useOSDefaults`
    instead of ``queryUser`` and 
    ``queryPassword``. You cannot specify both 
    ``queryPassword`` and 
    ``useOSDefaults`` at the same time.

.. END-CONFIG-QUERYPASSWORD


.. START-MONGOD-QUERYPASSWORD

*Available in MongoDB Enterprise only.*

The password used to bind to an LDAP server when using
:option:`--ldapQueryUser`. You must use :option:`--ldapQueryPassword` with
``--ldapQueryUser``.

If not set, :program:`mongod` does not attempt to bind to the LDAP server.

You can configure this setting on a running :program:`mongod` using
``setParameter``.

The ``ldapQueryPassword`` ``setParameter`` command accepts either a 
string or an array of strings. If ``ldapQueryPassword`` is set to an array, 
MongoDB tries each password in order until one succeeds. Use a password array 
to roll over the LDAP account password without downtime.

.. note::

    Windows MongoDB deployments can use :option:`--ldapBindWithOSDefaults`
    instead of ``--ldapQueryUser`` and ``--ldapQueryPassword``. 
    You cannot specify both ``--ldapQueryPassword`` and 
    ``--ldapBindWithOSDefaults`` at the same time.

.. END-MONGOD-QUERYPASSWORD


.. START-MONGOLDAP-QUERYPASSWORD

*Available in MongoDB Enterprise only.*

The password used to bind to an LDAP server when using
``--ldapQueryUser``. You must use ``--ldapQueryPassword`` with
``--ldapQueryUser``.

If not set, :program:`mongoldap` does not attempt to bind to the LDAP server.

You can configure this setting on a running :program:`mongoldap` using
``setParameter``.

The ``ldapQueryPassword`` ``setParameter`` command accepts either a 
string or an array of strings. If ``ldapQueryPassword`` is set to an array, 
MongoDB tries each password in order until one succeeds. Use a password array 
to roll over the LDAP account password without downtime.

.. note::

    Windows MongoDB deployments can use ``--ldapBindWithOSDefaults``
    instead of ``--ldapQueryUser`` and ``--ldapQueryPassword``. 
    You cannot specify both ``--ldapQueryPassword`` and 
    ``--ldapBindWithOSDefaults`` at the same time.

.. END-MONGOLDAP-QUERYPASSWORD