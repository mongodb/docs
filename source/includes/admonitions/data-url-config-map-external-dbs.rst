.. important::

    If you deploy |onprem| with the |k8s-op-short| and |onprem| will 
    manage MongoDB database resources deployed **outside** of the |k8s| 
    cluster it's deployed to, you must set ``data.baseUrl`` to the same 
    value of the 
    :opsmgrkube:`spec.configuration.mms.centralUrl <spec.configuration>`
    setting in the |onprem| resource specification.

    .. seealso:: :ref:`mdb-resource-deployment-locations`
