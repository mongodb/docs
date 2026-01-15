If you want to generate embeddings for text data in your collection, you
can use the ``autoEmbed`` type to index a field with text data. You
must have a |voyage| |api| key to generate the embeddings.

API Keys 
~~~~~~~~

To automatically generate embeddings for your data, {+avs+} uses the
|voyage| |api| key that you provided during deployment of ``mongot``.

You can generate |api| keys :ref:`using <voyage-api-keys>` your
|service| account, which allows you to manage your |api| key from the
{+atlas-ui+}. To learn more about generating and managing |api| keys
including :ref:`configuring the rate limits <voyage-rate-limits>`
(which is a combination of :abbr:`TPM (Tokens Per Minute)` and
:abbr:`RPM (Requests Per Minute)`) and :ref:`monitoring API key usage
<voyage-monitor-usage>`, see :ref:`Model API Keys <voyage-manage-api-keys>`.

Alternatively, you can generate the |api| key directly from `Voyage AI
<https://www.voyageai.com/>`__. If you generate |voyage| |api| key 
directly from |voyage|, to learn more about managing the |api| keys, see
:voyage-docs:`API Keys </api-key-and-installation>`.

Billing
~~~~~~~

|voyage| model pricing is usage-based, with charges billed to the
account linked to the |api| key used for access. Pricing is based on the
number of tokens in your text field and queries.

If you generated the |api| key using your |service| account, you can
monitor |api| key usage from the {+atlas-ui+}. To learn more, see
:ref:`Billing <voyage-billing>`. 

If you generated |voyage| |api| key directly from |voyage|, see
:voyage-docs:`Pricing </pricing>` to learn more about the
charge for requests to the |voyage| embedding endpoint.

Querying 
~~~~~~~~

You must use the :pipeline:`$vectorSearch` stage to query fields indexed
as the ``autoEmbed`` type. 

.. note:: 

   You can't use the :pipeline:`$search` :ref:`vectorSearch
   <fts-vectorSearch-ref>` or the deprecated :ref:`knnBeta <knn-beta-ref>`
   operator to query fields indexed using the ``vectorSearch`` type
   index definition.
