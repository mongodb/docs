- The live migration process streams data through a MongoDB-managed
  application server. Each server runs on infrastructure hosted in the
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

- Due to network latency, the live migration process may not be able to
  keep up with a source cluster that has an extremely heavy write load.
  In this situation, you can still migrate directly from the source
  cluster by pointing the :doc:`mongomirror </reference/mongomirror>`
  tool to the destination |service| cluster.