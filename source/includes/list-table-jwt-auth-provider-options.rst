.. list-table::
  :header-rows: 1
  :widths: 30 70
  :stub-columns: 1

  * - Field
    - Value

  * - Signing Algorithm
    - Encryption algorithm with which the |jwt| signature is encoded. 

      Must be one of:

      - `HS256 <https://tools.ietf.org/html/rfc7518#section-3.2>`__
      - `RS256 <https://tools.ietf.org/html/rfc7518#section-3.3>`__ 

  * - Signing Key
    - Secret or key used to validate the |jwt| signature. If tokens 
      are not signed, |charts-short| considers them invalid. If you 
      provide an incorrect key, |charts-short| is unable to verify token 
      signatures and considers them invalid.

      The value you must provide depends on the 
      :guilabel:`Signing Algorithm`:

      - ``HS256``: enter the secret key used to sign the |jwt|.

      - ``RS256``: enter the public key of the key pair used to sign 
        the |jwt| The public key must be in `PEM format 
        <https://tools.ietf.org/html/rfc7468#section-5>`__, as shown in
        the following example:

        .. code-block:: none
           :copyable: false

            -----BEGIN CERTIFICATE-----
            MIIDfjCCAmagAwIBAgIBBzANBgkqhkiG9w0BAQUFADB0MRcwFQYDVQQDEw5LZXJu
            ZWwgVGVzdCBDQTEPMA0GA1UECxMGS2VybmVsMRAwDgYDVQQKEwdNb25nb0RCMRYw
            FAYDVQQHEw1OZXcgWW9yayBDaXR5MREwDwYDVQQIEwhOZXcgWW9yazELMAkGA1UE
            BhMCVVMwHhcNMTQwNzE3MTYwMDAwWhcNMjAwNzE3MTYwMDAwWjBsMQ8wDQYDVQQD
            EwZzZXJ2ZXIxDzANBgNVBAsTBktlcm5lbDEQMA4GA1UEChMHTW9uZ29EQjEWMBQG
            A1UEBxMNTmV3IFlvcmsgQ2l0eTERMA8GA1UECBMITmV3IFlvcmsxCzAJBgNVBAYT
            AlVTMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAp76KJeDczBqjSPJj
            5f8DHdtrWpQDK9AWNDlslWpi6+pL8hMqwbX0D7hC2r3kAgccMyFoNIudPqIXfXVd
            1LOh6vyY+jveRvqjKW/UZVzZeiL4Gy4bhke6R8JRC3O5aMKIAbaiQUAI1Nd8LxIt
            LGvH+ia/DFza1whgB8ym/uzVQB6igOifJ1qHWJbTtIhDKaW8gvjOhv5R3jzjfLEb
            R9r5Q0ZyE0lrO27kTkqgBnHKPmu54GSzU/r0HM3B+Sc/6UN+xNhNbuR+LZ+EvJHm
            r4de8jhW8wivmjTIvte33jlLibQ5nYIHrlpDLEwlzvDGaIio+OfWcgs2WuPk98MU
            tht0IQIDAQABoyMwITAfBgNVHREEGDAWgglsb2NhbGhvc3SCCTEyNy4wLjAuMTAN
            BgkqhkiG9w0BAQUFAAOCAQEANoYxvVFsIol09BQA0fwryAye/Z4dYItvKhmwB9VS
            t99DsmJcyx0P5meB3Ed8SnwkD0NGCm5TkUY/YLacPP9uJ4SkbPkNZ1fRISyShCCn
            SGgQUJWHbCbcIEj+vssFb91c5RFJbvnenDkQokRvD2VJWspwioeLzuwtARUoMH3Y
            qg0k0Mn7Bx1bW1Y6xQJHeVlnZtzxfeueoFO55ZRkZ0ceAD/q7q1ohTXi0vMydYgu
            1CB6VkDuibGlv56NdjbttPJm2iQoPaez8tZGpBo76N/Z1ydan0ow2pVjDXVOR84Y
            2HSZgbHOGBiycNw2W3vfw7uK0OmiPRTFpJCmewDjYwZ/6w==
            -----END CERTIFICATE-----

  * - Audience (**Optional**)
    - `Audience claim 
      <https://tools.ietf.org/html/rfc7519#section-4.1.3>`__ that must 
      be present in the |jwt| for |charts-short| to consider it valid.
