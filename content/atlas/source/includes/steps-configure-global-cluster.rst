.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-db-deployments-page.rst
      
   .. step:: Open the :guilabel:`Create New Cluster` Dialog.

      - If you already have one or more {+database-deployments+}, click
        :guilabel:`Create` to display the 
        :guilabel:`Create New Cluster` dialog box.
      - If this is your first {+database-deployment+}:
        
        a. Click :guilabel:`Build a Database`.
        #. Click :guilabel:`advanced configuration options` at the top of
           the screen to display the
           :guilabel:`Create New Cluster` dialog box.
      
   .. step:: Enable Global Writes for your {+cluster+}.

      a. In the :guilabel:`Create New {+Cluster+}` dialog box, select
         the :guilabel:`Dedicated` {+cluster+} type. For more information,
         see :ref:`create-new-cluster`.
         
      #. Click :guilabel:`Global {+Cluster+} Configuration` to expand the
         section.
      
      #. Toggle :guilabel:`Enable Global Writes (M30 and Up)` to
         :guilabel:`On` to display the |global-write-cluster| configuration.
      
   .. step:: Select your sharding configuration.
      
      By default, global {+clusters+} enable :guilabel:`Atlas-Managed Sharding`
      to automatically configure the :term:`shard keys <shard key>`
      and :term:`zones <zone>` for the {+cluster+}.
      For each shard, |service| creates a ``location`` field in the shard key  
      associated with the corresponding zone so that |service| 
      can distribute data to shards based on geographic location. 
      This option is recommended for most workloads.
      
      If you're an advanced user and the default configuration is too restrictive 
      for your workload, select :guilabel:`Self-Managed Sharding`.
      If you select this option, you must manually configure the sharding
      strategy by using {+mongosh+} or a supported :driver:`MongoDB Driver </>`. 
      To learn more about zone sharding, see :manual:`Zones 
      </core/zone-sharding/>`. To learn how to add shards to a zone,
      see :manual:`Manage Zones </tutorial/manage-shard-zone/>`.
      
      .. important:: 
      
         You can't change between :guilabel:`Atlas-Managed Sharding` 
         and :guilabel:`Self-Managed Sharding` after you deploy the {+cluster+}.
         
      
   .. step:: Select your preferred cloud provider.
      
      .. note::
      
        Each cloud provider has a selection of global regions to which
        |service| can deploy a zone. The choice of cloud provider may
        support or constrict your ability to deploy a zone to specific
        geographic locations. The configuration options available and
        the cost for running the {+cluster+} may also vary depending on
        cloud provider selection.
      
   .. step:: Configure your |global-write-cluster| Zones.
      
      |service| provides three options for configuring your
      |global-write-cluster| zones:
      
      - Configure |global-write| Zones Using a Template
      
      - Configure a |global-write| Single Region Zone
      
      - Configure a |global-write| Multi Region Zone
      
      Select the appropriate tab based on how you would like to configure
      your |global-write-cluster| zones.
      
      .. tabs::
      
         .. tab:: Use a Template
            :tabid: zone-template
      
            |service| provides two templates for configuring |global-write|
            zones for the {+cluster+}, each with a description of the purpose
            of its underlying configuration. Click on a template to view
            the Zone Map for that template. The Zone Map provides a visual
            description of the {+cluster+} zone configuration, including
            estimates of geographic latency and coverage.
      
            Click :guilabel:`Zone configuration summary` below the zone map
            to view a summary of each zone in the |global-write-cluster|.
            |service| provides the following validations for each zone:
      
            .. list-table::
                :header-rows: 1
                :widths: 40 60
      
                * - Validation
                  - Guidance
      
                * - :guilabel:`Low latency reads and writes in <geography>`
      
                  - Indicates the geographic locale for which the zone
                    supports low latency reads and writes. The exact
                    geographic locale specified depends on the preferred
                    :guilabel:`Region` for that zone. You can modify the
                    zone's preferred region in the :guilabel:`Zone
                    Configuration` section.
      
                * - :guilabel:`Local reads in all other zones`
      
                  - Indicates whether data in this zone is replicated to
                    every other zone for local secondary reads by clients
                    in those zones.
      
                    Click the :guilabel:`Configure Local Reads in All
                    Zones` button in the :guilabel:`Zone configuration
                    summary` to automatically configure every zone in the
                    {+cluster+} for local reads.
      
                * - :guilabel:`(Not) Available during partial region outage`
      
                  - Indicates whether the zone supports high availability,
                    such that a majority of electable nodes remain healthy
                    and reachable in the event of a partial region outage.
                    :guilabel:`Regions` marked as :guilabel:`Recommended`
                    in the {+atlas-ui+} support high availability during
                    partial regional outages.
      
                    To learn more, see the following pages:
      
                    - :ref:`amazon-aws-availability-zones`.
                    - :ref:`google-gcp-availability-zones`.
                    - :ref:`microsoft-azure-availability-zones`.
      
                * - :guilabel:`(Not) Available during full region outage`
      
                  - Indicates whether the zone supports high availability,
                    such that a majority of electable nodes remain healthy
                    and reachable in the event of a complete regional
                    outage.
      
            By default, each template deploys a series of single-region
            zones and builds a map of country and subdivision locations
            geographically near each zone. MongoDB uses this location-zone
            map to route read and write operations which contain
            :ref:`location data <global-writes-collections>` to the shard
            or shards in the corresponding zone.
      
            If you enabled :guilabel:`Atlas-Managed Sharding`,
            click :guilabel:`Configure Location Mappings` in the Zone
            Map to view the list of location-zone mappings. To customize
            the location-zone mapping, click the :guilabel:`Zone` dropdown
            for a given :guilabel:`Location Name` and select a new zone.
            Click the :guilabel:`Reset` button to reset a custom mapping
            for any given location. Click the :guilabel:`Reset All Zone
            mappings` button to reset all custom mappings for the {+cluster+}.
      
            You can make additional configuration changes to each zone
            after selecting a zone template. For instructions, see the
            :guilabel:`Single Region Zone` tab.
      
            You can also create Multi-region zones. For instructions, see
            the :guilabel:`Multi-Region Zone` tab. Clicking
            :guilabel:`Configure Local Reads in All Zones` converts all
            zones to multi-region.
      
            Click :guilabel:`View Zone Templates` in the Zone Map to return
            to the template selection.
      
         .. tab:: Single Region Zone
            :tabid: single-region
      
            The :guilabel:`Zone Configuration` section allows you to
            configure each zone in your {+cluster+}. |service| displays a
            drop-down box directly above the :guilabel:`Zone Configuration`
            that indicates the currently selected zone. Click the
            :guilabel:`+ Add a Zone` button to add additional zones to the
            |global-write-cluster|, up to a maximum of nine (9) zones. If
            you require more than nine zones, contact `Atlas support
            <https://cloud.mongodb.com/support>`_.
      
            The Zone Map updates as you modify each zone. If the Zone Map
            currently displays the template selection menu, click
            :guilabel:`Configure Zones Myself` to view the Zone map.
      
            In the :guilabel:`Zone Configuration` section, 
            click the :guilabel:`Select the preferred region for your zone`
            drop-down box and select a region as the :guilabel:`Highest
            Priority` region for each shard assigned to the zone. |service|
            builds a map of countries and subdivisions that are
            geographically near the selected region. MongoDB uses this
            location-zone map to route read and write operations which
            contain :ref:`location data <global-writes-collections>` to the
            shard or shards in the corresponding zone.
      
            If you enabled :guilabel:`Atlas-Managed Sharding`,
            click :guilabel:`Configure Location Mappings` in the Zone Map
            to view the list of location-zone mappings. To customize the
            location-zone mapping, click the :guilabel:`Zone` dropdown for
            a given :guilabel:`Location Name` and select a new zone. Click
            the :guilabel:`Reset` button to reset a custom mapping for any
            given location. Click the :guilabel:`Reset All Zone mappings`
            button to reset all custom mappings for the {+cluster+}.
      
            For each shard in the zone, |service| distributes the shard
            nodes with respect to the :guilabel:`Zone Configuration`. You
            can add additional shards to the zone by clicking
            :guilabel:`Additional Options` in the :guilabel:`Zone
            Configuration` section and selecting the total number of shards
            in the zone from the drop-down box. By default, |service|
            deploys one shard per zone. |service| recommends creating
            additional zones to support heavy write load in a geographic
            region instead of adding multiple shards to a single zone.
            |service| supports no more than 70 shards per
            |global-write-cluster|.
      
            .. important::
      
               Selecting a :ref:`zone template
               <global-writes-zones>` resets any
               configuration changes made in the :guilabel:`Zone
               Configuration` section to the default for the selected
               template.
      
         .. tab:: Multi-Region Zone
            :tabid: multi-region
      
            The :guilabel:`Zone Configuration` section allows you to
            configure each zone in your {+cluster+}. |service| displays a
            drop-down box directly above the :guilabel:`Zone Configuration`
            that indicates the currently selected zone. Click the
            :guilabel:`+ Add a Zone` button to add additional zones to the
            |global-write-cluster|, up to a maximum of nine (9) zones. If
            you require more than nine zones, contact `Atlas support
            <https://cloud.mongodb.com/support>`_.
      
            The Zone Map updates as you modify each zone. If the Zone Map
            currently displays the template selection menu, click
            :guilabel:`Configure Zones Myself` to view the Zone map.
      
            Click the
            :guilabel:`Select Multi-Region, Workload Isolation and Replication Options`
            button to display the multi-region configuration controls.
            Zones for which you toggled the
            :guilabel:`Configure Local Reads in All Zones` in the
            :guilabel:`Zone configuration summary` display the multi-region
            zone controls by default.
      
            :guilabel:`Electable nodes for high availability`
            Configure the :guilabel:`Highest Priority` and
            :guilabel:`Electable` nodes in the zone.
      
            .. seealso::
      
               :ref:`global-writes-zones`.
      
            .. include:: /includes/cluster-settings/multicloud/electable-nodes-high-avail.rst
      
            Click :guilabel:`Add a region` to add a new row for region
            selection and select the region from the dropdown. Specify
            the desired number of :guilabel:`Nodes` for the region. The
            total number of electable nodes across all regions in the
            zone must be 3, 5, or 7.
      
            |service| builds a map of countries and subdivisions
            geographically near the selected region for the
            :guilabel:`Highest Priority` node. MongoDB uses this
            location-zone map to route read and write operations which
            contain :ref:`location data <global-writes-collections>` to
            the shard or shards in the corresponding zone.
      
            If you enabled :guilabel:`Atlas-Managed Sharding`,
            click :guilabel:`Configure Location Mappings` in the Zone
            Map to view the list of location-zone mappings. To customize
            the location-zone mapping, click the :guilabel:`Zone`
            dropdown for a given :guilabel:`Location Name` and select a
            new zone. Click the :guilabel:`Reset` button to reset a
            custom mapping for any given location. Click the
            :guilabel:`Reset All Zone mappings` button to reset all
            custom mappings for the {+cluster+}.
      
            :guilabel:`Read-only nodes for optimal local reads`
            Configure the :guilabel:`Read-only` nodes in the zone. Each
            row represents one :guilabel:`Region` where |service| deploys
            the configured :guilabel:`Number of Nodes` of the
            :guilabel:`Read-only` :guilabel:`Node Type`.
      
            Click :guilabel:`Add a region` to add additional
            :guilabel:`Read-only` rows. Consider
            adding :guilabel:`Read-only` nodes in each region where you
            want to facilitate local secondary read operations.
      
            :guilabel:`Analytics nodes for workload isolation`
            
            .. include:: /includes/cluster-settings/multicloud/create-cluster-analytics-nodes.rst
      
            For each shard in the zone, |service| distributes the shard
            nodes with respect to the :guilabel:`Zone Configuration`. You
            can add additional shards to the zone by clicking
            :guilabel:`Additional Options` in the :guilabel:`Zone
            Configuration` section and selecting the total number of shards
            in the zone from the drop-down box. By default, |service|
            deploys one shard per zone. |service| recommends creating
            additional zones to support heavy write load in a geographic
            region instead of adding multiple shards to a single zone.
            |service| supports no more than 70 shards per
            |global-write-cluster|.
      
            .. important::
      
                Selecting a
                :ref:`zone template <global-writes-zones>`
                resets any configuration changes made in the
                :guilabel:`Zone Configuration` section to the default for the
                selected template.
         
            .. note:: Removing Zones from an Existing Global {+Cluster+}
      
               If you are using the :manual:`standard connection string format
               </reference/connection-string#connections-standard-connection-string-format>`
               rather than the :abbr:`DNS (Domain Name Service)` seedlist format,
               removing an entire zone from an existing global cluster may result
               in a new connection string. 

               To verify the correct connection string after deploying the changes:
               
               a. .. include:: /includes/nav/roman-db-deployments-page.rst
               #. Verify the connection string.

                  Click :guilabel:`Connect`.
      
   .. step:: Select the :guilabel:`{+Cluster+} Tier`.
      
      To use |global-write-clusters|, you must select a {+cluster+} tier
      that is ``M30`` or larger.
      
      The selected tier dictates the memory, storage, vCPUs, and |iops|
      specification for each data-bearing server in the
      {+cluster+}.
      
      For more information on how to select an appropriate {+cluster+} tier and
      storage settings for your workload, see
      :ref:`create-cluster-instance` and :ref:`create-cluster-storage`.
      
   .. step:: Select any :guilabel:`Additional Settings`.
      
      From the :guilabel:`Additional Settings` section
      for |global-write-clusters|, you can:
      
      - :ref:`create-cluster-version`
      - :ref:`create-cluster-backups`
      - :ref:`create-cluster-enable-bi`
      - :ref:`create-cluster-enable-encryption`
      - :ref:`create-cluster-more-configuration-options`
      
   .. step:: Specify the :guilabel:`{+Cluster+} Name`.
      
      This is the {+cluster+} name as it appears in |service|. You can't
      change the {+cluster+} name once |service| deploys the {+cluster+}.
      
      {+Cluster+} names can't exceed 64 characters in length.
      
      .. include:: /includes/admonitions/importants/cluster-naming-limitations.rst
      
   .. step:: Proceed to checkout.
      Click :guilabel:`Create Cluster` below the form and complete the 
      billing information only if it doesn't already exist. If your
      organization already has the billing information, |service| deploys
      your cluster.  
      
   .. step:: Update your :guilabel:`Billing Address` details as needed.
      
      .. list-table::
         :widths: 20 10 70
         :header-rows: 1
         :stub-columns: 1
      
         * - Field
           - Necessity
           - Action
      
         * - Billing Email Address
           - Optional
           - Type the email address to which |service| should send
             :ref:`billing alerts <billing-alerts>`. 
      
             By default, |service| sends billing alerts to the Organization Owners
             and Billing Admins.
             
             - If you leave the :guilabel:`Billing Email Address` blank, 
               |service| sends billing alerts to the Organization Owners and Billing Admins.
             - If you specify a billing email address and uncheck :guilabel:`Only
               send invoice emails to the Billing Email
               Address`, |service| sends billing alerts to the billing
               email address, Organization Owners, and Billing Admins.
             - If you specify a billing email address and check the box for :guilabel:`Only
               send invoice emails to the Billing Email
               Address`, |service| send billing alerts to the billing email address only.
      
         * - Company Name
           - Optional
           - Type the name of the company for your billing address.
      
         * - Country
           - Required
           - Select the country for your billing address. You can also
             start typing the name of the country and then select it from
             the filtered list of countries.
      
         * - Street Address
           - Required
           - Type the street address for your billing address.
      
         * - Apt/Suite/Floor
           - Optional
           - Type an the apartment, suite, or floor for your
             billing address.
      
         * - City
           - Required
           - Type the name of the city for your billing address.
      
         * - State/Province/Region
           - Required
           - Type or select the political subdivision in which your billing
             address exists. The label and field change depending on what
             you selected as your **Country**:
      
             - If you select **United States** as your **Country**, this
               label changes to **State**. The field changes to a dropdown
               menu of U.S. states. You can also start typing the name of
               the state and then select it from the filtered list of
               states.
      
             - If you select **Canada** as your **Country**, this label
               changes to **Province**. The field changes to a dropdown
               menu of Canadian provinces. You can also start typing the
               name of the province and then select it from the filtered
               list of provinces.
      
             - If you select any other country as your **Country**, this
               label changes to **State/Province/Region**. The field
               changes to a text box. Type the name of your province,
               state, or region in this box.
      
         * - ZIP or Postal Code
           - Required
           - Type the ZIP (U.S.) or Postal Code (other countries) for your
             billing address.
      
         * - VAT Number
           - Conditional
           - |service| displays the :guilabel:`VAT ID` field if you
             select a country other than the United States.
      
             To learn more about VAT, see
             :ref:`VAT ID <vat-id-number>`.
      
             .. include:: /includes/vat-clarification.rst
      
   .. step:: Update your :guilabel:`Payment Method` details as needed.
      
      a. Click the radio button for :guilabel:`Credit Card` or
         :guilabel:`Paypal`.
      
         - If you selected :guilabel:`Credit Card`, type values for the
           following fields:
      
           .. list-table::
              :widths: 20 10 70
              :header-rows: 1
              :stub-columns: 1
      
              * - Field
                - Necessity
                - Action
      
              * - Name on Card
                - Required
                - Type the name that appears on your credit card.
      
              * - Card Number
                - Required
                - Type the 16-digit number that appears on your
                  credit card. American Express uses a 15-digit number.
      
              * - Expiration Date
                - Required
                - Type the expiration date for your credit card in the
                  two-digit month and two-digit year format.
      
              * - |cvc|
                - Required
                - Type the three-digit number on the back of your credit
                  card. American Express uses a 4-digit number found on
                  the front of the credit card.
      
         - If you selected :guilabel:`PayPal`:
      
           i.  Click :guilabel:`Pay with PayPal`.
      
           ii. Complete the actions on the PayPal website.
      
      All projects within your organization share the same billing
      settings, including payment method.
      
   .. step:: Review project's cost.
      
      Under the :guilabel:`Cart` section, review the following: 
      
      .. list-table::
         :widths: 20 80
         :header-rows: 1
         :stub-columns: 1
      
         * - Field
           - Description
      
         * - Cluster Tier 
           - Displays cost for your selected cluster tier and configuration 
             details. To learn more, see :ref:`region-costs` and 
             :ref:`instance-size-costs`.
      
         * - Included Features
           - Displays features included with your selected cluster 
             configuration.
      
         * - Additional Settings
           - Displays additional settings that you enabled, such as cloud 
             backups, sharding, |bic-short|, and more. To learn more, see 
             :ref:`billing-backup-cloud-provider-snapshots`.
      
   .. step:: Deploy your {+cluster+}.
      Click :guilabel:`Confirm and Deploy Cluster` below the form to deploy your
      {+cluster+}.
      
      .. important::
      
        .. include:: /includes/fact-database-deployment-project-limit-lettered.rst
      
   .. step:: Shard a global collection.
      
      If you selected :guilabel:`Atlas-Managed Sharding`, you can 
      use the {+atlas-ui+} to shard a collection for global writes. 
      To learn more, see :ref:`shard-global-collection`.
      
      If you selected :guilabel:`Self-Managed Sharding`, you must manually 
      configure the shard key and shard the global collection. To learn more, 
      see :manual:`Shard Keys </core/sharding-shard-key/>` and 
      :manual:`Shard a Collection </core/sharding-shard-a-collection/>`.
