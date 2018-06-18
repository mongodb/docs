.. code-block:: sh

   docker stack rm mongodb-charts

Before redeploying, execute ``docker ps`` a few times until it shows no
running Charts containers. It can take a little while for the
containers to shut down. Then, relaunch the stack using:

.. code-block:: sh

   docker stack deploy -c charts-docker-compose.yml mongodb-charts
