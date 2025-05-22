
.. START-CONFIG-QUERYPASSWORD

*Type*: string or array

*Available in MongoDB Enterprise only.*

The password used to bind to an LDAP server when using
:setting:`~security.ldap.bind.queryUser`. You must use 
:setting:`~security.ldap.bind.queryPassword` with
:setting:`~security.ldap.bind.queryUser`.

If not set, :binary:`~bin.mongod` or :binary:`~bin.mongos` does not attempt to
bind to the LDAP server.

You can configure this setting on a running :binary:`~bin.mongod` or 
:binary:`~bin.mongos` using :dbcommand:`setParameter`.

The ``ldapQueryPassword`` :dbcommand:`setParameter` command accepts either a 
string or an array of strings. If ``ldapQueryPassword`` is set to an array, 
MongoDB tries each password in order until one succeeds. Use a password array 
to roll over the LDAP account password without downtime.

.. note::

    Windows MongoDB deployments can use :setting:`~security.ldap.bind.useOSDefaults`
    instead of :setting:`~security.ldap.bind.queryUser` and 
    :setting:`~security.ldap.bind.queryPassword`. You cannot specify both 
    :setting:`~security.ldap.bind.queryPassword` and 
    :setting:`~security.ldap.bind.useOSDefaults` at the same time.

.. END-CONFIG-QUERYPASSWORD


.. START-MONGOD-QUERYPASSWORD

*Available in MongoDB Enterprise only.*

The password used to bind to an LDAP server when using
:option:`--ldapQueryUser`. You must use :option:`--ldapQueryPassword` with
:option:`--ldapQueryUser`.

If not set, :program:`mongod` does not attempt to bind to the LDAP server.

You can configure this setting on a running :program:`mongod` using
:dbcommand:`setParameter`.

The ``ldapQueryPassword`` :dbcommand:`setParameter` command accepts either a 
string or an array of strings. If ``ldapQueryPassword`` is set to an array, 
MongoDB tries each password in order until one succeeds. Use a password array 
to roll over the LDAP account password without downtime.

.. note::

    Windows MongoDB deployments can use :option:`--ldapBindWithOSDefaults`
    instead of :option:`--ldapQueryUser` and :option:`--ldapQueryPassword`. 
    You cannot specify both :option:`--ldapQueryPassword` and 
    :option:`--ldapBindWithOSDefaults` at the same time.

.. END-MONGOD-QUERYPASSWORD


.. START-MONGOLDAP-QUERYPASSWORD

*Available in MongoDB Enterprise only.*

The password used to bind to an LDAP server when using
:option:`--ldapQueryUser`. You must use :option:`--ldapQueryPassword` with
:option:`--ldapQueryUser`.

If not set, :program:`mongoldap` does not attempt to bind to the LDAP server.

You can configure this setting on a running :program:`mongoldap` using
:dbcommand:`setParameter`.

The ``ldapQueryPassword``:dbcommand:`setParameter` command accepts either a 
string or an array of strings. If ``ldapQueryPassword`` is set to an array, 
MongoDB tries each password in order until one succeeds. Use a password array 
to roll over the LDAP account password without downtime.

.. note::

    Windows MongoDB deployments can use :option:`--ldapBindWithOSDefaults`
    instead of :option:`--ldapQueryUser` and :option:`--ldapQueryPassword`. 
    You cannot specify both :option:`--ldapQueryPassword` and 
    :option:`--ldapBindWithOSDefaults` at the same time.

.. END-MONGOLDAP-QUERYPASSWORD