.. list-table::
   :widths: 15 15 20 50
   :header-rows: 1

   * - Validator Job Exit Code
     - Condition Status
     - Reason
     - Meaning

   * - Job still running
     - ``Unknown``
     - ``Running``
     - The ``status.phase`` is ``ConnectivityCheckRunning``.

   * - ``0``
     - ``True``
     - ``NetworkValidationPassed``
     - All external members are reachable and authenticated.

   * - ``2``
     - ``False``
     - ``AuthenticationFailed``
     - Credentials, the authentication mechanism, or a missing
       ``__system@local`` role.

   * - ``3``
     - ``False``
     - ``NetworkFailed``
     - DNS, TLS, timeouts, or unreachable members. Check the Job
       Pod logs.

   * - ``1`` or other
     - ``False``
     - ``UnknownError``
     - Unclassified failure. Check the Job Pod logs.

Failures that occur before the Job starts use the reasons
``OperatorImageUnknown``, ``BuildStatefulSetOptions``,
``AgentCertSecretFailed``, and ``AgentCertSubject``.

|k8s-op-short| removes the ``NetworkConnectivityVerified``
condition from ``status.conditions`` entirely once no external
members remain.
