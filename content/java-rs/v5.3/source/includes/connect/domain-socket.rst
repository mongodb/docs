.. important:: 

    The {+driver-short+} does not support `UnixServerAddress
    <{+core-api+}/UnixServerAddress.html>`__ objects or domain socket
    connections. To use a domain socket to connect, use the :driver:`Java Sync
    driver. </java/sync/current/>` Otherwise, use a `ServerAddress
    <{+core-api+}/ServerAddress.html>`__ object to connect from the
    {+driver-short+}.