# How to Build CI/CD Pipelines for MongoDB Realm Apps Using GitHub Actions

> As of June 2022, the functionality previously known as MongoDB Realm is now named Atlas App Services. Atlas App Services refers to the cloud services that simplify building applications with Atlas – Atlas Data API, Atlas GraphQL API, Atlas Triggers, and Atlas Device Sync. Realm will continue to be used to refer to the client-side database and SDKs.

Building Continuous Integration/Continuous Deployment (CI/CD) pipelines can be challenging. You have to map your team's ideal pipeline, identify and fix any gaps in your team's test automation, and then actually build the pipeline. Once you put in the work to craft a pipeline, you'll reap a variety of benefits like...

- Faster releases, which means you can get value to your end users quicker)
- Smaller releases, which can you help you find bugs faster
- Fewer manual tasks, which can reduce manual errors in things like testing and deployment.

This article covers the following topics:

- All About the Inventory App
  - What the App Does
  - The System Architecture
- All About the Pipeline
  - Pipeline Implementation Using GitHub Actions
  - MongoDB Atlas Project Configuration
  - What Happens in Each Stage of the Pipeline
- Building Your Pipeline
  - Map Your Pipeline
  - Implement Your Pipeline
- Summary

> More of a video person? No worries. Check out the recording below of a talk I gave at MongoDB.live 2021 that covers the exact same content this article does. :youtube[]{vid=-JcEa1snwVQ}

## All About the Inventory App

I recently created a CI/CD pipeline for an iOS app that manages stores' inventories. In this section, I'll walk you through what the app does and how it was architected. This information will help you understand why I built my CI/CD pipeline the way that I did.
