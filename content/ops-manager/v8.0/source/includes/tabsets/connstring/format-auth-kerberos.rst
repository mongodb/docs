- Prepend the hostname with the Kerberos user principal.

  Write Kerberos |upn|\s as **<username>@<KERBEROS REALM>**. Escape
  the |upn| using the |url| encoded representation. A Kerberos user
  principal of **username@REALM.EXAMPLE.COM** would therefore become
  **username%40REALM.EXAMPLE.COM**.

- Append the authentication mechanism to the port in this format:
  **authMechanism=GSSAPI**.
