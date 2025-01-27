
Disables the :ref:`Embedded Verifier <c2c-embedded-verifier>`.
When disabled, ``mongosync`` does not verify the migration. For
alternative verification methods, see :ref:`c2c-verification`.

This option provides a workaround for customers who 
experience OOM kills when running ``mongosync`` with
verification and cannot allocate more resources or tolerate
restarting verification. It allows the migration to complete
with verification disabled. Verification remains disabled
for subsequent restarts and reversals.

This option should not be used when ``mongosync`` is initially
started. Instead, disable verification with the :ref:`/start
<c2c-api-start>` request parameter ``verification.enabled:
false`` since verification is enabled by default.

