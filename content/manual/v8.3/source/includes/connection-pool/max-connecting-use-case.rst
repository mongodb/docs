Raising the value of ``maxConnecting`` allows the client to establish
connection to the server faster, but increases the chance of
:term:`connection storms <connection storm>`. If the value of
``maxConnecting`` is too low, your connection pool may experience heavy
throttling and increased tail latency for clients checking out
connections.
