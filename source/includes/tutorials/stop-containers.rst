After you complete this tutorial, free resources on your computer
by stopping or removing Docker assets. You can choose to remove
both the Docker containers and images, or exclusively the
containers. If you remove the containers and images, you must
download them again to restart your {+mkc+} development environment,
which is approximately {+pipeline-size+} in size. If you
exclusively remove the containers, you can reuse the images and avoid
downloading most of the large files in the sample data pipeline.

.. tip:: More Tutorials

   If you plan to complete any more {+mkc+} tutorials,
   consider removing only containers. If you don't plan
   to complete any more {+mkc+} tutorials, consider
   removing containers and images.

Select the tab that corresponds to the removal task you want to run.

.. tabs::

   .. tab:: Remove Containers and Images
      :tabid: remove-containers-and-images

      Run the following shell command to remove the Docker containers and
      images for the development environment:

      .. code-block:: shell

         docker-compose -p mongo-kafka down --rmi all

   .. tab:: Remove Containers
      :tabid: remove-containers

      Run the following shell command to remove the Docker containers but
      keep the images for the development environment:

      .. code-block:: shell

         docker-compose -p mongo-kafka down

To restart the containers, follow the same steps required to start them
in the :ref:`Tutorial Setup <tutorial-setup-run-environment>`.
