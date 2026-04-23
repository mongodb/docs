While you can use a single |api| key for generating embeddings at
index-time and at query-time, we recommend that you use separate |api| keys 
to avoid query operations from negatively impacting indexing operations.

You can generate |api| keys in the following ways: 

- (**Recommended**) :ref:`Using <voyage-api-keys>` your |service| account,
  which allows you to manage your |voyage| embedding model |api| key from the 
  {+atlas-ui+}. 
  
  To learn more about generating and managing |api| keys including
  :ref:`configuring the rate limits <voyage-rate-limits>` (which is a
  combination of :abbr:`TPM (Tokens Per Minute)` and :abbr:`RPM
  (Requests Per Minute)`) and :ref:`monitoring API key usage
  <voyage-monitor-usage>`, see :ref:`Model API Keys <voyage-manage-api-keys>`. 

- `Voyage AI <https://www.voyageai.com/>`__. 
  
  To learn more about managing the |api| keys created from |voyage|, see
  :voyage-docs:`API Key </api-key-and-installation>`. 

After creating the keys, you must specify the keys you want to use for
automated embedding when configuring ``mongot`` during :ref:`deployment
<install-mdb-community-edition>` with MongoDB Community Edition. {+avs+}
uses the |voyage| |api| key that you provided during deployment of
``mongot`` to automatically generate embeddings for your data at index-
and for your query text at query-time.
