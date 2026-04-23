The wizard steps you through the installation of MongoDB and MongoDB
Compass.

a. :guilabel:`Choose Setup Type` You can choose either the
   :guilabel:`Complete` (recommended for most users) or
   :guilabel:`Custom` setup type. The :guilabel:`Complete` setup
   option installs MongoDB and the MongoDB tools to the default
   location. The :guilabel:`Custom` setup option allows you to
   specify which executables are installed and where.

#. :guilabel:`Service Configuration`
   You can set up MongoDB as a Windows service during the
   install or just install the binaries.

   .. tabs::

      .. tab:: MongoDB Service
         :tabid: service
         
         You can configure and start MongoDB as a Windows
         service during the install, and the MongoDB service is
         started upon successful installation.

         - Select :guilabel:`Install MongoD as a Service`.

         - Select one of these options:

           - :guilabel:`Run the service as Network Service user` (Default)

             This is a Windows user account that is built-in to
             Windows.

           - :guilabel:`Run the service as a local or domain user`

             - For an existing local user account, specify a
               period (``.``) for the :guilabel:`Account
               Domain` and specify the :guilabel:`Account Name`
               and the :guilabel:`Account Password` for the
               user.

             - For an existing domain user, specify the
               :guilabel:`Account Domain`, :guilabel:`Account
               Name` and :guilabel:`Account Password` for that
               user.

           - :guilabel:`Service Name`. Specify the service
             name. Default name is ``MongoDB``. If you already
             have a service with the specified name, you must
             choose another name.

           - :guilabel:`Data Directory`. Specify the data
             directory, which corresponds to the
             :option:`--dbpath <mongod --dbpath>`. If the
             directory does not exist, the installer will create
             the directory and sets the directory access to the
             service user.
 
           - :guilabel:`Log Directory`. Specify the Log
             directory, which corresponds to the
             :option:`--logpath <mongod --logpath>`. If the
             directory does not exist, the installer will create
             the directory and sets the directory access to the
             service user.

      .. tab:: MongoDB
         :tabid: mongodb

         If you choose not to configure MongoDB as a Windows
         service, uncheck the :guilabel:`Install MongoD as a
         Service`.

#. :guilabel:`Install MongoDB Compass` *Optional*. To have the
   wizard install `MongoDB Compass
   <https:///www.mongodb.com/products/compass>`__, select
   :guilabel:`Install MongoDB Compass` (Default).

#. When ready, click :guilabel:`Install`.
