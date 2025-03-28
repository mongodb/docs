.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-charts.rst

   .. step:: Select a dashboard.

      From your dashboard page, select the dashboard containing the 
      chart for which you want to enable embeddings.

   .. step:: Select a chart.

      From the dashboard, click :icon-mms:`ellipsis` at the top-right of
      the chart to access its embedding information. Select
      :guilabel:`Embed chart` from the dropdown menu.

   .. include:: /includes/fact-charts-in-embedded-dashboards.rst

   .. step:: Enable external sharing on the data source.

      If you've already enabled external sharing on the data source 
      this chart uses, skip this step. If you haven't yet enabled
      eexternal sharing on the data source, you can do so now. Click the
      :guilabel:`Configure external sharing` link.

   .. step:: Enabled signed authentication.
      
      a. Select the :guilabel:`Verified Signature` tab in the dialog 
         box.

      #. Toggle :guilabel:`Enable signed authentication access` to 
         :guilabel:`On`.

      The |html| code that appears in the modal window shows the 
      required parameters for sharing a chart with 
      authentication enabled. To use this code, you must continue with 
      the subsequent steps to enable authenticated access.

   .. include:: /includes/nav/steps-embedding.rst

   .. include:: /includes/nav/steps-auth-settings.rst

   .. step:: Generate an embedding key.

      Click the :guilabel:`Generate New Key` button to create a new
      embedding key. Store the key in a safe place.

      .. warning::

         If you generate a new key, any previous keys become invalid.
         Ensure that all the existing shared charts that use the old key
         are updated to use the new key.

   .. step:: Create the server-side code necessary for a verified signature.

      Generating a verified signature to accompany data requests from 
      shared charts with authentication enabled requires server-side 
      code. The verified signature creates a payload by generating a
      :wikipedia:`HMAC <HMAC>` from your embedding key, a timestamp, 
      and identifying data from your chart. The verified signature is 
      valid for a limited time period specified in your server-side 
      code.

      Code examples demonstrating how to generate a verified
      signature are available for the following languages and platforms:

      - :github:`Node.js 
        </mongodb/charts-embedding-examples/tree/master/node>`
      - :github:`C# 
        </mongodb/charts-embedding-examples/tree/master/c-sharp>`
      - :github:`Java 
        </mongodb/charts-embedding-examples/tree/master/java>`
      - :github:`Python 
        </mongodb/charts-embedding-examples/tree/master/python>`
      - :github:`MongoDB Stitch 
        </mongodb/charts-embedding-examples/tree/master/stitch>`
 