Returns the following JSON-formatted document that describes 
your ``mongosh`` build and driver dependencies:

.. code-block:: javascript
   :copyable: false

   {
     version: '1.10.1',
     distributionKind: 'packaged',
     buildArch: 'x64',
     buildPlatform: 'linux',
     buildTarget: 'unknown',
     buildTime: '2023-06-21T09:49:37.225Z',
     gitVersion: '05ad91b4dd40382a13f27abe1ae8c3f9f52a38f7',
     nodeVersion: 'v16.20.1',
     opensslVersion: '3.1.1',
     sharedOpenssl: true,
     runtimeArch: 'x64',
     runtimePlatform: 'darwin',
     deps: {
        nodeDriverVersion: '5.6.0',
        libmongocryptVersion: undefined,
        libmongocryptNodeBindingsVersion: undefined
      }
   }