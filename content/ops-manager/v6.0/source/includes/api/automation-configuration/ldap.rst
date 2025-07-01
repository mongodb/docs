The ``ldap`` object enables |ldap| authorization. This
object is optional. To learn more, see :ref:`enable-ldap-auth`.

.. code-block:: json

    "ldap": {
      "servers": "<host>:<port>, <host>:<port>",
      "timeoutMS": "<time>",
      "bindMethod": "<sasl/simple>",
      "bindSaslMechanisms": "<sasl-mechanism>, <sasl-mechanism>",
      "bindQueryUser": <ldap-dn>",
      "bindQueryPassword": "<password>",
      "userCacheInvalidationPeriod": "<interval>",
      "authzQueryTemplate": "<rfc-4516-url>",
      "userToDNMapping": [
 		{
   			"match": "<ECMAScript-regex>",
   			"<substition/ldapQuery>": "<DN-string/RFC4516-encoded-LDAP-query>"
 		}
      ]
   }

.. list-table::
   :widths: 20 14 11 55
   :header-rows: 1

   * - Name
     - Type
     - Necessity
     - Description

   * - ldap
     - object
     - Optional
     - Object that contains the settings to enable and configure |ldap| 
       authorization.

   * - ldap.servers
     - string
     - Conditional
     - Comma-separated string that contains one or more |ldap| servers 
       in ``<host>:<port>`` format to execute queries against. You can 
       use ``setParameter`` to configure this setting on a running 
       system. For |ldap| authorization, you must specify this setting.

   * - ldap.timeoutMS
     - long
     - Optional
     - Amount of time in milliseconds that MongoDB waits for an |ldap| 
       server to respond to a request before timing out. You can use 
       ``setParameter`` to configure this setting on a running system. 
       By default, MongoDB times out after ten seconds.

   * - ldap.bindMethod
     - string
     - Optional
     - Human-readable string that indicates whether to use simple 
       authentication or an |sasl| protocol to authenticate itself. You 
       can specify ``simple`` or ``sasl``. By default, MongoDB uses 
       simple authentication.

   * - ldap.bindSaslMechanisms
     - string
     - Optional
     - String that contains a comma-separated list of |sasl| mechanisms 
       for MongoDB to attempt authentication against the |ldap| 
       server while binding. By default, MongoDB uses ``DIGEST-MD5`` to 
       bind.

   * - ldap.bindQueryUser
     - string
     - Conditional
     - |ldap| entity domain name that MongoDB binds as when it connects 
       to an |ldap| server. You can use ``setParameter`` to configure 
       this setting on a running system. For MongoDB to bind with 
       authentication credentials, you must specify this setting.

   * - ldap.bindQueryPassword
     - string
     - Conditional
     - Password that MongoDB binds with when it connects to an |ldap| 
       server. You can use ``setParameter`` to configure this setting 
       on a running system. For MongoDB to bind with a password, you 
       must specify this setting.
      
   * - ldap.userCacheInvalidationPeriod
     - integer
     - Optional
     - Interval that MongoDB waits between user cache flushes. When the 
       external user cache is flushed, the next operation that an
       |ldap| authorized user makes requires a reaquisition of roles. 
       If you specify a high value, you might decrease the load on 
       your |ldap| servers and increase the amount of time needed to 
       synchronize MongoDB roles with |ldap| group membership. By 
       default, MongoDB waits 30 seconds between cache flushes.

   * - ldap.authzQueryTemplate
     - string
     - Conditional
     - :rfc:`RFC 4516 <4516>` formatted |url| of the |ldap| query to 
       execute to obtain |ldap| groups relative to the ``ldap.server`` 
       setting. In this |url|, the placeholder token string ``{USER}`` 
       is replaced with the acquired user domain name. You can use 
       ``setParameter`` to configure this setting on a running system. 
       For |ldap| authorization, you must specify this setting. 

   * - ldap.userToDNMapping
     - array
     - Optional
     - |json|-formatted array that contains the ordered transformations 
       that MongoDB applies to authenticate MongoDB user names to match 
       their domain names. You can specify this setting if you use an 
       alternate authentication method, or if the user name passed to 
       MongoDB for authentication doesn't match the |ldap| domain name. 
       You can use ``setParameter`` to configure this setting on a 
       running system. By default, MongoDB uses user names as the 
       domain names for automatic |ldap| authorization.
