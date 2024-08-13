.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-project-integrations.rst
      
   .. step:: Click :guilabel:`Configure` for the Prometheus integration card.
      
   .. step:: Enter your preferred username and password.

      Prometheus authentication credentials are specifically designed
      for use with the Prometheus integration in |service-fullname|.
      |service| uses these credentials to only access the Prometheus
      discovery endpoint and scrape Prometheus metrics from |service|
      nodes. They are strictly limited to these functions and do not
      have any additional permissions or capabilities beyond accessing
      and collecting monitoring data.
      
      .. important::
      
         Copy your username and password in a secure location. You can't
         access the password after you leave this screen.
      
   .. step:: Select your preferred Service Discovery method.
      
      .. list-table::
         :widths: 20 80
         :header-rows: 1
      
         * - Discovery Method
           - Description
      
         * - `HTTP Service Discovery <https://prometheus.io/docs/prometheus/latest/http_sd/>`__
           - This method requires Prometheus v2.28 and later. It
             automatically generates the `scrape_config
             <https://prometheus.io/docs/prometheus/latest/configuration/configuration/#scrape_config>`__
             part of your `configuration file
             <https://prometheus.io/docs/prometheus/latest/configuration/configuration/#configuration-file>`__
             to discover targets over an HTTP endpoint.
             
             a. Add the IP of the device hosting your Prometheus instance to the
                :ref:`IP Access List <access-list>`. This grants Prometheus
                the network access to scrape metrics from your |service| clusters.
                Ensure that ``0.0.0.0/0`` isn't on the list. Having this entry
                disables the integration.
      
             b. In the :guilabel:`Choose Discovery API Target Type`
                step in the {+atlas-ui+}, do one of the following tasks:
      
                - Select :guilabel:`Public Internet Targets`.
                - Select :guilabel:`Private IP for Peering Targets`.
      
                .. note::
      
                   |service| doesn't support private endpoints for the Prometheus
                   integration.
      
             c. Insert the following snippet into the ``scrape_configs`` section
                of your ``Prometheus.yml`` file and update it with values for
                your Prometheus integration.
                 
                .. code-block:: sh
      
                   - job_name: "<insert-job-name>"
                     scrape_interval: 10s
                     metrics_path: /metrics
                     scheme: https
                     basic_auth:
                        username: <insert-prometheus-user-id>
                        password: <insert-password>
                     http_sd_configs:
                       - url: <url-of-the-service-discovery-configuration>
                         refresh_interval: 60s
                         basic_auth:
                           username: <insert-prometheus-user-id>
                           password: <insert-password>
      
         * - `File Service Discovery <https://prometheus.io/docs/guides/file-sd/#use-file-based-service-discovery-to-discover-scrape-targets>`__
           - This method allows Prometheus to read YAML or JSON documents to
             configure the targets to scrape from. You are responsible for
             providing the targets by making a request to the
             :ref:`Discovery API <prometheus-discovery-endpoint>` and
             storing its results in a ``targets.json`` file.
      
             To make the request, substitute the placeholder text in one of
             the following tabs or create your own script in another language.
      
             .. tabs::
      
               .. tab:: Shell Command
                  :tabid: shell-command
      
                  .. code-block:: sh
      
                     curl --header 'Accept: application/json' 
                     # Sets the `Authorization` header on every scrape request with the
                     # username and password from the previous step.
                     --user <username>:<password> 
                     # The URL that Prometheus fetches the targets from. 
                     # Replace the <group-id> with the project ID of your Atlas instance.
                     --request GET "https://cloud.mongodb.com/prometheus/v1.0/groups/<group_id>/discovery" 
      
               .. tab:: Python Script
                  :tabid: python-script
      
                  .. tip::
      
                     If you need to install the ``requests`` library, see their
                     `Installation Guide <https://docs.python-requests.org/en/latest/user/install/>`__.
      
                  .. code-block:: python
      
                     import time, json, requests
      
                     # This script sets the `Authorization` header on every
                     # scrape request with the configured username and
                     # password. Then it tells Prometheus to fetch targets
                     # from the specified URL. 
                     #
                     # Note: Replace the <username> and <password> with the
                     # values in the previous step, and <group-id> with the
                     # project ID of your Atlas instance.
                     basic_auth_user="<username>"
                     basic_auth_password="<password>"
                     discovery_api_url="https://cloud.mongodb.com/prometheus/v1.0/groups/<group_id>/discovery"
      
                     # The script updates your targets.json file every
                     # minute, if it successfully retrieves targets.
                     #
                     # Note: Replace the <path-to-targets.json> with the
                     # path to your targets.json file.
                     starttime = time.time()
                     while True:
                       r = requests.get(discovery_api_url, auth=(basic_auth_user, basic_auth_password))
                       if  r.status_code == 200:
                         with open('<path-to-targets.json>', 'w') as f:
                           json.dump(r.json(), f)
                       time.sleep(60.0 - ((time.time() - starttime) % 60.0))
      
      To learn more about the Discovery API, see
      :ref:`prometheus-discovery-endpoint`.
      
   .. step:: Click :guilabel:`Save`.
      
   .. step:: View Your Cluster Metrics on Prometheus.
      
      a. Copy the generated snippet into the `scrape_configs
         <https://prometheus.io/docs/prometheus/latest/configuration/configuration/#scrape_config>`__
         section of your `configuration file
         <https://prometheus.io/docs/prometheus/latest/configuration/configuration/#configuration-file>`__
         and substitute the placeholder text. 
         
         For an example of the configuration file in either method, see
         :ref:`example-prometheus-configurations`.
      
      #. Restart your Prometheus instance.
      
      #. In your Prometheus instance, click ``Status`` in the top navigation
         bar, and click ``Targets`` to see the metrics of your deployment.
