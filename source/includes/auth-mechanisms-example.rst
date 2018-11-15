.. tabs-auth::

   tabs:
     - id: uidpwd
       content: |

         .. example::

            To authenticate as user ``grace`` using the ``admin``
            database and the Challenge and
            Response (``SCRAM-SHA-1``) authentication mechanism, write 
            the username in this format:

            .. code-block:: none

               grace?source=admin

     - id: ldap
       content: |

         .. example::

            To authenticate as user ``grace`` with the |ldap| 
            (``PLAIN``) authentication mechanism, write the 
            username in this format:

            .. code-block:: none

               grace?mechanism=PLAIN&source=$external

     - id: kerberos
       content: |

         .. example::

            To authenticate as user ``grace`` on the ``EXAMPLE.COM``
            `Kerberos realm <https://web.mit.edu/kerberos/krb5-latest/doc/admin/realm_config.html>`__
            with the Kerberos authentication mechanism, write the 
            username in this format:

            .. code-block:: none

               grace@EXAMPLE.COM?mechanism=GSSAPI&source=$external

         For more information about Kerberos configuration, see
         :doc:`/tutorial/kerberos`.
