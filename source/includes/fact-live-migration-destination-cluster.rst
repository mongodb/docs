- The live migration process streams data through a MongoDB-managed
  live migration server. Each server runs on infrastructure hosted in the
  nearest region to the source cluster. The following regions are
  available:

  Europe
      - Frankfurt
      - Ireland
      - London
  Americas
      - Eastern US
      - Western US
  APAC
      - Mumbai
      - Singapore
      - Sydney
      - Tokyo

- Use the cloud region for the destination {+cluster+} in |service| that
  has the lowest network latency relative to the application servers or to your
  deployment hosted on the source cluster. Ideally, your application's
  servers should be running in the cloud in the same region as the destination
  |service| cluster's primary region. To learn more, see :ref:`cloud-providers-list`.

- Due to network latency, the live migration process may not be able to
  keep up with a source cluster that has an extremely heavy write load.
  In this situation, you can still migrate directly from the source
  cluster by pointing the :ref:`mongomirror` tool to the destination
  |service| cluster.