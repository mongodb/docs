|charts| uses a number of keys and tokens to secure your
deployment and encrypt sensitive data stored in the |charts-short|
metadata database. When you first deploy |charts-short|, new random
keys are automatically generated and saved to a Docker Volume which
persists the keys across container deployments.

.. important::

   If you want to redeploy |charts-short| or move |charts-short| to a
   new server, you will need to use the original keys in new
   deployments. If you deploy a new instance of |charts-short| and
   point it to an existing |charts-short| metadata database used by a
   previous deployment, the encryption keys will not match and the
   new instance of |charts-short| will not be able to decrypt the
   metadata.