.. setting:: prom.listening.port

   *Type*: number
   
   The port over which |mms| listens for requests to the Prometheus
   endpoint. The port must be different than the port |mms| is already
   listening on, 8080 for |http| or 8443 for |https|. Every server will
   listen on the specified port. So, ensure that the port is available
   as an open port on every server. If you want to specify different
   port for each server, use ``conf-mms.properties`` instead to specify
   the ports. 
