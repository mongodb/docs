.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-stream-processing.rst

   .. step:: Go to the :guilabel:`Connection Registry`.

      a. Locate the overview panel of the {+spi+} you want to 
         modify and click :guilabel:`Configure`. 

      #. Select the :guilabel:`Connection Registry` tab.

   .. step:: Click :guilabel:`+ Add connection`.

   .. step:: Add a new connection.

      To create a new connection to an ``HTTPS`` endpoint:

      a. Select an :guilabel:`HTTPS` connection.

      #. Provide a :guilabel:`Connection Name`. Each
	 connection name must be unique within a {+spi+}. 
	 This is the name used to reference the connection in 
	 {+atlas-sp+} :ref:`aggregations <stream-aggregation>`.

      #. Provide the :guilabel:`URL` to which to send the
	 ``HTTP`` request.

      #. (Optional) Provide a set of headers for the ``HTTP``
	 request in the form of key-value pairs. To provide additional
	 headers, click :guilabel:`Add Header` as many times as needed.

      #. Click :guilabel:`Add connection`.
      
