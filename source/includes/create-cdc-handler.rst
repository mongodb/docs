To create a CDC handler, specify the following configuration information:

- Full class name of the CDC handler in the
  ``change.data.capture.handler`` property. Once this configuration
  setting is specified, the connector will run in **CDC operation mode**.
- Topics on which the connector should listen for data in the ``topics``
  property.
- MongoDB collection to write data to in the ``collection`` property.
