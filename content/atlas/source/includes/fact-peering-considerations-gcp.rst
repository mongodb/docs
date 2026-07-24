Considerations
~~~~~~~~~~~~~~

|vpc| peering connections |service| have the following limitations:

- Google Kubernetes Engine (GKE) supports two network modes: routes-based and VPC-native. While VPC-native GKE clusters
  can connect to |service| clusters, route-based GKE clusters can't connect to |service| clusters via peering because |service|
  doesn't accept custom routes when |vpc| peering connections are created. Consider using Public IP allow lists for
  route-based GKE clusters.
- Google App Engine (Standard), Cloud Functions, and Cloud Run can't connect to |service| clusters over |vpc|
  peering connections. To connect over |vpc| peering, these services require a serverless |vpc| Access connector.
- Clients can't connect to Atlas clusters with |gcp| VPN (Virtual Private Network) or Interconnect because
  |service| doesn't accept custom routes when |vpc| peering connections are created. Consider creating :ref:`private
  endpoints <private-endpoint>`.

Configure VPC Peering for a GCP-backed Cluster
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To configure |service| |vpc| Peering for a |gcp|\-backed
cluster:
