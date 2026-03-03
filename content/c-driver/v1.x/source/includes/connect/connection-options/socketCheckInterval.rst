Only applies to single threaded clients. If a socket has not been used within 
this time, the driver checks the connection with a quick "hello" call before it is 
used again. Defaults to ``5000`` ms (5 seconds).