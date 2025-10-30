The :oas-bump-atlas-op:`Create One Connection <creategroupstreamconnection>`
API endpoint requires digest authorization when creating an |s3| connection. To
support this, you must create an API Key.

.. procedure::
   :style: normal

   .. step:: In the :guilabel:`Project Access Manager`, select the
     :guilabel:`Applications` tab, then click :guilabel:`API Keys`.

   .. step:: Click :guilabel:`Create API Key`. Provide a short description
     for the key.

   .. step:: In the :guilabel:`Project Permissions` dropdown menu,
     select both the :guilabel:`Project Stream Processing Owner` and
     :guilabel:`Project Owner` roles. Click :guilabel:`Next`.

   .. step:: Save both the public and private keys for later in this procedure.
