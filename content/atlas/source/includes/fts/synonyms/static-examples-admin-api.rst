Use Static Mappings
-------------------

.. include:: /includes/fts/synonyms/static-intro.rst

You can use the {+atlas-admin-api+} to configure the index.
Replace the following values in the sample ``curl`` command:

- Replace {``ACCESS-TOKEN``} with your Service Account access token.
  To learn how to generate an access token, see :ref:`example-api-request`. 
- Replace {``groupId``} with the project ID of the project where 
  you want to create the |fts| index.
- Replace {``clusterName``} with the name of the cluster where 
  you want to create the |fts| index.

.. literalinclude:: /includes/fts/synonyms/create-static-index-admin-api.sh
    :language: shell
    :copyable: true
    :linenos: