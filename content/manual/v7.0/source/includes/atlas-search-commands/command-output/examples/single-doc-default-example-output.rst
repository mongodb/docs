.. code-block:: javascript
   :copyable: false

   [
     {
       id: '6524096020da840844a4c4a7',
       name: 'default',
       status: 'BUILDING',
       queryable: true,
       latestDefinitionVersion: {
         version: 2,
         createdAt: ISODate("2023-10-09T14:51:57.355Z")
       },
       latestDefinition: {
         mappings: { dynamic: true },
         storedSource: { include: [ 'awards.text' ] }
       },
       statusDetail: [
         {
           hostname: 'atlas-n1cm1j-shard-00-02',
           status: 'BUILDING',
           queryable: true,
           mainIndex: {
             status: 'READY',
             queryable: true,
             definitionVersion: {
               version: 0,
               createdAt: ISODate("2023-10-09T14:08:32.000Z")
             },
             definition: { mappings: { dynamic: true, fields: {} } }
           },
           stagedIndex: {
             status: 'PENDING',
             queryable: false,
             definitionVersion: {
               version: 1,
               createdAt: ISODate("2023-10-09T14:51:29.000Z")
             },
             definition: {
               mappings: { dynamic: true, fields: {} },
               storedSource: true
             }
           }
         },
         {
           hostname: 'atlas-n1cm1j-shard-00-01',
           status: 'BUILDING',
           queryable: true,
           mainIndex: {
             status: 'READY',
             queryable: true,
             definitionVersion: {
               version: 0,
               createdAt: ISODate("2023-10-09T14:08:32.000Z")
             },
             definition: { mappings: { dynamic: true, fields: {} } }
           },
           stagedIndex: {
             status: 'PENDING',
             queryable: false,
             definitionVersion: {
               version: 1,
               createdAt: ISODate("2023-10-09T14:51:29.000Z")
             },
             definition: {
               mappings: { dynamic: true, fields: {} },
               storedSource: true
             }
           }
         },
         {
           hostname: 'atlas-n1cm1j-shard-00-00',
           status: 'BUILDING',
           queryable: true,
           mainIndex: {
             status: 'READY',
             queryable: true,
             definitionVersion: {
               version: 0,
               createdAt: ISODate("2023-10-09T14:08:32.000Z")
             },
             definition: { mappings: { dynamic: true, fields: {} } }
           }
         }
       ]
     }
   ]
