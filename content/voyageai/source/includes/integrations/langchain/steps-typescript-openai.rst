.. procedure::
   :style: normal

   .. step:: Initialize the project and install dependencies.

      Run the following commands to create a new project directory and
      install the required packages:

      .. code-block:: bash

         mkdir langchain-voyageai
         cd langchain-voyageai
         npm init -y
         npm install @langchain/mongodb @langchain/core @langchain/openai @langchain/community @langchain/textsplitters mongodb@^6 pdf-parse@1 dotenv @types/node --legacy-peer-deps

      Then, add the following line to your ``package.json`` file so
      that Node.js interprets your files as ES modules:

      .. code-block:: json

         "type": "module"

   .. step:: Define your environment variables.

      Create a ``.env`` file in the ``langchain-voyageai`` directory
      and paste the following code:

      .. code-block:: none

         MONGODB_URI=<connection-string>
         VOYAGE_API_KEY=<voyage-api-key>
         OPENAI_API_KEY=<openai-api-key>

      Replace the placeholder values with your {+voyageai+}
      {+model-api-key+}, your OpenAI API key, and your MongoDB
      cluster's connection string. To learn how to find your connection
      string, see :ref:`mongodb-uri`.

   .. step:: Create a file named ``langchain-get-started.ts``.

      Create a file named ``langchain-get-started.ts`` in the
      ``langchain-voyageai`` directory and paste the following code
      into it. This code imports the required packages, loads your
      environment variables, and creates the ``run()`` function that you
      add code to throughout this tutorial.

      .. code-block:: typescript

         import "dotenv/config";
         import { MongoClient } from "mongodb";
         import { MongoDBAtlasVectorSearch, VoyageEmbeddings } from "@langchain/mongodb";
         import { ChatOpenAI } from "@langchain/openai";
         import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
         import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
         import { PromptTemplate } from "@langchain/core/prompts";
         import { RunnableSequence, RunnablePassthrough } from "@langchain/core/runnables";
         import { StringOutputParser } from "@langchain/core/output_parsers";
         import type { Document } from "@langchain/core/documents";
         import * as fs from "fs";

         const MONGODB_URI = process.env.MONGODB_URI!;

         const client = new MongoClient(MONGODB_URI);
         const formatDocumentsAsString = (docs: Document[]) =>
           docs.map((d) => d.pageContent).join("\n\n");

         async function run() {
           try {
             // Add the code from the following steps here
           } finally {
             await client.close();
           }
         }

         run().catch(console.dir);

      .. note::

         Both ``VoyageEmbeddings`` and ``MongoDBAtlasVectorSearch``
         come from the ``@langchain/mongodb`` package.

   .. include:: /includes/integrations/langchain/shared-typescript-steps.rst

   .. step:: Answer questions about your data.

      Add the following code to the end of the ``try`` block to
      implement RAG with your vector store. This code performs the
      following tasks:

      - Instantiates your vector store as a LangChain retriever.
      - Defines a prompt template that instructs the LLM to use the
        retrieved documents as context for the question.
      - Chains the retriever, the prompt, and the OpenAI chat model
        together, then prompts the chain with a sample question.

      .. literalinclude:: /includes/integrations/langchain/typescript-openai/langchain-get-started.ts
         :language: typescript
         :start-after: // start-answer
         :end-before: // end-answer
         :dedent:

   .. step:: Run the file.

      Run the following command to run your application:

      .. code-block:: bash

         npx tsx langchain-get-started.ts

      If successful, your application output resembles the following:

      .. code-block:: none
         :copyable: false

         Waiting for initial sync...
         Semantic search results without pre-filtering:
         [
           [
             {
               "pageContent": "providers including LangChain, and the addition of new members to MongoDB's AI partner ecosystem including Temporal\nand Galileo.",
               "metadata": {
                 "_id": "6a875602f16bb18b12b3136d",
                 "source": "earnings-report.pdf",
                 "pdf": { ... },
                 "loc": {
                   "pageNumber": 2,
                   "lines": {
                     "from": 1,
                     "to": 2
                   }
                 }
               }
             },
             0.7797216176986694
           ],
           [
             {
               "pageContent": "customers to build accurate, trustworthy, and reliable AI applications at scale. This includes the launch of several new",
               "metadata": {
                 "_id": "6a875602f16bb18b12b3136b",
                 "source": "earnings-report.pdf",
                 "pdf": { ... },
                 "loc": {
                   "pageNumber": 1,
                   "lines": {
                     "from": 42,
                     "to": 42
                   }
                 }
               }
             },
             0.7586519718170166
           ],
           [
             {
               "pageContent": "Voyage AI models— including voyage-context-3 and rerank-2.5—the expansion of MongoDB's partnerships with major AI",
               "metadata": {
                 "_id": "6a875602f16bb18b12b3136c",
                 "source": "earnings-report.pdf",
                 "pdf": { ... },
                 "loc": {
                   "pageNumber": 1,
                   "lines": {
                     "from": 43,
                     "to": 43
                   }
                 }
               }
             },
             0.7545703053474426
           ]
         ]
         Semantic search results with pre-filtering:
         [
           [
             {
               "pageContent": "providers including LangChain, and the addition of new members to MongoDB's AI partner ecosystem including Temporal\nand Galileo.",
               "metadata": {
                 "_id": "6a875602f16bb18b12b3136d",
                 "source": "earnings-report.pdf",
                 "pdf": { ... },
                 "loc": {
                   "pageNumber": 2,
                   "lines": {
                     "from": 1,
                     "to": 2
                   }
                 }
               }
             },
             0.7797216176986694
           ],
           [
             {
               "pageContent": "experience to build for the future, the skills to drive AI-powered execution, and the opportunity to connect with experts for\n1:1 consulting and product demos.",
               "metadata": {
                 "_id": "6a875602f16bb18b12b31374",
                 "source": "earnings-report.pdf",
                 "pdf": { ... },
                 "loc": {
                   "pageNumber": 2,
                   "lines": {
                     "from": 10,
                     "to": 11
                   }
                 }
               }
             },
             0.7121242880821228
           ],
           [
             {
               "pageContent": "of new and evolving technologies, such as artificial intelligence, in our offerings or partnerships; our ability to effectively expand our sales and",
               "metadata": {
                 "_id": "6a875602f16bb18b12b31393",
                 "source": "earnings-report.pdf",
                 "pdf": { ... },
                 "loc": {
                   "pageNumber": 2,
                   "lines": {
                     "from": 58,
                     "to": 58
                   }
                 }
               }
             },
             0.7083813548088074
           ]
         ]

         Question: Which AI providers have partnerships with MongoDB?
         Answer: The AI providers that have partnerships with MongoDB include LangChain, Temporal, and Galileo.

      .. note:: Code Output

         Your code output might differ from the sample output
         provided. LLM responses vary between requests, so the
         wording changes each time you run the file. The document
         IDs also differ on each run.
