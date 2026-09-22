|ak8so| :ref:`watches secrets <ak8so-secrets>` only with the label 
``atlas.mongodb.com/type=credentials`` to avoid watching unnecessary 
|k8s-secrets|.

The following example labels a secret:

.. code-block:: sh

     kubectl label secret the-user-password atlas.mongodb.com/type=credentials
     