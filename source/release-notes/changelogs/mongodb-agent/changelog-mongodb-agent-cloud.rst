.. _mongodb-10.4.1.5917:

MongoDB Agent 10.4.1.5917
-------------------------

*Released* 2019-09-13

- Fix encoding issue for keyfiles containing newlines.

.. _mongodb-10.4.0.5913:

MongoDB Agent 10.4.0.5913
-------------------------

*Released* :ref:`2019-09-10 <cloudmanager-v20190910>`

- Support for :doc:`rolling keyfile changes </tutorial/rotate-keyfile>` in MongoDB 4.2.

.. _mongodb-10.3.1.5880:

MongoDB Agent 10.3.1.5880
-------------------------

*Released* 2019-08-05

- Fixes issue with health check for integration with Kubernetes Operator.

.. _mongodb-10.3.0.5877:

MongoDB Agent 10.3.0.5877
-------------------------

*Released* 2019-08-01

- Further work to support upcoming release of MongoDB Server 4.2.

.. _mongodb-10.1.2.5805:

MongoDB Agent 10.1.2.5805
-------------------------

*Released* 2019-06-11

- Monitoring function converted to use the new MongoDB Go Driver.

.. _mongodb-10.1.0.5785:

MongoDB Agent 10.1.0.5785
-------------------------

*Released* :ref:`2019-05-29 <cloudmanager-v20190528>`

- Monitoring module updated to MongoDB's new Go driver.
- Incremental work to support the upcoming MongoDB Server 4.2 release.

.. _mongodb-10.0.1.5755-1:

MongoDB Agent 10.0.1.5755-1
---------------------------

*Released* 2019-05-13

- Fix builds for deployments using GSSAPI authentication.

.. _mongodb-10.0.0.5753:

MongoDB Agent 10.0.0.5753
-------------------------

*Released* :ref:`2019-05-13 <cloudmanager-v20190507>`

- Incorporate the Monitoring and Backup Agents into a single process,
  which will now be known as the MongoDB Agent.
  :doc:`Learn more </reference/faq/faq-mongodb-agent>` about this
  change.
