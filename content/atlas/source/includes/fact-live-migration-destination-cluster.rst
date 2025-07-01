- The live migration process streams data through a MongoDB-managed
  live migration server. Each server runs on infrastructure hosted in the
  nearest region to the source {+cluster+}. The following regions are
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
  deployment hosted on the source {+cluster+}. Ideally, your application's
  servers should be running in the cloud in the same region as the destination
  |service| {+cluster+}\'s primary region. To learn more, see :ref:`cloud-providers-list`.
