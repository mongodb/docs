.. procedure:: 
   :style: normal 

   .. include:: /includes/nav/steps-project-level.rst

   .. step:: Set the rate limits for the project. 

      a. From the navigation bar, select :guilabel:`Rate Limits`.
      #. In the :guilabel:`Actions` column corresponding to the
         embeddings model for which you want to modify rate limits,
         click :icon-fa5:`pencil-alt`.
      #. Modify the :abbr:`TPM (Tokens Per Minute)` and :abbr:`RPM
         (Requests Per Minute)` values. 

         Project-level rate limits for each model can be any value less
         than or equal to the organization's rate limit. 

         .. example::

            At usage tier 1, rate limits for the ``voyage-4``
            embedding model for a project can be set to ``2000``
            RPM and ``8,000,000`` TPM, or lower.

      #. Click :icon:`check` to apply the rate limit.