using Realms.Logging;
Logger.LogLevel = LogLevel.All;
// customize the logging function:
Logger.Default = Logger.Function(message =>
{
    // Do something with the message
});
