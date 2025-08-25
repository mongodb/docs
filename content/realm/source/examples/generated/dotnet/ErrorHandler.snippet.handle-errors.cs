config.OnSessionError = (session, sessionException) =>
{
    switch (sessionException.ErrorCode)
    {
        // See https://www.mongodb.com/docs/realm-sdks/dotnet/latest/reference/Realms.Sync.Exceptions.ErrorCode.html
        // for a list of all error codes
        case ErrorCode.BadQuery:
            break;
    }
};
