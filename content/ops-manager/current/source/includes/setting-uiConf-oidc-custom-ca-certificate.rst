.. setting:: Custom CA Certificate (PEM)

   *Type*: string

   |pem|-encoded certificate authority certificate or certificates
   to trust when |mms| connects to your |idp|. Use this setting when
   your |idp| uses a self-signed or private certificate authority.
   You can concatenate multiple certificates.

   Corresponds to :setting:`mms.oidc.customCaCertificate`.
