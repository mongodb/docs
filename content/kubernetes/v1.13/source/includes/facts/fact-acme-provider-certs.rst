If you're using an |acme| based service provider such as `Let's Encrypt 
<https://letsencrypt.org>`_ to issue |tls| certificates, the provider 
might prohibit you from adding the Pod's default |fqdn|\s (``*.svc.cluster.local``)
to |san-dns|\s in the certificate.
