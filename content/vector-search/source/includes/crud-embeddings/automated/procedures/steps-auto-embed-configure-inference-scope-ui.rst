.. procedure::
   :style: normal

   .. step:: Log in to `{+service+} <https://cloud.mongodb.com>`__.

   .. step:: Go to the :guilabel:`Search & Vector Search` page for your
      project.

      a. If it's not already displayed, select your desired organization
         from the :icon-mms:`office` :guilabel:`Organizations` menu in the
         navigation bar.

      #. If it's not already displayed, select your desired project from
         the :guilabel:`Projects` menu in the navigation bar.

      #. In the sidebar, click :guilabel:`Search & Vector Search` under
         the :guilabel:`Database` header.

   .. step:: Click the :guilabel:`Auto Embedding` section if it's not
      already expanded.

   .. step:: Click :guilabel:`Configuration` under
      :guilabel:`Auto Embedding`.

      The :guilabel:`Automated Embedding Configuration` page displays the
      current inference scope of the cluster.

   .. step:: Click :guilabel:`Edit`.

      If :guilabel:`Edit` is disabled, either the cluster doesn't support
      scoped inference or your project access doesn't permit changes. Hover
      over the button to view the reason.

   .. step:: From the :guilabel:`Geography` dropdown, select an option:

      - :guilabel:`Any (Agnostic)`: No geography restriction, with no data
        residency guarantee. This is the default.

      - :guilabel:`EU (Europe)`: Inference runs only in Europe. 

        .. note::

           Inference scoped to Europe is in Public Preview. To learn more, 
           see `Preview Features <https://www.mongodb.com/docs/preview-features/>`__.

      - :guilabel:`US (United States)`: Inference runs only in the United
        States.

      The :guilabel:`Cloud Provider` dropdown lists the cloud providers
      where inference can run. :guilabel:`Any (Agnostic)` allows any cloud
      provider.

      .. note::

         Inference scoped to a specific cloud or geography is billed at 1.1x 
         the :guilabel:`Any (Agnostic)` rate. To learn more, see 
         :ref:`auto-embed-scoped-inference-pricing`.

   .. step:: Click :guilabel:`Save`.

      {+service+} applies the change asynchronously. Until the change
      completes, the cluster continues to use its previous inference scope.
