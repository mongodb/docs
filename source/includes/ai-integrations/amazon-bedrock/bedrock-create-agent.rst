.. procedure:: 
   :style: normal 

   .. step:: Create an agent.
         
      a. In the left navigation for {+aws-bedrock+}, 
         click :guilabel:`Agents`.
      #. Click :guilabel:`Create Agent`. 
      #. Specify ``mongodb-rag-agent`` as the 
         :guilabel:`Name` and click :guilabel:`Create`.

   .. step:: Select a model and provide a prompt.

      By default, {+aws-bedrock+} creates a new |iam| role to access
      the agent. In the :guilabel:`Agent details` section,
      specify the following:

      a. From the dropdown menus, select :guilabel:`Anthropic` 
         and :guilabel:`Claude V2.1` as the provider and AI model 
         used to answer questions on your data. 

         .. note::

            {+aws-bedrock+} doesn't grant access to :abbr:`FMs (foundation models)` 
            automatically. If you haven't already,
            follow the steps to :aws:`add model access 
            </bedrock/latest/userguide/model-access.html>`
            for the Anthropic Claude V2.1 model.

      #. Provide instructions for the agent so that it knows
         how to complete the task.

         For example, if you're using the :ref:`sample data <bedrock-load-data>`,
         paste the following instructions:

         .. code-block::

            You are a friendly AI chatbot that answers questions about working with MongoDB.

      #. Click :guilabel:`Save`.

   .. step:: Add the knowledge base.

      To connect the agent to the knowledge base that you created:

      a. In the :guilabel:`Knowledge Bases` section, click :guilabel:`Add`.

      #. Select :guilabel:`mongodb-atlas-knowledge-base` from the dropdown.

      #. Describe the knowledge base to determine how the
         agent should interact with the data source.
         
         If you're using the sample data, paste the following instructions:

         .. code-block::

            This knowledge base describes best practices when working with MongoDB.

      #. Click :guilabel:`Add`, and then click :guilabel:`Save`.

   .. step:: Test the agent.

      a. Click the :guilabel:`Prepare` button. 

      #. Click :guilabel:`Test`. {+aws-bedrock+} displays
         a testing window to the right of your agent details
         if it's not already displayed.
      
      #. In the testing window, enter a prompt. The agent
         prompts the model, uses {+avs+} to retrieve 
         relevant documents, and then generates a response
         based on the documents.

         If you used the sample data, enter the following prompt.
         The generated response might vary.

         .. io-code-block::
            :copyable: true 

            .. input:: 

               What's the best practice to reduce network utilization with MongoDB?

            .. output:: 
         
               The best practice to reduce network utilization with MongoDB is 
               to issue updates only on fields that have changed rather than 
               retrieving the entire documents in your application, updating 
               fields, and then saving the document back to the database. [1]

         .. tip::

            Click the annotation in the agent's response 
            to view the text chunk that {+avs+} retrieved.

   .. step:: Once you've finished, click :guilabel:`Save and exit`.
