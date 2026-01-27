Specifies the server monitoring protocol to use. The available values for this
property are defined in the `ServerMonitoringMode <{+api-root+}/MongoDB.Driver/MongoDB.Driver.Core.Servers.ServerMonitoringMode.html>`__
enum. The default value is ``Auto``.

When this option is set to ``Auto`` the monitoring mode is determined
by the environment in which the driver is running. The driver
uses polling mode in function-as-a-service (FaaS) environments,
such as AWS Lambda, and the streaming mode in other environments.