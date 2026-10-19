.. procedure::
   :style: normal

   .. step:: Download the MongoDB kubectl plugin file.
      
      To download the ``1.0.0`` release using Darwin with an ARM64 architecture, run the following command:
   
      .. io-code-block::
         :copyable: true

         .. input::
         
            wget https://github.com/mongodb/mongodb-kubernetes/releases/download/1.0.0/public/kubectl-mongodb_1.0.0_darwin_arm64.tar.gz
         
         .. output::
         
            Saving : « kubectl-mongodb_1.0.0_darwin_arm64.tar.gz »

   .. step:: Unzip the MongoDB kubectl plugin file.

      .. io-code-block::
         :copyable: true

         .. input::
         
            tar -xvzf kubectl-mongodb_1.0.0_darwin_arm64.tar.gz

         .. output::
         
            x kubectl-mongodb.bundle
            x kubectl-mongodb     
   
   .. step:: Verify the MongoDB kubectl plugin file.
      
      Run the following command:

      .. io-code-block::
         :copyable: true

         .. input::
         
            cosign verify-blob --key mongodb-enterprise-kubernetes-operator.pem --insecure-ignore-tlog --bundle kubectl-mongodb.bundle kubectl-mongodb

         .. output::
         
            Verified OK
