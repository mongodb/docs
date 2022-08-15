.. list-table::
  :header-rows: 1
  :widths: 30 70
  :stub-columns: 1

  * - Field
    - Value

  * - Project
    - Project that contains your app service.

  * - App Service
    - App service that's issuing the user token.

  * - Fetch data using {+atlas-app-services+} (**Optional**)
    - Toggle to enable |charts-short| to fetch user data and rules from 
      an app service.

      If enabled, |charts-short| retrieves data from the service you
      specify in the :guilabel:`App Service Name` field.

      Enabling this option allows you to define rules in {+atlas-app-services+} to 
      control the data that |charts-short| displays for specific 
      collections or users.

      For more information, see :stitch:`Filter Incoming Queries 
      </mongodb/filter-incoming-queries/>` in the {+app-services+} 
      documentation.

  * - App Service Name
    - The name of the service in your app service that |charts-short| 
      uses to retrieve the data for your chart.

      .. example::

         ``mongodb-atlas``
