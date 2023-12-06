.. setting:: mms.minimumTLSVersion

   *Type*: string

   *Default*: ``TLSv1.2``

   
   Specifies the |tls| version required for clients to connect to |mms|.
   This property affects all clients, such as browsers used to connect
   to the |mms| :guilabel:`Admin` interface and command-line tools, such
   as ``curl``, used to connect to the |rest| |api|.
   
   |onprem| versions between 4.0.9 and 4.0.18 and earlier than 4.2.13 and 4.4.0
     |onprem| supports ``TLSv1.2`` only. If you change this value to
     anything other than ``TLSv1.2``, including a blank value, you can't
     connect to this |mms|.
   
   |onprem| versions 4.0.0 to 4.0.8, 4.0.18 or later, 4.2.13 or later, 4.4.0 or later
     |onprem| supports ``TLSv1.0``, ``TLSv1.1`` and ``TLSv1.2``.
   
   .. note::
   
      TLSv1.2 requires connecting clients to meet the following minimum
      requirements:
   
      * Browser supports |tls| version 1.2
   
      * ``curl`` version 7.34.0+
   
      * OpenSSL version 1.0.1+
   
   To set :setting:`minimum.TLSVersion`, follow the `Modify a Custom
   Setting <opsmgr-config-add-custom>` procedure with the following
   values:
   
   .. list-table::
      :widths: 20 80
   
      * - :guilabel:`Key`
        - ``minimum.TLSVersion``
      * - :guilabel:`Value`
        - ``<tls-versions>``
   
   

