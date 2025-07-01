.. setting:: mms.remoteIp.header

   *Type*: string

   
   If you use a load balancer with the |application|, set this to the
   |http| header field the load balancer uses to identify the
   originating client's IP address to the |onprem| host. When you
   specify :setting:`Load Balancer Remote IP Header`, do not allow
   clients to connect directly to any |onprem| host. A load
   balancer placed in front of the |onprem| hosts must not
   return cached content.
   
   Once :setting:`Load Balancer Remote IP Header` is set, |onprem|
   enables the following |http| headers:
   
   .. list-table::
      :widths: 30 70
      :header-rows: 1
   
      * - |http| Header
        - Forwards to |mms|
   
      * - :rfc:`X-Forwarded-Host <7239#section-5.3>`
        - Original host that the client requested in the Host |http|
          request header.
   
      * - :rfc:`X-Forwarded-Proto <7239#section-5.4>`
        - Protocol used to make the |http| request.
   
      * - `X-Forwarded-Server <https://www.eclipse.org/jetty/javadoc/current/org/eclipse/jetty/server/ForwardedRequestCustomizer.html>`__
        - Hostname of the proxy server.
   
      * - `X-Proxied-Https <https://www.eclipse.org/jetty/javadoc/current/org/eclipse/jetty/server/ForwardedRequestCustomizer.html>`__
        - |https| status of a request.
   
   To learn more, see
   :doc:`/tutorial/configure-application-high-availability`.
   
   Corresponds to :setting:`Load Balancer Remote IP Header`.
   

