When this feature is enabled, the {+mdbagent+} doesn't store the MongoDB
process configuration on disk. If the |mms| app server
is unavailable and the {+mdbagent+} attempts to restart, then the
{+mdbagent+} stops running because it doesn't have the necessary
configuration information. If a MongoDB process crashes while the
{+mdbagent+} isn't running, then the {+mdbagent+} can't restart the
process. 
