Starting in MongoDB 8.1, ``mongos`` parses the proxy protocol header and
stores the origin client computer IP address and port in the ``remote``
field. Also, if a load balancer is used, the ``intermediates`` document
stores the load balancer IP address and port.

In MongoDB versions earlier than 8.1, the load balancer IP address and
port are stored in the ``remote`` field and the origin client computer
IP address and port are omitted.
