Sends the alert to a `Datadog <https://www.datadoghq.com/alerts/>`__
account as a Datadog `event <https://docs.datadoghq.com/graphing/event_stream/>`__.

When the alert first opens, |mms| sends the alert as an "error" event.
Subsequent updates are sent as "info" events. When the alert closes,
|mms| sends a "success" event.

If prompted, enter your DataDog |api| key under :guilabel:`API Key` and
click :guilabel:`Validate Datadog API Key`.

Find your DataDog `API Key <https://docs.datadoghq.com/api/v1/authentication>`__
in `your Datadog account <https://app.datadoghq.com/account/settings#api>`__.
