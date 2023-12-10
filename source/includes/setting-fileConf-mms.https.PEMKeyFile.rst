.. setting:: mms.https.PEMKeyFile

   *Type*: string

   
   Absolute path to the PEM file that contains the |application|'s
   valid certificate and private key. The PEM file is required if the
   |application| uses |https| to encrypt connections between the
   |application|, the agents, and the web interface.
   
   The default port for |https| access to the |application| is
   ``8443``, as set in ``<install_dir>/conf/mms.conf`` file. If you
   change this default, you must also change the port specified in the
   :setting:`mms.centralUrl` setting.
   
   
   Corresponds to :setting:`HTTPS PEM Key File`.
   

