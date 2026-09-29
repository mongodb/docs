.. [#cnchange]

   MongoDB wrote the {+mdbagent+} the Go language. Go 1.17 removed the
   ability to use `X.509 CommonName field as a hostname
   <https://go.dev/doc/go1.17#crypto/x509>`__ when no |san-dns| exists.

   When clients validate |tls| certificates, the client checks the
   hostname or hostnames to which the certs apply from the values in
   the cert's |san-dns| or Subject Distinguished Name (DN) fields. When
   creating |tls| certificates, some people would use the Subject
   Common Name (CN) field to store the hostname. CNs have limitations
   that make them a poor choice to store hostnames. These limits
   include a 64-character maximum length and no support for Name
   Constraints. :rfc:`RFC 2818 <2818>` deprecated using CN to store
   hostnames in May 2000. This RFC required clients to fall back to the
   CN if the certificate had no values in the |san-dns| field.
   :rfc:`RFC 6125 <6125>` removed the requirement in 2011.

   Go 1.15 disables adherence to :rfc:`RFC 2818 <2818>` and uses the
   :rfc:`RFC 6125 <6125>` practice of making CN optional. In practice,
   this change requires you to either add |san-dns| values or enable
   the use of CNs.

   Go 1.17 removes the workaround to use the CN if no SAN exists.

   With the current version of the {+mdbagent+}, you *must* use
   |san-dns|.

   To learn more, see
   `Fraser Tweedale's blog post on this topic <https://frasertweedale.github.io/blog-redhat/posts/2017-07-11-cn-deprecation.html>`__
