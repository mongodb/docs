.. procedure::
   :style: normal

   .. step:: Download the MongoDB installation file.
      
      To download the ``1.26.0`` release using Darwin with an ARM64 architecture, run the following command:
   
      .. io-code-block::
         :copyable: true

         .. input::
         
            wget https://github.com/mongodb/mongodb-enterprise-kubernetes/releases/download/1.26.0/kubectl-mongodb_1.26.0_darwin_arm64.tar.gz
         
         .. output::
         
            Saving : « kubectl-mongodb_1.26.0_darwin_arm64.tar.gz »

   .. step:: Unzip the MongoDB installation file.

      .. io-code-block::
         :copyable: true

         .. input::
         
            tar -xvzf kubectl-mongodb_1.26.0_darwin_arm64.tar.gz

         .. output::
         
            x kubectl-mongodb.sig
            x kubectl-mongodb     
   
   .. step:: Verify the MongoDB installation file.
      
      Run the following command:

      .. io-code-block::
         :copyable: true

         .. input::
         
            cosign verify-blob --key mongodb-enterprise-kubernetes-operator.pem --signature kubectl-mongodb.sig kubectl-mongodb

         .. output::
         
            Verified OK
