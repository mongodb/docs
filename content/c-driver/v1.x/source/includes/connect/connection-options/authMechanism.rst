The mechanism that the driver uses to authenticate to {+mdb-server+}.
If you don't specify an authentication mechanism, the driver uses either
``SCRAM-SHA-1`` or ``SCRAM-SHA-256``, depending on the server version. To
learn more about available authentication mechanisms, see the
:ref:`Authentication Mechanisms <c-auth>` or the 
:ref:`Enterprise Authentication Mechanisms <c-enterprise-auth>` guide.