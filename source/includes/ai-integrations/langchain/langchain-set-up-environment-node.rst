.. procedure:: 
   :style: normal 

   .. step:: Initialize your Node.js project.

      Run the following commands in your terminal 
      to create a new directory named ``langchain-mongodb`` and
      initialize your project:

      .. code-block::

         mkdir langchain-mongodb
         cd langchain-mongodb
         npm init -y

   .. step:: Install and import dependencies.

      Run the following command:

      .. code-block::

         npm install langchain @langchain/community @langchain/mongodb @langchain/openai pdf-parse fs

   .. include:: /includes/avs/shared/steps-avs-nodejs-config-modules.rst

   .. step:: Create a file named ``get-started.js`` and paste the following code.

      In your project, create a file named ``get-started.js``, and then copy and paste 
      the following code into the file. You will add code to this file throughout 
      the tutorial.
      
      This initial code snippet imports
      required packages for this tutorial, defines environment variables,
      and establishes a connection to your |service| {+cluster+}.

      .. code-block:: javascript

         import { formatDocumentsAsString } from "langchain/util/document";
         import { MongoClient } from "mongodb";
         import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
         import { OpenAIEmbeddings, ChatOpenAI } from "@langchain/openai";
         import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
         import { PromptTemplate } from "@langchain/core/prompts";
         import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
         import { RunnableSequence, RunnablePassthrough } from "@langchain/core/runnables";
         import { StringOutputParser } from "@langchain/core/output_parsers";
         import * as fs from 'fs';

         process.env.OPENAI_API_KEY = "<api-key>";
         process.env.ATLAS_CONNECTION_STRING = "<connection-string>";
         const client = new MongoClient(process.env.ATLAS_CONNECTION_STRING);

   .. step:: Replace the placeholder values.

      To finish setting up the environment, replace the ``<api-key>`` 
      and ``<connection-string>`` placeholder values in ``get-started.js``
      with your OpenAI API Key and the |srv| :manual:`connection string 
      </reference/connection-string/#find-your-mongodb-atlas-connection-string>`
      for your |service| {+cluster+}. Your connection string should use
      the following format:

      .. code-block::

         mongodb+srv://<db_username>:<db_password>@<clusterName>.<hostname>.mongodb.net
         