Sends the alert to a `Datadog <https://www.datadoghq.com/alerts/>`__
account as a Datadog :ddog-docs:`event </graphing/event_stream/>`.

When the alert first opens, |mms| sends the alert as an "error" event.
Subsequent updates are sent as "info" events. When the alert closes,
|mms| sends a "success" event.

If prompted, enter your DataDog |api| key under :guilabel:`API Key` and
click :guilabel:`Validate Datadog API Key`.

Find your DataDog :ddog-docs:`API Key </api/v1/authentication>`
in :ddog-app:`your Datadog account </account/settings#api>`.
