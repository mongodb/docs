Starting in MongoDB 5.1, instances running in 
:ref:`FIPS mode <fips-overview>` have the 
:ref:`SCRAM-SHA-1 authentication mechanism <authentication-parameters>`
disabled by default. You can enable the :ref:`SCRAM-SHA-1 authentication
mechanism <authentication-parameters>` with the
:ref:`setParameter.authenticationMechanisms
<set-parameter-authenticationMechanisms-code>` command.

This change will not affect drivers which target MongoDB 
:dbcommand:`setFeatureCompatibilityVersion` 4.0+.