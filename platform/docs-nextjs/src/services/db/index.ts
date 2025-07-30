/**
 * Module to secure MDB connections
 * DB connections credentials should be sourced from env file
 * Intended be called from Server Components, or Route Handlers
 */

import { cache } from "react";
import { Filter, FindOptions, MongoClient } from "mongodb";
import { ASTDocument } from "@/services/db/types";
import envConfig, { type Environments } from "@/utils/env-config";
import { log } from "@/utils/logger";

const URI = envConfig.MONGODB_URI as string;
const COLLECTION_NAME = "documents";

if (!URI) {
  throw new Error("MONGODB_URI is missing as an env variable");
}

let client: MongoClient | null;

function getClient() {
  if (!client) {
    client = new MongoClient(URI, {
      appName: "docs-nextjs-" + envConfig.DB_ENV,
    });
  }
  return client;
}

function getDbName(env: Environments) {
  switch (env) {
    case "production":
      return "snooty_prod";
    case "dotcomstg":
      return "snooty_dotcomstg";
    case "dotcomprd":
      return "snooty_dotcomprd";
    default:
      return "snooty_dev";
  }
}

async function getPagesDocumentCollection() {
  const client = getClient();
  const dbName = getDbName(envConfig.DB_ENV);
  log({ message: `Connecting to MongoDB database: ${dbName}` });
  return client.db(dbName).collection<ASTDocument>(COLLECTION_NAME);
}

/**
 * This function retrieves the AST document for a given page path.
 * It uses caching to optimize performance.
 */
const getPageAST = cache(
  async (path: string | string[], prId?: number) => {
    const collection = await getPagesDocumentCollection();
    const pathString = typeof path === "string" ? path : path.join("/");
    const query: Filter<ASTDocument> = {
      page_path: pathString,
    };
    if (prId) {
      query["pr_id"] = prId;
    }
    const DEFAULT_SORT: FindOptions = { sort: { id: -1 } };
    try {
      log({ message: `Querying db ${collection.namespace} for query ${JSON.stringify(query)}` });
      const pageRes: ASTDocument | null = await collection.findOne(query, DEFAULT_SORT);
      log({ message: `Query result: ${JSON.stringify(pageRes)}` });
      return pageRes;
    } catch (e) {
      log({ message: String(e), level: "error" });
      throw e;
    }
  }
);

export async function getPageDocFromParams(params: Promise<{ path?: string[] }>, prefix = "docs") {
  const { path } = await params;
  const fullPagePath = [prefix, path?.join("/") ?? ""].join("/");
  return getPageAST(fullPagePath);
}

// TODO: revisit this logic when deploying Next on Netlify.
// see if we have to clear sockets to MDB connections, or if Netlify handles these
async function clearClient(signal?: string) {
  if (signal) {
    log({ message: `${signal} received. Closing MongoDB connection...` });
  }
  if (client) {
    await client.close();
    client = null;
  }
  process.exit(0);
}

process.on("SIGINT", async () => clearClient("SIGINT"));
process.on("SIGTERM", async () => clearClient("SIGTERM"));
