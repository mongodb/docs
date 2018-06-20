MongoDB Charts executes within a single Docker container managed by
Docker Swarm.

To start Charts, deploy the stack using the supplied Docker Compose
file:

.. code-block:: sh

   docker stack deploy -c charts-docker-compose.yml mongodb-charts

To stop Charts, ask Docker to remove the stack:

.. code-block:: sh

   docker stack rm mongodb-charts