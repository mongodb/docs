.. option:: --defaultAuthMechanism <authMechanism>

   *Default*: SCRAM-SHA-1

   Specifies the default authentication mechanism. Set this value to
   specify a default mechanism for connecting to :program:`mongosqld`. Any
   connection which uses this specified default value can omit
   the ``mechanism`` value from its :ref:`MySQL <connect-mysql-auth>` or
   :ref:`Tableau <connect-tableau-auth>` username.
   
   .. include:: /includes/auth-mechanisms.rst

