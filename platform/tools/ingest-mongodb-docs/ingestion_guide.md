# Ingestion Guide

This document discusses how to ingest new content to the MongoDB Education Chatbot. This document is intended for members of the Education AI team.

## Existing Content

The chatbot already ingests a variety of MongoDB data sources, including:

- Technical documentation on https://mongodb.com/docs
- Dveloper blog posts on https://mongodb.com/developer
- MongoDB University pages and transcripts https://mongodb.com/university
- Some of the content maintainted by the marketing team/sales on https://mongodb.com

All data sources for ingested content can be found here <https://github.com/mongodb/chatbot/tree/main/packages/ingest-mongodb-public/src/sources>.

## Fielding External Requests

People from across the organization occasionally ask us to ingest new content to the chatbot. 

Sometimes it can be enough to just add the data, like if its a new Snooty technical documention data source.

However, often you need to do more than simply 'ingest' the content to effectively achieve the goals of the person who wants to ingest. This is particularly the case if the data to ingest is a new type of content. For instance, when we first ingested MDB University transcripts or the mongodb.com marketing site, it required some additional attention.

Meeting with the person requesting the ingestion is the best way to get this information and reach alignment.

### Meeting Questions

In the meeting cover the following questions:

#### 1. What is the goal for ingesting the content? 

Get a baseline understanding of not just _what_ they want ingested but _why_. This can help guide the rest of the conversation.

Also, sometimes we do not need to ingest additional content to achieve a specific goal. For example, some requests might be better served by modifying the assistant prompt or adding a guardrail.

#### 2. Where's the content located?

Is it in a CMS, a Github repo, on the web, etc.?

Generally, ingesting from a non-web source like a repo or CMS works better. It can be more upfront work, but results in cleaner data and quicker ingestion run times (scraping the web is slow and error-prone). 

The ideal state is that the content exists in clean Markdown/text with a link to the URL where the content can be found on the web. Try to get as close as possible to this.

#### 3. What answers do you expect to recieve from the chatbot based on the ingested content?

If there's any complexity regarding the ingestion, you should create an evaluation dataset for the topics covered in the new content.

The requestor can create the example dataset in a Google Sheet following the [template of this sheet of evaluation questions for ingesting website content](https://docs.google.com/spreadsheets/d/1khZ9jwgffIUb-bDXqnem5o1Xq3RZ1sz8_JXFc3o9GCE/edit?pli=1&gid=0#gid=0).

The single most important part of the evaluation dataset is the queries. These should be well thought through and broadly representative of what a user might ask. The provided links are also very useful, as they help us coorelate the answers back to specific pieces of content. The sample answer is useful for understanding the intent of the query and can be used as a 'reference answer' in LLM-as-a-judge evaluations.

#### 4. Are there any specific questions that you want the chatbot to answer with pre-written answers?

See if there are any pre-written question/answer/link sets that they want to include. We can add these as verified answers. 

Generally, verified answers should be used sparingly. Ideally, the chatbot can just answer using RAG. Verified answers are more of a 'patch'.

You can add verified answers in the [verified-answers.yaml](https://github.com/mongodb/chatbot/blob/main/verified-answers.yaml) file. Then, use the [verified answers upload](https://github.com/mongodb/chatbot/tree/main/packages/mongodb-chatbot-verified-answers) script to add them to dev/staging/prod.

## Data Ingestion Checklist

When ingesting new content, you want to perform the following actions:

- [ ] Create the data source for the content
- [ ] Add data source to `ingest-mongodb-public` and run ingest in dev environment
- [ ] Adapt the evaluation Google Sheet as eval cases in the repo. See [`conversations.eval.ts`](https://github.com/mongodb/chatbot/blob/main/packages/chatbot-server-mongodb-public/src/conversations.eval.ts) as reference.
- [ ] (If relevant) Add verified answers & upload them
- [ ] Update the server to work better with ingested data based on eval results. Manually examine the results from the evaluation (both looking at metrics and manual review). Some things you might want to change:
  - [ ] Update [`userMessageMongoDbGuardRail`](https://github.com/mongodb/chatbot/blob/main/packages/chatbot-server-mongodb-public/src/processors/userMessageMongoDbGuardrail.ts) to allow/disallow new query types.
  - [ ] Update the preprocessors [`makeStepBackRagGenerateUserPrompt`](https://github.com/mongodb/chatbot/blob/main/packages/chatbot-server-mongodb-public/src/processors/makeStepBackRagGenerateUserPrompt.ts) and [`extractMongoDbMetadataFromUserMessage`](https://github.com/mongodb/chatbot/blob/main/packages/chatbot-server-mongodb-public/src/processors/extractMongoDbMetadataFromUserMessage.ts). For example, you may have to add a MongoDB product to [`mongoDbMetadata`](https://github.com/mongodb/chatbot/tree/main/packages/chatbot-server-mongodb-public/src/mongoDbMetadata).
  - [ ] Add frontmatter metadata to include with ingestion.

### Example Jira Epic

Here's an example Jira epic that you can use base your tickets on: [Ingest Web Content](https://jira.mongodb.org/browse/EAI-591)