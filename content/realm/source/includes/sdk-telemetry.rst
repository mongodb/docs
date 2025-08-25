MongoDB collects anonymized telemetry data from the Realm SDKs to better
understand how and where developers use Realm. This data helps us
determine what to work on next and lets us gracefully deprecate features
with minimal impact. None of the telemetry data collected by the Realm
SDKs personally identifies you, your app, or your employer.

Data is collected whenever you install the SDK, build your app (if
applicable), or run your app in a non-production, debugging environment.

MongoDB collects the following information:

- An anonymized machine ID and bundle ID
- The Realm SDK version
- Your programming language and framework versions
- Your operating system platform and version

Telemetry is on by default for the Realm SDKs. You can disable telemetry
at any time b by setting the ``REALM_DISABLE_ANALYTICS`` environment
variable to ``true`` in your shell environment:

.. code-block:: shell
   
   export REALM_DISABLE_ANALYTICS=true
