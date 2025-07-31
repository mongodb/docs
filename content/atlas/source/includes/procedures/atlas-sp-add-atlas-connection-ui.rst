.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-stream-processing.rst

   .. step:: Go to the :guilabel:`Connection Registry`.

      a. Locate the overview panel of the {+spi+} you want to 
         modify and click :guilabel:`Configure`. 

      #. Select the :guilabel:`Connection Registry` tab.

   .. step:: Click :guilabel:`+ Add connection`.

   .. step:: Add a new connection.

      To create a new connection to an {+service+}
      :manual:`change stream </changeStreams>`:

      a. Select an :guilabel:`{+service+} Database` 
	 connection.

      #. Provide a :guilabel:`Connection Name`. Each
	 connection name must be unique within an {+spi+}. 
	 This is the name used to reference the connection in 
	 {+atlas-sp+} :ref:`aggregations <stream-aggregation>`.

      #. From the dropdown menu, select an 
	 :guilabel:`{+service+} {+Cluster+}`. {+atlas-sp+}
	 is only available on dedicated-tier {+clusters+}.

      #. Click :guilabel:`Add connection`.
      
