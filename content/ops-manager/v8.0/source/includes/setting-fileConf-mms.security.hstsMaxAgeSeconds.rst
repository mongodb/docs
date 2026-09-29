.. setting:: mms.security.hstsMaxAgeSeconds

   *Type*: integer

   *Default*: 0 (Can use |http| or |https|.)

   
   How long (in seconds) |mms| limits browser connections to use
   |https|. This value must be a positive integer. A value of ``0``
   means that it can use |http| or |https|.
   
   .. seealso::
   
      To learn how to deploy
      :abbr:`HSTS (HTTP Strict Transport Security)`, see
      `HTTP Strict Transport Security <https://en.wikipedia.org/w/index.php?title=HTTP_Strict_ Transport_Security&oldid=774831831>`_,
      :rfc:`RFC 6797 <6797>` and
      `hstspreload.org <https://hstspreload.org/#deployment-recommendations>`_.
   
   

