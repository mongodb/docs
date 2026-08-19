For example, assume the ``certificateKeyFilePassword`` is
"superSecret123". To retrieve this password by using a REST request
or exec service call, you must generate a digest key and use it to
calculate the digest of your password.

Run the following code in your terminal to generate a 32-byte digest
key:

.. io-code-block::
   :copyable: false

   .. input::
      :language: bash

      openssl rand -hex 32

   .. output::
      :language: none
      :visible: false

      f38d0d5adfcf1a0575f9fa9051c70a2f88b1bb7562513c9efd7686e9c21ad304

After you generate a digest key, you can use it to calculate the
digest of your password:

.. io-code-block::
   :copyable: false

   .. input::
      :language: bash

      echo -ne "superSecret123" | openssl dgst -sha256 -mac hmac -macopt hexkey:f38d0d5adfcf1a0575f9fa9051c70a2f88b1bb7562513c9efd7686e9c21ad304

   .. output::
      :language: none
      :visible: false

      8ca2f57caef0bb23b76e45b3fd1e899b7e306b8ba93f406a56d8969846ca9122
