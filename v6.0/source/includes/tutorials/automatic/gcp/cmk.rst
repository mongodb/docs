.. _gcp-create-master-key:

.. procedure::
   :style: connected

   .. step:: Create a new {+cmk-long+}

      Create a key ring and a symmetric key by following the
      `Create a key <https://cloud.google.com/kms/docs/creating-keys>`__
      guide from Google's official documentation.

      This key is your {+cmk-long+} ({+cmk-abbr+}).

      Record the following details of your {+cmk-abbr+} for use in a future
      step of this tutorial.

      .. list-table::
         :header-rows: 1
         :stub-columns: 1
         :widths: 30 15 45

         * - Field
           - Required
           - Description

         * - key_name
           - Yes
           - Identifier for the {+cmk-abbr+}.

         * - key_ring
           - Yes
           - Identifier for the group of keys your key belongs to.

         * - key_version
           - No
           - The version of the named key.

         * - location
           - Yes
           - Region specified for your key.

         * - endpoint
           - No
           - The host and optional port of the {+gcp-kms-abbr+}.
             The default value is ``cloudkms.googleapis.com``.
