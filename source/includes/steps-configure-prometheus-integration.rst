.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-project-integrations.rst
      
   .. step:: Click :guilabel:`Configure` for the Prometheus integration card.
      
   .. step:: Enter your preferred username and password.
      
      .. important::
      
         Copy your username and password in a secure location. You can't
         access the password after you leave this screen.
      
   .. step:: Enter your IP address and port.
      
      .. tip::
      
         The default value, ``0.0.0.0:9216``, scrapes metrics on port
         ``9216`` on all |ipv4| addresses on the local machine.
      
   .. step:: (Optional) Encrypt all Prometheus metrics.
      
      If you enable this setting, |mms| assures that your Prometheus
      instance uses ``https`` to scrape metrics.
      
      .. list-table::
         :widths: 35 65
         :header-rows: 1
      
         * - Fields
           - Description
      
         * - TLS Certificate Key File Path
           -  ``PEM`` file path that contains certificate and key required
              to spin up a ``https`` Prometheus scraping endpoint. 
      
              .. note::
      
                 You are responsible for the following:
                 
                 - TLS Certificate Key File issuance and renewal.
                 - Checking if the endpoint started correctly in the automation agent logs.
      
         * - TLS Certificate Key File Password
           - Required if the certificate key file is encrypted.
      
   .. step:: Select your preferred service discovery method.
      
      .. list-table::
         :widths: 20 80
         :header-rows: 1
      
         * - Discovery Method
           - Description
      
         * - `HTTP SD <https://prometheus.io/docs/prometheus/latest/http_sd/>`__
           - This method requires Prometheus v2.28 and later. It
             generates the `scrape_config <https://prometheus.io/docs/prometheus/latest/configuration/configuration/#scrape_config>`__
             part of your `configuration file <https://prometheus.io/docs/prometheus/latest/configuration/configuration/#configuration-file>`__
             to discover targets over an HTTP endpoint.
      
         * - `File Service Discovery <https://prometheus.io/docs/guides/file-sd/#use-file-based-service-discovery-to-discover-scrape-targets>`__
           - This method allows Prometheus to read |yaml| or |json|
             documents to configure the targets to scrape from.
      
             .. include:: /includes/prometheus-discovery.rst
      
   .. step:: Click :guilabel:`Save`.
      
   .. step:: View Your Cluster Metrics on Prometheus.
      
      a. Copy the generated snippet into the
         `scrape_configs <https://prometheus.io/docs/prometheus/latest/configuration/configuration/#scrape_config>`__ section of your 
         `configuration file <https://prometheus.io/docs/prometheus/latest/configuration/configuration/#configuration-file>`__
         and substitute the placeholder text. 
         
         For an example of the configuration file in either method, see
         :ref:`example-prometheus-configurations-mms`.
      
      #. Restart your Prometheus instance.
      
      #. In your Prometheus instance, click ``Status`` in the top navigation
         bar, and click ``Targets`` to see the metrics of your deployment.
