You are responsible for providing the targets by making a request to the :ref:`Discovery API <prometheus-discovery-endpoint-mms>` and storing its results in a ``targets.json`` file.

To make the request, substitute the placeholder text in one of
the following tabs or create your own script in another language.

.. tabs::

   .. tab:: Shell Command
      :tabid: shell-command

      .. code-block:: sh

         # Sets the `Authorization` header on every scrape
         # request with the username and password from the
         # previous step. The URL that Prometheus fetches the
         # targets from. 
         # Replace the <group-id> with the project ID of your
         # Atlas instance.

         curl --header 'Accept: application/json' \
              --user <username>:<password> \
              --request GET "https://cloud.mongodb.com/prometheus/v1.0/groups/{GROUP-ID}/discovery" 

   .. tab:: Python Script
      :tabid: python-script

      .. tip::

         If you need to install the ``requests`` library,
         see their
         :prom-docs:`Installation Guide <https://docs.python-requests.org/en/latest/user/install/>`.

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
         discovery_api_url="https://cloud.mongodb.com/prometheus/v1.0/groups/{GROUP-ID}/discovery"

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
:ref:`prometheus-discovery-endpoint-mms`.
